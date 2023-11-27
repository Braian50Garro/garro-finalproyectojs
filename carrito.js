const pintarcarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `<h1 class="modal-header-title">Carrito.</h1>`;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "❎";
    modalbutton.className = "modal-header-button";

    modalHeader.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton);

    carrito.forEach(product => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p>${product.precio}$</p>
            <p>Cantidad: ${product.cantidad}</p>
            <p>Total: ${product.cantidad * product.precio}</p>
        `;
        modalContainer.append(carritoContent);

        let eliminar = document.createElement("span");
        eliminar.innerText = "❌";
        eliminar.className = "delete-product";
        carritoContent.append(eliminar);

        eliminar.addEventListener("click", () => eliminarProducto(product.id));
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const totalButying = document.createElement("div");
    totalButying.className = "total-content";
    totalButying.innerHTML = `Total a pagar: ${total}$`;
    modalContainer.append(totalButying);

    // Botón para finalizar compra
    const finalizarCompraBtn = document.createElement("button");
    finalizarCompraBtn.innerText = "Finalizar compra";
    finalizarCompraBtn.className = "finalizar-compra"; // Agregar esta línea para asignar la clase al botón
    finalizarCompraBtn.addEventListener("click", finalizarCompra);
    modalContainer.append(finalizarCompraBtn);
    
};

verCarrito.addEventListener("click", pintarcarrito);

const eliminarProducto = (productId) => {
    carrito = carrito.filter(product => product.id !== productId);
    carritoCounter();
    pintarcarrito();
};

const finalizarCompra = () => {
    if (carrito.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Carrito vacío',
            text: 'No hay productos en el carrito para finalizar la compra.',
        });
    } else {
        // Compra realizada con éxito
        Swal.fire({
            icon: 'success',
            title: '¡Compra realizada!',
            text: 'Gracias por tu compra.',
        }).then((result) => {
            if (result.isConfirmed) {
                // Limpia el carrito y actualiza el contador
                carrito = [];
                carritoCounter();
                // Oculta el modal
                modalContainer.style.display = "none";
            }
        });
    }
};

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";
    cantidadCarrito.innerText = carrito.length;
};

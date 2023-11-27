const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito")

let carrito = [];

function displayProducts(products) {
    shopContent.innerHTML = '';

    products.forEach(product => {
        let content = document.createElement("div");
        content.className = "card";
        content.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p class="price">${product.precio}$</p>
        `;

        let comprar = document.createElement("button");
        comprar.innerText = "comprar";
        content.append(comprar);

        comprar.addEventListener("click", () => {

            const repeat = carrito.some((repeatProduct) => repeatProduct.id ===product.id);

            if(repeat){
                carrito.map((prod) => {
                    if(prod.id === product.id){
                        prod.cantidad++;
                    }
                });
            }else {

            carrito.push({
                id: product.id,
                img: product.img,
                nombre: product.nombre,
                precio: product.precio,
                cantidad: product.cantidad, 
            });
        }
            console.log(carrito);
            carritoCounter();
        });

        shopContent.append(content);
    });
}


function filterByCategory(category) {
    const filteredProducts = productos.filter(product => product.categoria.toLowerCase() === category.toLowerCase());
    displayProducts(filteredProducts);
}


window.onload = () => {
    displayProducts(productos);
};

document.getElementById('gamer').addEventListener('click', () => filterByCategory('gamer'));
document.getElementById('diseño').addEventListener('click', () => filterByCategory('diseño'));
document.getElementById('soporte').addEventListener('click', () => filterByCategory('soporte'));


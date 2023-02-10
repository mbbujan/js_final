class Producto {
    constructor(nombre, precio, url) {
        this.nombre = nombre;
        this.precio = precio;
        this.url = url;
    }
}

const llaveGarage = new Producto("Llave Garage", 500, "../img/llaveGarage.png");
const llaveEntrada = new Producto("Llave Entrada", 200, "../img/llaveIngreso.jpeg");


const arrayProductos = [llaveGarage, llaveEntrada];

const comprasProductos= document.getElementById("comprasProductos");


arrayProductos.forEach(producto => {
    const div = document.createElement("div");
    div.className = "col-xl-4";
    div.innerHTML = `<div class="card text-center" style="width: 18rem;">
                        <img src="${producto.url}" class="card-img-top mx-auto" alt="${producto.nombre}" >
                        <div class="card-body">
                            <h5 class="card-title"> ${producto.nombre} </h5>
                            <p class="card-text"> Precio: ${producto.precio} </p>
                            <button class="btn btn-primary">Solicitar</button>
                        </div>
                    </div>`
    
    comprasProductos.appendChild(div);
})

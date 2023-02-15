class Producto {
  constructor(nombre, precio, img) {
    this.nombre = nombre;
    this.precio = precio;
    this.img = img;
  }
}

const llaveGarage = new Producto("Llave Garage", 500, "../img/llaveGarage.png");
const llaveEntrada = new Producto(
  "Llave Entrada",
  200,
  "../img/llaveIngreso.jpeg"
);

const arrayProductos = [llaveGarage, llaveEntrada];

const comprasProductos = document.getElementById("comprasProductos");

const mostrarComprasProductos = () => {
  arrayProductos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("col-xl-3", "col-md-6", "col-sm-12");
    div.innerHTML = `<div class="card text-center" >
                        <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}" >
                        <div>
                            <h5 class="card-title"> ${producto.nombre} </h5>
                            <p class="card-text"> Precio: $ ${producto.precio} </p>
                            <button class="btn" id="compras-boton" >Solicitar</button>
                        </div>
                    </div>`;

    comprasProductos.appendChild(div);
  })
}
mostrarComprasProductos();

class Producto {
  constructor(id, nombre, precio, img) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.img = img;
    this.cantidad = 1;
  }
}

const llaveGarage = new Producto(
  1,
  "Llave Garage",
  500,
  "../img/llaveGarage.png"
);
const llaveEntrada = new Producto(
  2,
  "Llave Entrada",
  200,
  "../img/llaveIngreso.jpeg"
);
const fichasLaundry = new Producto(
  3,
  "Fichas Laundry",
  120,
  "../img/laundry.png"
);
const controlRemoto = new Producto(
  4,
  "Control Remoto Garage",
  1700,
  "../img/controlRemoto.jpeg"
);

const arrayProductos = [
  llaveGarage,
  llaveEntrada,
  fichasLaundry,
  controlRemoto,
];

let carrito = [];

if(localStorage.getItem("carrito")){
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

//         MOSTRAMOS PRODUCTOS
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
                            <button class="btn" id="compras-boton${producto.id}" >Solicitar</button>
                        </div>
                    </div>`;

    comprasProductos.appendChild(div);
    const botonAgregar = document.getElementById(`compras-boton${producto.id}`);
    botonAgregar.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    });
  });
};
mostrarComprasProductos();

// AGREGAR AL CARRITO COMPRAS
const agregarAlCarrito = (id) => {
  const carritoCompras = carrito.find((producto) => producto.id === id);
  if (carritoCompras) {
    carritoCompras.cantidad++;
  } else {
    const producto = arrayProductos.find((producto) => producto.id === id);
    carrito.push(producto);
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

// MOSTRAR CARRITO COMPRAS

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");
verCarrito.addEventListener("click", () => {  
  mostrarCarrito();
});

const mostrarCarrito = () => {
  contenedorCarrito.innerHTML = "";
  carrito.forEach((producto) => {
    const list = document.createElement("div");    
    list.className = "listaCarrito";
   list.innerHTML = ` <p> ${producto.nombre} - Precio por unidad:  ${producto.precio} - Cantidad: ${producto.cantidad} unidades
                              <button class = "btn colorBoton" id="eliminar${producto.id}" > Eliminar </button>
                      </p>
                      `;
    contenedorCarrito.appendChild(list);
  });
};

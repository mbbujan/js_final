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

if (localStorage.getItem("carrito")) {
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
  calcularTotal();
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
    list.innerHTML = ` <p> ${producto.nombre} - Precio por unidad:  ${producto.precio} - Cantidad: 
    <img src="../img/minus.png" alt="Restar Producto" id="restar${producto.id}"
    /> ${producto.cantidad} unidades
    <img src="../img/plus.png" alt="Sumar Producto" id="sumar${producto.id}"
    />
    <img src="../img/delete.png" alt="Eliminar Producto" id="eliminar${producto.id}"
    />       `;
    contenedorCarrito.appendChild(list);
    const restarProducto = document.getElementById(`restar${producto.id}`);
    restarProducto.addEventListener("click", () => {
      restarDelCarrito(producto.id);
    });
    const sumarProducto = document.getElementById(`sumar${producto.id}`);
    sumarProducto.addEventListener("click", () => {
      sumarDelCarrito(producto.id);
    });
    const eliminarProducto = document.getElementById(`eliminar${producto.id}`);
    eliminarProducto.addEventListener("click", () => {
      eliminarDelCarrito(producto.id);
    });
  });
  calcularTotal();
};

const restarDelCarrito = (id) => {
  const producto = carrito.find((producto) => producto.id === id);
  const indice = carrito.indexOf(producto);
  (producto.cantidad===1)?(carrito.splice(indice, 1)):(producto.cantidad--);
  mostrarCarrito();
  //localStorage.setItem("carrito", JSON.stringify(carrito));
};

const sumarDelCarrito = (id) => {
  const producto = carrito.find((producto) => producto.id === id);
  //const indice = carrito.indexOf(producto);
  producto.cantidad++;
  //carrito.splice(indice, 1);
  mostrarCarrito();
  //localStorage.setItem("carrito", JSON.stringify(carrito));
};

const eliminarDelCarrito = (id) => {
  const producto = carrito.find((producto) => producto.id === id);
  const indice = carrito.indexOf(producto);
  carrito.splice(indice, 1);
  mostrarCarrito();
  localStorage.setItem("carrito", JSON.stringify(carrito));
};


const total = document.getElementById("total");

const calcularTotal = () => {
  let totalCompra = 0;
  carrito.forEach((producto) => {
    totalCompra += producto.precio * producto.cantidad;
  });
  total.innerHTML = `  <h3 class="compras-totales-1">
    El total de la compra es de $${totalCompra}
  </h3>  
            `;
};

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
  vaciar();
});

const vaciar = () => {
  carrito = [];
  mostrarCarrito();
  localStorage.clear();
};

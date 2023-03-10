let carrito = [];
const listaProductos = "../json/productos.json";

if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

//         MOSTRAMOS PRODUCTOS
const comprasProductos = document.getElementById("comprasProductos");

fetch(listaProductos)
  .then((respuesta) => respuesta.json())
  .then((arrayProductos) => {
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
      const botonAgregar = document.getElementById(
        `compras-boton${producto.id}`
      );

      botonAgregar.addEventListener("click", () => {
        sumarAlCarrito(producto.id);
        const verCarrito = document.getElementById("verCarrito");
        verCarrito.innerText = " Tu carrito ";
        mostrarCarrito();
      });
    });
  })
  .catch((error) => console.log(error))
  .finally(() => console.log("Cargados todos los productos"));

// MOSTRAR CARRITO COMPRAS
const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
  mostrarCarrito();
  verCarrito.innerText = " Tu carrito ";
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
      sumarAlCarrito(producto.id);
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
  producto.cantidad === 1 ? carrito.splice(indice, 1) : producto.cantidad--;
  mostrarCarrito();
  Toastify({
    text: "Se quito un producto del carrito",
    duration: 3000,
    gravity: "top",
    position: "right",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
  

  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const sumarAlCarrito = (id) => {
  const producto = carrito.find((producto) => producto.id === id);
  if (producto) {
    producto.cantidad++;
  } else {
    sumarNuevoProducto(id);
}
  mostrarCarrito();
  Toastify({
    text: "Se agregó un producto al carrito",
    duration: 1000,
    gravity: "top",
    position: "right",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const sumarNuevoProducto = (id) => {
  fetch(listaProductos)
  .then((respuesta) => respuesta.json())
  .then((arrayProductos) => {
    const nuevoProducto = arrayProductos.find(
      (producto) => producto.id === id
    );
    carrito.push(nuevoProducto);
  });
}

const eliminarDelCarrito = (id) => {
  const producto = carrito.find((producto) => producto.id === id);
  producto.cantidad = 1;
  const indice = carrito.indexOf(producto);
  carrito.splice(indice, 1);
  Toastify({
    text: "Se eliminó el producto del carrito",
    duration: 3000,
    gravity: "top",
    position: "right",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
  mostrarCarrito();
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const calcularTotal = () => {
  let totalCompra = 0;
  carrito.forEach((producto) => {
    totalCompra += producto.precio * producto.cantidad;
  });
  total.innerHTML = ` <h3 ">
    El total de la compra es de $${totalCompra}
  </h3>  `;
};

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
  vaciar();
});

const vaciar = () => {
  carrito = [];
  Toastify({
    text: "Se vació el carrito",
    duration: 3000,
    gravity: "top",
    position: "right",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
  mostrarCarrito();
  localStorage.clear();
};

const finalizarCompra = document.getElementById("finalizarCompra");
finalizarCompra.addEventListener("click", () => {
  let totalCompra = 0;
  carrito.forEach((producto) => {
    totalCompra += producto.precio * producto.cantidad;
  });
  totalCompra > 0
    ? Swal.fire({
        title: "Solicitado!",
        icon: "success",
        text: "En las expensas se te cargarán $" + totalCompra,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#DD6B55",
      })
    : Swal.fire({
        title: "Error",
        icon: "error",
        text: "El carrito de compras está vacío",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#DD6B55",
      });
});

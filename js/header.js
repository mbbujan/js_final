/*
GENERO HEADER DE MENU HAMBURGUESA DE BOOTSTRAP
*/
class Opciones {
  constructor(nombre, ruta) {
    this.nombre = nombre;
    this.ruta = ruta;
  }
}

const inicio = new Opciones("INICIO", "../pages/inicio.html");
const misDatos = new Opciones("MIS DATOS", "../pages/datos.html");
const expensas = new Opciones("EXPENSAS", " ");
const sum = new Opciones("RESERVAR SUM", "../pages/sum.html");
const compras = new Opciones("COMPRAR", "../pages/compras.html");
const cerrarSesion = new Opciones("CERRAR SESION", "../index.html");

const arrayOpciones = [inicio, misDatos, expensas, sum, compras, cerrarSesion];

const menuEncabezado = document.getElementById("menu-opciones");

const generarMenuEncabezado = () => {
  arrayOpciones.forEach((opciones) => {
    if (opciones.nombre != "EXPENSAS") {
      const li = document.createElement("li");
      li.innerHTML = `<a class="nav-link active ${opciones.nombre}" href="${opciones.ruta}" id="activo-${opciones.nombre}">${opciones.nombre}</a>  `;
      menuEncabezado.appendChild(li);
    } else {
      const liquidaciones = new Opciones(
        "CONSULTAR LIQUIDACIONES",
        "../pages/liquidaciones.html"
      );
      const pagos = new Opciones("INFORMAR PAGOS", "../pages/pagos.html");

      const liExp = document.createElement("li");
      liExp.className = "nav-item dropdown";
      liExp.innerHTML = `<a
        class="nav-link active dropdown-toggle"
        href="#"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        ${opciones.nombre}
      </a>
      <div class="dropdown-menu" aria-labelledby="navbarDropdown">
      <a class="dropdown-item" href="${liquidaciones.ruta}"
                    >${liquidaciones.nombre}</a
                  >
                  <a class="dropdown-item" href="${pagos.ruta}">${pagos.nombre}</a>
                </div>
      `;
      menuEncabezado.appendChild(liExp);
    }
  });
};

const menuActivo = () => {
  let pagActual = window.location.href;
  let inicio = pagActual.indexOf("/pages/");
  let rutaActual = "../pages/" + pagActual.slice(inicio + 7);

  arrayOpciones.forEach((opciones) => {
    if (opciones.ruta === rutaActual) {
      document
        .getElementById("activo-" + opciones.nombre)
        .setAttribute("class", "menu-activo");
    }
  });
};

generarMenuEncabezado();
menuActivo();

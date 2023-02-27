const mailAutorizado = "prueba@mail.com";
const passAutorizado = "prueba123";
const datosCorrectos = false;
function validar() {
  const mail = document.getElementById("mail").value;
  const pass = document.getElementById("pass").value;
  if (mail === mailAutorizado && pass === passAutorizado) {
    document.formulario - ingreso.submit();
    datosCorrectos = true;
  } else {
    Swal.fire({
      title: "Error ",
      icon: "warning",
      text: "Mail y/o contraseña incorrectos",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#DD6B55",
    });
  }
  return datosCorrectos;
}

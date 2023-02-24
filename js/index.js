class Usuario {
    constructor(nombre, usuario, pass, mail) {
      this.nombre = nombre;
      this.usuario = usuario;
      this.pass = pass;
      this.mail = mail;
    }
  
    accesoCorrecto = function (usuario2, pass2) {
      let isCorrecto = false;
      if (this.usuario == usuario2 && this.pass == pass2) {
        isCorrecto = true;
      } else {       
        alert(
          "El nombre de usuario o la contraseña no coincide con lo cargado anteriormente. Volve a intentarlo!"
        );
        isCorrecto = false;
      }
      return isCorrecto;
    };
  }
  

  
  function ingresar() {
    const usuario1 = new Usuario("nombre 1", "usuario1", "testPass1");
    const usuario2 = new Usuario("nombre 2", "usuario2", "testPass2");
    let usuarios = [usuario1, usuario2];    
    let logUsuario;
    let logPass;
    let datosLoggeo;
    do {
      logUsuario = document.form.mail.value;
      console.log(logUsuario);
      logPass = prompt("Tu contraseña: ");
      datosLoggeo = usuarios.find(
        (altaUsuario) => altaUsuario.usuario === logUsuario
      );
    } while (!datosLoggeo.accesoCorrecto(logUsuario, logPass));

  }
  

  //   PROGRAMA PRINCIPAL
  const usuario1 = new Usuario("nombre 1", "usuario1", "testPass1");
  const usuario2 = new Usuario("nombre 2", "usuario2", "testPass2");
  let usuarios = [usuario1, usuario2];

  
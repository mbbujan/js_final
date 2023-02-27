const mailAutorizado = "prueba@mail.com";
const passAutorizado = "prueba123";

function validar(){
    const mail = document.getElementById("mail").value;
    const pass = document.getElementById("pass").value;
if(mail === mailAutorizado && pass === passAutorizado){
document.formulario-ingreso.submit()
return true;
}
else{
    alert("distintos");
    console.log(mail);
    console.log(mailAutorizado);
    return false;
}
}


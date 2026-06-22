document.addEventListener("DOMContentLoaded", () => {
  mostrarSaludo();
  iniciarTema();
  iniciarFormulario();
});

function mostrarSaludo() {
  const saludo = document.getElementById("saludo");
  const hora = new Date().getHours();
  let mensaje = "";

  if (hora < 12) {
    mensaje = "Buenos días, bienvenido a mi portafolio";
  } else if (hora < 19) {
    mensaje = "Buenas tardes, bienvenido a mi portafolio";
  } else {
    mensaje = "Buenas noches, bienvenido a mi portafolio";
  }

  saludo.textContent = mensaje;
}

function iniciarTema() {
  const botonTema = document.getElementById("tema-btn");

  botonTema.addEventListener("click", () => {
    document.body.classList.toggle("tema-claro");
  });
}

function obtenerCampos() {
  return {
    form: document.getElementById("form-suscripcion"),
    nombre: document.getElementById("nombre"),
    email: document.getElementById("email"),
    edad: document.getElementById("edad"),
    terminos: document.getElementById("terminos"),
    submitBtn: document.getElementById("submit-btn"),
    mensajeExito: document.getElementById("mensaje-exito")
  };
}

function validarNombre(valor) {
  if (valor.trim() === "") {
    return "El nombre es obligatorio";
  }

  if (valor.trim().length < 3) {
    return "El nombre debe tener al menos 3 caracteres";
  }

  return "";
}

function validarEmail(valor) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (valor.trim() === "") {
    return "El email es obligatorio";
  }

  if (!regex.test(valor.trim())) {
    return "Ingresa un email válido";
  }

  return "";
}

function validarEdad(valor) {
  if (valor.trim() === "") {
    return "La edad es obligatoria";
  }

  if (Number(valor) < 18) {
    return "Debes tener 18 años o más";
  }

  return "";
}

function validarTerminos(checked) {
  if (!checked) {
    return "Debes aceptar los términos";
  }

  return "";
}

function mostrarError(id, mensaje) {
  const elemento = document.getElementById(id);
  elemento.textContent = mensaje;
}

function validarFormulario(campos) {
  const errorNombre = validarNombre(campos.nombre.value);
  const errorEmail = validarEmail(campos.email.value);
  const errorEdad = validarEdad(campos.edad.value);
  const errorTerminos = validarTerminos(campos.terminos.checked);

  mostrarError("error-nombre", errorNombre);
  mostrarError("error-email", errorEmail);
  mostrarError("error-edad", errorEdad);
  mostrarError("error-terminos", errorTerminos);

  return (
    errorNombre === "" &&
    errorEmail === "" &&
    errorEdad === "" &&
    errorTerminos === ""
  );
}

function actualizarBoton(campos) {
  const formularioValido = validarFormulario(campos);
  campos.submitBtn.disabled = !formularioValido;
}

function limpiarFormulario(campos) {
  campos.form.reset();
  mostrarError("error-nombre", "");
  mostrarError("error-email", "");
  mostrarError("error-edad", "");
  mostrarError("error-terminos", "");
}

function iniciarFormulario() {
  const campos = obtenerCampos();

  const elementos = [
    campos.nombre,
    campos.email,
    campos.edad,
    campos.terminos
  ];

  elementos.forEach((elemento) => {
    elemento.addEventListener("input", () => {
      actualizarBoton(campos);
      campos.mensajeExito.textContent = "";
    });

    elemento.addEventListener("change", () => {
      actualizarBoton(campos);
      campos.mensajeExito.textContent = "";
    });
  });

  campos.form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formularioValido = validarFormulario(campos);

    if (!formularioValido) {
      campos.mensajeExito.textContent = "";
      return;
    }

    campos.mensajeExito.textContent = "Suscripción enviada correctamente";
    limpiarFormulario(campos);
    actualizarBoton(campos);
  });

  actualizarBoton(campos);
}
document.addEventListener("DOMContentLoaded", () => {
  mostrarSaludo();
});

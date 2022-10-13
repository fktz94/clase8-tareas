const $form = document.getElementById('carta-a-santa');

const nombre = $form.nombre.value;
const ciudad = document.formulario.ciudad.value;
const comportamiento = document.querySelector('[name=formulario]').comportamiento.value;
const descripcionRegalo = document.getElementById('carta-a-santa')['descripcion-regalo'].value;

function validarNombre(nombre) {
    if (nombre.length === 0) {
        return 'Este campo debe tener al menos un caracter';
    }
    if (nombre.length >= 50) {
        return 'Este campo debe tener menos de 50 caracteres'
    }
    if (!/^[a-z]+/i.test(nombre)) {
        return 'El campo nombre solo acepta letras'
    }
    return '';
}

function validarCiudad(ciudad) {
    if (ciudad === '') {
        return 'Tenés que elegir alguna ciudad'
    }
    return '';
}

function validarDescripcionRegalo(descripcionRegalo) {
    if (descripcionRegalo === '') {
        return 'Tenés que escribir la descripción del regalo que querés'
    }
    if (descripcionRegalo.length >= 100) {
        return 'Tenés que escribir menos de 100 caracteres'
    }
    if (!/^[a-z 0-9]+/i.test(descripcionRegalo)) {
        return 'El campo descripción solo puede tener números y letras'
    }
    return '';
}

function validarFormulario(event) {
    const nombre = $form.nombre.value;
    const ciudad = $form.ciudad.value;
    const descripcionRegalo = $form['descripcion-regalo'].value;

    const errorNombre = validarNombre(nombre);
    const errorCiudad = validarCiudad(ciudad);
    const errorDescripcionRegalo = validarDescripcionRegalo(descripcionRegalo)

    const errores = {
        nombre: errorNombre,
        ciudad: errorCiudad,
        'descripcion-regalo': errorDescripcionRegalo
    };

    borrarErroresAnteriores();

    const esExito = manejarErrores(errores) === 0;
    if (esExito) {
        document.querySelector('#exito').className = '';
        $form.className = 'oculto';

        function cambiarDePestaña() {
            window.location.href = 'wishlist.html'
        }
        
        setTimeout(cambiarDePestaña, 5000);
    }

    event.preventDefault();
}

function borrarErroresAnteriores() {
    const $errores = document.querySelectorAll('.es-error');
    for (let i = 0; i < $errores.length; i++) {
        $errores[i].remove();
    }
}

function manejarErrores(errores) {
    const keys = Object.keys(errores);
    let cantidadErrores = 0;

    keys.forEach(function (key) {
        const error = (errores[key]);
        const $errores = document.querySelector('#errores');
        if (error) {
            $form[key].className = 'error';
            const $error = document.createElement('li');
            $error.innerText = error;
            $error.className = 'es-error';
            $errores.appendChild($error);
            cantidadErrores++;
        } else {
            $form[key].className = '';
        }
    })
    return cantidadErrores;
}

validarNombre(nombre);
validarCiudad(ciudad);
validarDescripcionRegalo(descripcionRegalo);

$form.onsubmit = validarFormulario;

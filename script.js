// Función para cambiar de la pantalla de registro al horario
function irAlHorario() {
    const nombre = document.getElementById('input-nombre').value;
    const curso = document.getElementById('input-curso').value;

    if (nombre && curso) {
        // GUARDAR: Guardamos los datos en el celular antes de pasar de pantalla
        const datosUsuario = { nombre: nombre, curso: curso };
        localStorage.setItem('datosHorarioSnoopy', JSON.stringify(datosUsuario));

        // Actualizar los textos en la pantalla del horario
        document.getElementById('nombre-usuario').innerText = nombre;
        document.getElementById('curso-usuario').innerText = curso;

        // Cambiar de pantalla
        document.getElementById('pantalla-bienvenida').classList.remove('active');
        document.getElementById('pantalla-horario').classList.add('active');
    } else {
        alert("Por favor, completa tu nombre y curso");
    }
}

// CARGAR: Esta función revisa si ya hay datos guardados al abrir la página
function verificarDatosGuardados() {
    const datosGuardados = localStorage.getItem('datosHorarioSnoopy');

    if (datosGuardados) {
        const datos = JSON.parse(datosGuardados);
        
        // Si existen datos, llenamos los campos y saltamos directamente al horario
        document.getElementById('input-nombre').value = datos.nombre;
        document.getElementById('input-curso').value = datos.curso;
        irAlHorario();
    }
}

// Ejecutar la verificación apenas cargue la página
window.onload = verificarDatosGuardados;

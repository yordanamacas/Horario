let horario = JSON.parse(localStorage.getItem('miHorarioSnoopy')) || { 
    "Lunes": [], "Martes": [], "Miercoles": [], "Jueves": [], "Viernes": [] 
};
let diaActual = "Lunes";

function guardarEnMemoria() {
    localStorage.setItem('miHorarioSnoopy', JSON.stringify(horario));
}

function irARegistro() {
    document.getElementById('pantalla-bienvenida').style.display = 'none';
    document.getElementById('pantalla-registro').style.display = 'flex';
}

function finalizarRegistro() {
    const nombre = document.getElementById('nombre-input').value;
    const curso = document.getElementById('curso-input').value;
    if (nombre && curso) {
        localStorage.setItem('usuarioSnoopy', JSON.stringify({ nombre, curso }));
        entrarAlHorario(nombre, curso);
    }
}

function entrarAlHorario(nombre, curso) {
    document.getElementById('user-display').innerText = `${nombre} | ${curso}`;
    document.getElementById('pantalla-bienvenida').style.display = 'none';
    document.getElementById('pantalla-registro').style.display = 'none';
    document.getElementById('pantalla-horario').style.display = 'block';
    iniciarRelojYFecha();
    renderizar();
}

function iniciarRelojYFecha() {
    const meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

    const actualizarTodo = () => {
        const ahora = new Date();
        // Forzar actualización de los elementos
        if(document.getElementById('reloj')) document.getElementById('reloj').innerText = ahora.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        if(document.getElementById('dia-num')) document.getElementById('dia-num').innerText = ahora.getDate();
        if(document.getElementById('mes-txt')) document.getElementById('mes-txt').innerText = meses[ahora.getMonth()];
        
        if (!window.diaDetectado) {
            let hoy = diasSemana[ahora.getDay()];
            diaActual = (hoy === "Domingo" || hoy === "Sabado") ? "Lunes" : hoy;
            window.diaDetectado = true;
            renderizar();
        }
    };

    setInterval(actualizarTodo, 1000);
    actualizarTodo();
}

// Las demás funciones (seleccionarDia, nuevaAsignatura, renderizar) se quedan igual...
// Solo asegúrate de llamar a cargar al final:

window.onload = function() {
    const user = JSON.parse(localStorage.getItem('usuarioSnoopy'));
    if (user) {
        entrarAlHorario(user.nombre, user.curso);
    }
};

// Re-agrega aquí tus funciones de renderizar, seleccionarDia, etc. que ya tenías

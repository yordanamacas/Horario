let horario = JSON.parse(localStorage.getItem('miHorarioSnoopy')) || { 
    "Lunes": [], "Martes": [], "Miercoles": [], "Jueves": [], "Viernes": [] 
};
let diaActual = "Lunes";

function guardarEnMemoria() {
    localStorage.setItem('miHorarioSnoopy', JSON.stringify(horario));
}

function irARegistro() {
    // Forzamos la limpieza de clases para evitar que se queden trabadas
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById('pantalla-registro').classList.add('active');
}

function finalizarRegistro() {
    const nombre = document.getElementById('nombre-input').value;
    const curso = document.getElementById('curso-input').value;
    if (nombre && curso) {
        localStorage.setItem('usuarioSnoopy', JSON.stringify({ nombre, curso }));
        entrarAlHorario(nombre, curso);
    } else {
        alert("Por favor, completa tus datos para continuar.");
    }
}

function entrarAlHorario(nombre, curso) {
    const display = document.getElementById('user-display');
    if(display) display.innerText = `${nombre} | ${curso}`;
    
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById('pantalla-horario').classList.add('active');
    
    iniciarRelojYFecha();
    renderizar();
}

function seleccionarDia(dia, numero) {
    diaActual = dia;
    const diaNumEl = document.getElementById('dia-num');
    if(diaNumEl) diaNumEl.innerText = numero;
    
    document.querySelectorAll('.nav-dias button').forEach(btn => {
        btn.classList.toggle('active', btn.innerText.toLowerCase().includes(dia.substring(0,2).toLowerCase()));
    });
    renderizar();
}

function nuevaAsignatura() {
    const nombre = prompt("Nombre de la materia:");
    const hora = prompt("Horario (ej: 08:00 - 09:00):");
    
    if (nombre && hora) {
        if (!horario[diaActual]) horario[diaActual] = [];
        horario[diaActual].push({ nombre, hora, tareas: [] });
        guardarEnMemoria();
        renderizar();
    }
}

function agregarTarea(idx) {
    const t = prompt("Actividad o tarea pendiente:");
    if (t) {
        horario[diaActual][idx].tareas.push(t);
        guardarEnMemoria();
        renderizar();
    }
}

function editarMateria(idx) {
    const n = prompt("Nuevo nombre:", horario[diaActual][idx].nombre);
    const h = prompt("Nuevo horario:", horario[diaActual][idx].hora);
    if (n && h) {
        horario[diaActual][idx].nombre = n;
        horario[diaActual][idx].hora = h;
        guardarEnMemoria();
        renderizar();
    }
}

function renderizar() {
    const contenedor = document.getElementById('lista-materias');
    if (!contenedor) return;
    contenedor.innerHTML = "";

    if (horario[diaActual].length === 0) {
        contenedor.innerHTML = `<p style='text-align:center; color:#1a4a75; font-weight:bold; margin-top:20px;'>
            No hay materias para el ${diaActual}.<br>¡Toca el + para agregar!
        </p>`;
        return;
    }

    horario[diaActual].forEach((m, idx) => {
        const div = document.createElement('div');
        div.className = "card-blanca-grande"; 
        div.style.marginBottom = "15px";
        div.style.padding = "15px";
        div.style.flexDirection = "column"; // Ajuste para que las tareas salgan debajo
        div.style.alignItems = "stretch";

        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                <div onclick="editarMateria(${idx})" style="flex-grow:1;">
                    <h3 style="margin:0; color:#1a4a75;">${m.nombre}</h3>
                    <p style="margin:5px 0 0; color:#666; font-size:13px;">${m.hora}</p>
                </div>
                <button onclick="agregarTarea(${idx})" style="border-radius:50%; width:35px; height:35px; background:#1a4a75; color:white; border:none; font-size:20px; flex-shrink:0;">+</button>
            </div>
            ${m.tareas.length > 0 ? `
                <div style="margin-top:10px; border-top:1px solid #eee; padding-top:10px;">
                    ${m.tareas.map(t => `<div style="font-size:14px; color:#333; margin-bottom:4px;">• ${t}</div>`).join('')}
                </div>
            ` : ''}
        `;
        contenedor.appendChild(div);
    });
}

function iniciarRelojYFecha() {
    const meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
    const actualizar = () => {
        const ahora = new Date();
        const relojEl = document.getElementById('reloj');
        const mesEl = document.getElementById('mes-txt');
        const diaNumEl = document.getElementById('dia-num');

        if(relojEl) relojEl.innerText = ahora.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        if(mesEl) mesEl.innerText = meses[ahora.getMonth()];
        
        // Solo ponemos la fecha de hoy automáticamente si el usuario no ha navegado a otro día
        if(diaNumEl && diaNumEl.innerText === "--") {
            diaNumEl.innerText = ahora.getDate();
        }
    };
    setInterval(actualizar, 1000);
    actualizar();
}

window.onload = function() {
    const user = JSON.parse(localStorage.getItem('usuarioSnoopy'));
    if (user) {
        entrarAlHorario(user.nombre, user.curso);
    }
};

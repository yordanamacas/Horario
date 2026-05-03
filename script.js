let horario = { "Lunes": [], "Martes": [], "Miercoles": [], "Jueves": [], "Viernes": [] };
let diaActual = "Martes";

function irARegistro() {
    document.getElementById('pantalla-bienvenida').classList.remove('active');
    document.getElementById('pantalla-registro').classList.add('active');
}

function finalizarRegistro() {
    const nombre = document.getElementById('nombre-input').value;
    const curso = document.getElementById('curso-input').value;
    
    if (nombre && curso) {
        document.getElementById('user-display').innerText = `${nombre} | ${curso}`;
        document.getElementById('pantalla-registro').classList.remove('active');
        document.getElementById('pantalla-horario').classList.add('active');
        iniciarReloj();
        renderizar();
    }
}

function seleccionarDia(dia, numero) {
    diaActual = dia;
    document.getElementById('dia-num').innerText = numero;
    
    document.querySelectorAll('.nav-dias button').forEach(btn => {
        btn.classList.toggle('active', btn.innerText.includes(dia.substring(0,2)));
    });
    renderizar();
}

function nuevaAsignatura() {
    const nombre = prompt("Materia:");
    const hora = prompt("Horario:");
    if (nombre && hora) {
        horario[diaActual].push({ nombre, hora, tareas: [] });
        renderizar();
    }
}

function editarMateria(idx) {
    const n = prompt("Nuevo nombre:", horario[diaActual][idx].nombre);
    const h = prompt("Nuevo horario:", horario[diaActual][idx].hora);
    if (n && h) {
        horario[diaActual][idx].nombre = n;
        horario[diaActual][idx].hora = h;
        renderizar();
    }
}

function agregarTarea(idx) {
    const t = prompt("Actividad pendiente:");
    if (t) {
        horario[diaActual][idx].tareas.push(t);
        renderizar();
    }
}

function renderizar() {
    const contenedor = document.getElementById('lista-materias');
    contenedor.innerHTML = "";
    horario[diaActual].forEach((m, idx) => {
        const div = document.createElement('div');
        div.className = "materia-card";
        div.innerHTML = `
            <div class="materia-header">
                <div onclick="editarMateria(${idx})">
                    <h3 style="margin:0; color:#1a4a75;">${m.nombre}</h3>
                    <p style="margin:5px 0 0; color:#666; font-size:13px;">${m.hora}</p>
                </div>
                <button class="btn-tarea" onclick="agregarTarea(${idx})">+</button>
            </div>
            ${m.tareas.length > 0 ? `<div style="margin-top:10px; border-top:1px solid #eee; padding-top:10px;">${m.tareas.map(t => `<div style="font-size:14px;">• ${t}</div>`).join('')}</div>` : ''}
        `;
        contenedor.appendChild(div);
    });
}

function iniciarReloj() {
    setInterval(() => {
        const ahora = new Date();
        document.getElementById('reloj').innerText = ahora.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        // Actualiza el mes a nombre completo
        const meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
        document.getElementById('mes-txt').innerText = meses[ahora.getMonth()];
    }, 1000);
}
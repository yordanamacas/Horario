let horario = JSON.parse(localStorage.getItem('miHorarioSnoopy')) || { 
    "Lunes": [], "Martes": [], "Miercoles": [], "Jueves": [], "Viernes": [] 
};
let diaActual = "Martes";

// Función para guardar todo en el celular
function guardarEnMemoria() {
    localStorage.setItem('miHorarioSnoopy', JSON.stringify(horario));
}

function irARegistro() {
    document.getElementById('pantalla-bienvenida').classList.remove('active');
    document.getElementById('pantalla-registro').classList.add('active');
}

function finalizarRegistro() {
    const nombre = document.getElementById('nombre-input').value;
    const curso = document.getElementById('curso-input').value;
    
    if (nombre && curso) {
        const datosUser = { nombre, curso };
        localStorage.setItem('usuarioSnoopy', JSON.stringify(datosUser));
        entrarAlHorario(nombre, curso);
    } else {
        alert("Rellena tus datos");
    }
}

function entrarAlHorario(nombre, curso) {
    document.getElementById('user-display').innerText = `${nombre} | ${curso}`;
    document.getElementById('pantalla-bienvenida').classList.remove('active');
    document.getElementById('pantalla-registro').classList.remove('active');
    document.getElementById('pantalla-horario').classList.add('active');
    iniciarReloj();
    renderizar();
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

function agregarTarea(idx) {
    const t = prompt("Actividad pendiente:");
    if (t) {
        horario[diaActual][idx].tareas.push(t);
        guardarEnMemoria();
        renderizar();
    }
}

function renderizar() {
    const contenedor = document.getElementById('lista-materias');
    if(!contenedor) return;
    contenedor.innerHTML = "";
    horario[diaActual].forEach((m, idx) => {
        const div = document.createElement('div');
        div.className = "card-blanca-grande"; // Usando tu clase de estilo
        div.style.marginBottom = "15px";
        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div onclick="editarMateria(${idx})">
                    <h3 style="margin:0;">${m.nombre}</h3>
                    <p style="margin:0; font-size:12px;">${m.hora}</p>
                </div>
                <button onclick="agregarTarea(${idx})" style="border-radius:50%; width:30px; height:30px;">+</button>
            </div>
            <div style="margin-top:10px;">
                ${m.tareas.map(t => `<div style="font-size:13px;">• ${t}</div>`).join('')}
            </div>
        `;
        contenedor.appendChild(div);
    });
}

function iniciarReloj() {
    setInterval(() => {
        const ahora = new Date();
        document.getElementById('reloj').innerText = ahora.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        const meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
        document.getElementById('mes-txt').innerText = meses[ahora.getMonth()];
    }, 1000);
}

// Carga automática al abrir
window.onload = function() {
    const user = JSON.parse(localStorage.getItem('usuarioSnoopy'));
    if (user) {
        entrarAlHorario(user.nombre, user.curso);
    }
};

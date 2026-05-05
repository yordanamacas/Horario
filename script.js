// 1. FUNCIÓN PARA AGREGAR ASIGNATURAS (Corregida)
function nuevaAsignatura() {
    const nombre = prompt("Nombre de la materia:");
    const hora = prompt("Horario (ej: 08:00 - 09:00):");
    
    if (nombre && hora) {
        // Añadir al objeto horario
        if (!horario[diaActual]) {
            horario[diaActual] = [];
        }
        
        horario[diaActual].push({ 
            nombre: nombre, 
            hora: hora, 
            tareas: [] 
        });
        
        guardarEnMemoria(); // Guardar en el Redmi 10C
        renderizar();       // Mostrar en pantalla
    } else {
        alert("Debes completar ambos campos para agregar la materia.");
    }
}

// 2. FUNCIÓN DE RENDERIZAR (Reforzada para móviles)
function renderizar() {
    const contenedor = document.getElementById('lista-materias');
    if (!contenedor) return;

    contenedor.innerHTML = ""; // Limpiar antes de dibujar

    if (horario[diaActual].length === 0) {
        contenedor.innerHTML = "<p style='text-align:center; color:gray;'>No hay materias para este día.</p>";
        return;
    }

    horario[diaActual].forEach((m, idx) => {
        const div = document.createElement('div');
        div.className = "card-blanca-grande"; // Asegúrate que esta clase esté en tu style.css
        div.style.marginBottom = "15px";
        div.style.padding = "15px";
        
        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div onclick="editarMateria(${idx})">
                    <h3 style="margin:0; color:#1a4a75;">${m.nombre}</h3>
                    <p style="margin:5px 0 0; color:#666; font-size:13px;">${m.hora}</p>
                </div>
                <button onclick="agregarTarea(${idx})" style="border-radius:50%; width:35px; height:35px; background:#1a4a75; color:white; border:none; font-size:20px;">+</button>
            </div>
            ${m.tareas.length > 0 ? `<div style="margin-top:10px; border-top:1px solid #eee; padding-top:10px;">${m.tareas.map(t => `<div style="font-size:14px; color:#333;">• ${t}</div>`).join('')}</div>` : ''}
        `;
        contenedor.appendChild(div);
    });
}

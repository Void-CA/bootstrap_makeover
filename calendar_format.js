import { fetchJsonData } from './data.js';

const data = fetchJsonData();
const calendarBtn = document.getElementById('calendar');
let contentContainer = document.getElementById('content-container');
let calendarActive = false;

function toggleBtnText() {
    if (!calendarActive) {
        calendarBtn.innerHTML = '<i class="bi bi-table"></i> Volver a formato de Tabla';
        calendarActive = true;
    }
    else {
        calendarBtn.innerHTML = '<i class="bi bi-calendar"></i> Cambiar a formato de Calendario';
        calendarActive = false; 
    }
}


function buildTable() {
    const tbody = contentContainer.querySelector('tbody');
    tbody.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        const row = document.createElement('tr');

        // CÓDIGO
        const cellCodigo = document.createElement('td');
        cellCodigo.textContent = data[i].codigo;
        row.appendChild(cellCodigo);

        // ASIGNATURA
        const cellAsignatura = document.createElement('td');
        cellAsignatura.className = 'fw-bold';
        cellAsignatura.textContent = data[i].asignatura;
        row.appendChild(cellAsignatura);

        // GRUPO (badge)
        const cellGrupo = document.createElement('td');
        const spanGrupo = document.createElement('span');
        spanGrupo.textContent = data[i].grupo;
        // Badge color según grupo
        if (data[i].grupo === 'Gpo1') {
            spanGrupo.className = 'badge bg-primary';
        } else if (data[i].grupo === 'Gpo3') {
            spanGrupo.className = 'badge bg-success';
        } else if (data[i].grupo === 'Gpo4') {
            spanGrupo.className = 'badge bg-warning text-dark';
        } else if (data[i].grupo === 'Gpo7') {
            spanGrupo.className = 'badge bg-info text-dark';
        } else if (data[i].grupo === 'Gpo8') {
            spanGrupo.className = 'badge bg-danger';
        } else {
            spanGrupo.className = 'badge bg-secondary';
        }
        cellGrupo.appendChild(spanGrupo);
        row.appendChild(cellGrupo);

        // DÍA
        const cellDia = document.createElement('td');
        cellDia.textContent = data[i].dia;
        row.appendChild(cellDia);

        // HORARIO
        const cellHorario = document.createElement('td');
        cellHorario.textContent = data[i].horario;
        row.appendChild(cellHorario);

        // AULA (badge)
        const cellAula = document.createElement('td');
        const spanAula = document.createElement('span');
        spanAula.textContent = data[i].aula;
        // Badge color según aula
        if (data[i].aula === 'E201') {
            spanAula.className = 'badge bg-warning text-dark';
        } else if (data[i].aula === 'D104') {
            spanAula.className = 'badge bg-info text-dark';
        } else {
            spanAula.className = 'badge bg-secondary';
        }
        cellAula.appendChild(spanAula);
        row.appendChild(cellAula);

        tbody.appendChild(row);
    }
}








calendarBtn.addEventListener('click', () => {
    // Aquí puedes agregar la lógica para cambiar al formato de calendario
    toggleBtnText();
    
    });
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








calendarBtn.addEventListener('click', () => {
    // Aquí puedes agregar la lógica para cambiar al formato de calendario
    toggleBtnText();
    });
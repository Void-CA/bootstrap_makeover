import { fetchJsonData } from './data.js';
import { ContentBuilder } from './builder.js';

const data = await fetchJsonData();
const calendarBtn = document.getElementById('calendar');
let builder = new ContentBuilder('content-container');
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

function toggleContent() {
    if (calendarActive) {
        builder.buildTable(data);
    }
    else {
        builder.buildCalendar(data);
    }
}

calendarBtn.addEventListener('click', () => {
    toggleContent();
    toggleBtnText();

    });

builder.buildTable(data);
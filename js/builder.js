export class ContentBuilder {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.badgeConfig = {
            grupo: {
                'Gpo1': 'primary',
                'Gpo3': 'success',
                'Gpo4': 'warning text-dark',
                'Gpo7': 'info text-dark',
                'Gpo8': 'danger',
                'default': 'secondary'
            },
            aula: {
                'E201': 'warning text-dark',
                'D104': 'info text-dark',
                'default': 'secondary'
            }
        };
    }

    // --- HELPERS ---

    createBadge(type, value) {
        const span = document.createElement('span');
        const badgeClass = this.badgeConfig[type][value] || this.badgeConfig[type]['default'];
        span.className = `badge bg-${badgeClass}`;
        span.textContent = value;
        return span;
    }

    createCell(content) {
        const cell = document.createElement('td');
        if (content instanceof HTMLElement) {
            cell.appendChild(content);
        } else {
            cell.textContent = content || '';
        }
        return cell;
    }

    createTableRow(item) {
        const row = document.createElement('tr');
        row.appendChild(this.createCell(item.codigo));
        row.appendChild(this.createCell(item.asignatura));
        row.appendChild(this.createCell(this.createBadge('grupo', item.grupo)));
        row.appendChild(this.createCell(item.dia));
        row.appendChild(this.createCell(item.horario));
        row.appendChild(this.createCell(this.createBadge('aula', item.aula)));
        return row;
    }

    createCalendarCard(item) {
        const card = document.createElement('div');
        card.className = 'p-3 mb-2 bg-dark-subtle text-dark rounded-3';
        
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body p-2';
        
        const title = document.createElement('h5');
        title.className = 'card-title mb-1 fw-bold';
        title.textContent = item.asignatura;
        
        const classroom = document.createElement('p');
        classroom.className = 'card-text mb-0';
        classroom.textContent = `Aula: ${item.aula}`;
        
        const groupBadge = this.createBadge('grupo', item.grupo);

        

        cardBody.appendChild(title);
        cardBody.appendChild(classroom);
        cardBody.appendChild(groupBadge);
        card.appendChild(cardBody);

        return card;
    }
    // --- BUILDERS ---

    buildTable(data) {
        if (!this.container) return;
        this.container.innerHTML = '';

        const table = document.createElement('table');
        table.className = 'table table-hover table-striped align-middle text-center';
        
        const headers = ['CÓDIGO', 'ASIGNATURA', 'GRUPO', 'DÍA', 'HORARIO', 'AULA'];
        const thead = document.createElement('thead');
        thead.className = 'table-dark';
        const headerRow = document.createElement('tr');

        headers.forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        data.forEach(item => {
            tbody.appendChild(this.createTableRow(item));
        });

        table.appendChild(tbody);
        this.container.appendChild(table);
    }

    buildCalendar(data) {
        if (!this.container) return;
        this.container.innerHTML = '';

        const days = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
        const schedule = ["08:00 - 09:40", "09:40 - 10:00", "10:00 - 11:40", "11:40 - 01:00",  "01:00 - 02:40","02:40 - 03:00", "03:00 - 04:40"];
        const rest_times = ["09:40 - 10:00", "11:40 - 01:00", "02:40 - 03:00"];
        const table = document.createElement('table');
        table.className = 'table table-bordered text-center align-middle';

        const thead = document.createElement('thead');
        thead.className = 'table-dark';
        const headRow = document.createElement('tr');
        headRow.appendChild(document.createElement('th')); 

        days.forEach(day => {
            const th = document.createElement('th');
            th.textContent = day;
            headRow.appendChild(th);
        });

        thead.appendChild(headRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        schedule.forEach(horario => {
            if (rest_times.includes(horario)) {
                const row = document.createElement('tr');
                const thHorario = document.createElement('th');
                thHorario.className = 'table-secondary';
                thHorario.textContent = horario;
                row.appendChild(thHorario);
                const td = document.createElement('td');
                td.colSpan = days.length;
                td.className = 'table-secondary';
                if (horario == "11:40 - 01:00") {
                    td.innerHTML = '<em>Almuerzo</em>';
                } else {
                    td.innerHTML = '<em>Receso</em>';
                }
                row.appendChild(td);
                tbody.appendChild(row);
                return;
            }
            const row = document.createElement('tr');
            const thHorario = document.createElement('th');
            thHorario.className = 'table-secondary';
            thHorario.textContent = horario;
            row.appendChild(thHorario);

            days.forEach(day => {
                const cell = document.createElement('td');
                const events = data.filter(d => d.dia === day && d.horario === horario);

                events.forEach(evt => {
                    cell.appendChild(this.createCalendarCard(evt));
                });
                row.appendChild(cell);
            });
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        this.container.appendChild(table);
    }
}
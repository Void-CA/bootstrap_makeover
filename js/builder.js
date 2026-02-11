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

        const days = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES'];
        const schedule = [...new Set(data.map(d => d.horario))].sort();

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
            const row = document.createElement('tr');
            const thHorario = document.createElement('th');
            thHorario.className = 'table-secondary';
            thHorario.textContent = horario;
            row.appendChild(thHorario);

            days.forEach(day => {
                const cell = document.createElement('td');
                const events = data.filter(d => d.dia === day && d.horario === horario);

                events.forEach(evt => {
                    const card = document.createElement('div');
                    card.className = 'p-1 mb-1 border rounded bg-light';

                    const titulo = document.createElement('div');
                    titulo.className = 'fw-bold small';
                    titulo.textContent = evt.asignatura;

                    card.appendChild(titulo);
                    card.appendChild(this.createBadge('grupo', evt.grupo));
                    card.appendChild(document.createTextNode(' '));
                    const aulaText = document.createTextNode('aula: ');
                    card.appendChild(aulaText);
                    card.appendChild(this.createBadge('aula', evt.aula));

                    cell.appendChild(card);
                });
                row.appendChild(cell);
            });
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        this.container.appendChild(table);
    }
}
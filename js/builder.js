export class ContentBuilder {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.badgeConfig = {
            grupo: {
                'Gpo1': 'badge bg-primary',
                'Gpo3': 'badge bg-success',
                'Gpo4': 'badge bg-warning text-dark',
                'Gpo7': 'badge bg-info text-dark',
                'Gpo8': 'badge bg-danger',
                'default': 'badge bg-secondary'
            },
            aula: {
                'E201': 'badge bg-warning text-dark',
                'D104': 'badge bg-info text-dark',
                'default': 'badge bg-secondary'
            }
        };
    }

    buildTable(data) {
        this.container.innerHTML = '';
        const headers = ['CÓDIGO', 'ASIGNATURA', 'GRUPO', 'DÍA', 'HORARIO', 'AULA'];
        const table = document.createElement('table');
        table.className = 'table table-hover table-striped align-middle text-center';
        const thead = document.createElement('thead');
        thead.className = 'table-dark';
        const headerRow = document.createElement('tr');

        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        for (let i = 0; i < data.length; i++) {
            const row = document.createElement('tr');

            // CÓDIGO
            const cellCodigo = document.createElement('td');
            cellCodigo.textContent = data[i].codigo;
            row.appendChild(cellCodigo);

            // ASIGNATURA
            const cellAsignatura = document.createElement('td');
            cellAsignatura.textContent = data[i].asignatura;
            row.appendChild(cellAsignatura);

            // GRUPO (badge)
            const cellGrupo = document.createElement('td');
            const spanGrupo = document.createElement('span');
            const grupoClass = this.badgeConfig.grupo[data[i].grupo] || this.badgeConfig.grupo['default'];
            spanGrupo.className = grupoClass;
            spanGrupo.textContent = data[i].grupo;
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
            const aulaClass = this.badgeConfig.aula[data[i].aula] || this.badgeConfig.aula['default'];
            spanAula.className = aulaClass;
            spanAula.textContent = data[i].aula;
            cellAula.appendChild(spanAula);
            row.appendChild(cellAula);

            tbody.appendChild(row);
        }
        table.appendChild(tbody);
        this.container.appendChild(table);
    }

    buildCalendar(data) {
    this.container.innerHTML = '';

    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const horarios = [...new Set(data.map(d => d.horario))].sort();

    const table = document.createElement('table');
    table.className = 'table table-bordered text-center align-middle';

    // THEAD
    const thead = document.createElement('thead');
    thead.className = 'table-dark';
    const headRow = document.createElement('tr');

    headRow.appendChild(document.createElement('th')); // esquina vacía

    dias.forEach(dia => {
        const th = document.createElement('th');
        th.textContent = dia;
        headRow.appendChild(th);
    });

    thead.appendChild(headRow);
    table.appendChild(thead);

    // TBODY
    const tbody = document.createElement('tbody');

    horarios.forEach(horario => {
        const row = document.createElement('tr');

        // Columna horario
        const thHorario = document.createElement('th');
        thHorario.className = 'table-secondary';
        thHorario.textContent = horario;
        row.appendChild(thHorario);

        dias.forEach(dia => {
            const cell = document.createElement('td');

            const eventos = data.filter(
                d => d.dia === dia && d.horario === horario
            );

            eventos.forEach(evt => {
                const card = document.createElement('div');
                card.className = 'p-1 mb-1 border rounded bg-light';

                const titulo = document.createElement('div');
                titulo.className = 'fw-bold small';
                titulo.textContent = evt.asignatura;

                const grupo = document.createElement('span');
                grupo.className =
                    this.badgeConfig.grupo[evt.grupo] ||
                    this.badgeConfig.grupo.default;
                grupo.textContent = evt.grupo;

                const aula = document.createElement('span');
                aula.className =
                    this.badgeConfig.aula[evt.aula] ||
                    this.badgeConfig.aula.default;
                aula.textContent = evt.aula;

                card.appendChild(titulo);
                card.appendChild(grupo);
                card.appendChild(document.createTextNode(' '));
                card.appendChild(aula);

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
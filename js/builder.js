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
        headers = ['CÓDIGO', 'ASIGNATURA', 'GRUPO', 'DÍA', 'HORARIO', 'AULA'];
        const table = document.createElement('table');
        table.className = 'table table-striped';
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        }
        );
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
            cellAsignatura.className = 'fw-bold';
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
    }

    buildCalendar(data) {

    }
}
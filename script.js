// Скрипт для Завдання 1
function FormData(form) {

    const name_pattern = /^[А-ЯІЇЄҐ][а-яіїєґ]+\s[А-ЯІЇЄҐ]\.[А-ЯІЇЄҐ]\.$/;
    const group_pattern = /^[А-ЯІЇЄҐ]{2}-\d{2}$/;
    const phone_pattern = /^\(\d{3}\)-\d{3}-\d{2}-\d{3}$/;
    const id_card_pattern = /^[А-ЯІЇЄҐ]{2}\s№\d{6}$/;
    const faculty_pattern = /^[А-ЯІЇЄҐ]+$/;
    let allValid = true; 

    document.querySelectorAll('.form-row').forEach(row => {
        row.classList.remove('error');
    });
    document.getElementById('outputContainer').style.display = 'none';

    if (!name_pattern.test(form.name.value)) {
        allValid = false;
        document.getElementById('row-name').classList.add('error');
    }
    if (!group_pattern.test(form.group.value)) {
        allValid = false;
        document.getElementById('row-group').classList.add('error');
    }
    if (!phone_pattern.test(form.phone.value)) {
        allValid = false;
        document.getElementById('row-phone').classList.add('error');
    }
    if (!id_card_pattern.test(form.id_card.value)) {
        allValid = false;
        document.getElementById('row-id_card').classList.add('error');
    }
    if (!faculty_pattern.test(form.faculty.value)) {
        allValid = false;
        document.getElementById('row-faculty').classList.add('error');
    }
    if (allValid) {
        const bodyContent = `
            <h2>Введені дані</h2>
            <p><strong>1. ПІБ:</strong> ${form.name.value}</p>
            <p><strong>2. Група:</strong> ${form.group.value}</p>
            <p><strong>3. Телефон:</strong> ${form.phone.value}</p>
            <p><strong>4. ID-card:</strong> ${form.id_card.value}</p>
            <p><strong>5. Факультет:</strong> ${form.faculty.value}</p>
        `;
        const newWindow = window.open("", "formDataWindow", "width=500,height=400,scrollbars=yes,resizable=yes");
        newWindow.document.title = "Підтверджені дані";
        const linkEl = newWindow.document.createElement('link');
        linkEl.rel = 'stylesheet';
        linkEl.type = 'text/css';
        linkEl.href = 'style.css';
        newWindow.document.head.appendChild(linkEl);
        newWindow.document.body.innerHTML = bodyContent;
    } 
    
    return false; 
}
// Скрипт для Завдання 2
document.addEventListener('DOMContentLoaded', (event) => {
    const table = document.getElementById('table');
    const colorPicker = document.getElementById('colorPicker');
    
   
    const clearButton = document.getElementById('clearTableButton');
    
    if (table && colorPicker) { 
        const var_number = 2; 
        const rows = 6;
        const cols = 6;
        let cellToMonitor = null;

        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        let counter = 1;
        for (let i = 0; i < rows; i++) {
            const row = table.insertRow();
            for (let j = 0; j < cols; j++) {
                const cell = row.insertCell();
                cell.textContent = counter;
                cell.dataset.cellNumber = counter;

                if (counter === var_number) {
                    cellToMonitor = cell;
                    cell.style.border = '5px solid #ff0066ff'; 
                    cell.style.fontWeight = 'bold';
                }
                counter++;
            }
        }

        if (cellToMonitor) {
            cellToMonitor.addEventListener('mouseover', () => {
                cellToMonitor.style.backgroundColor = getRandomColor();
            }); 

            cellToMonitor.addEventListener('click', () => {
                cellToMonitor.style.backgroundColor = colorPicker.value;
            });

            cellToMonitor.addEventListener('dblclick', () => {
                const tableRows = table.rows;
                const dblClickColor = colorPicker.value;
                const columnIndex = cellToMonitor.cellIndex; 

                for (let i = 0; i < tableRows.length; i++) {
                    const cellInColumn = tableRows[i].cells[columnIndex];
                    if (cellInColumn) {
                        cellInColumn.style.backgroundColor = dblClickColor;
                    }
                }
            });
        }

      
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                const tableRows = table.rows;
                
                for (let i = 0; i < tableRows.length; i++) {
                    tableRows[i].style.backgroundColor = '';
                    
                    const cells = tableRows[i].cells;
                    for (let j = 0; j < cells.length; j++) {
                        cells[j].style.backgroundColor = '';
                    }
                }
            });
        }
    }
});
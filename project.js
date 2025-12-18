
document.addEventListener('DOMContentLoaded', function() {
    generateMatrices(); 
});

function showError(message) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Okey'
    });
}

function calculateCoord() {
    let y = parseFloat(document.getElementById('y_coord').value);
    let x = parseFloat(document.getElementById('x_coord').value);
    let dist = parseFloat(document.getElementById('distance').value);
    let azim = parseFloat(document.getElementById('azimuth').value);

    if (isNaN(y) || isNaN(x) || isNaN(dist) || isNaN(azim)) return showError("Missing data!");

    let rad = azim * (Math.PI / 200);
    let dy = dist * Math.sin(rad);
    let dx = dist * Math.cos(rad);

    document.getElementById('deltaY').innerText = dy.toFixed(3);
    document.getElementById('deltaX').innerText = dx.toFixed(3);
    document.getElementById('newY').innerText = (y + dy).toFixed(3);
    document.getElementById('newX').innerText = (x + dx).toFixed(3);
    document.getElementById('coordResult').style.display = 'block';
}


function generateMatrices() {
    let rA = parseInt(document.getElementById('matA_rows').value);
    let cA = parseInt(document.getElementById('matA_cols').value);
    let rB = parseInt(document.getElementById('matB_rows').value);
    let cB = parseInt(document.getElementById('matB_cols').value);

    if (cA !== rB) {
        document.getElementById('matrixWarning').style.display = 'block';
    } else {
        document.getElementById('matrixWarning').style.display = 'none';
    }

    renderMatrixInputs('matrixA_container', 'a', rA, cA);
    renderMatrixInputs('matrixB_container', 'b', rB, cB);
    document.getElementById('matrixResult').style.display = 'none';
}

function renderMatrixInputs(containerId, prefix, rows, cols) {
    let html = '';
    for(let i=0; i<rows; i++) {
        html += '<div style="white-space:nowrap;">';
        for(let j=0; j<cols; j++) {
            html += `<input type="number" class="matrix-input" id="${prefix}_${i}_${j}" value="0">`;
        }
        html += '</div>';
    }
    document.getElementById(containerId).innerHTML = html;
}

function multiplyMatrices() {
    let rA = parseInt(document.getElementById('matA_rows').value);
    let cA = parseInt(document.getElementById('matA_cols').value);
    let rB = parseInt(document.getElementById('matB_rows').value);
    let cB = parseInt(document.getElementById('matB_cols').value);

    if (cA !== rB) return showError("For matrix multiplication, the number of columns in Matrix A must equal the number of rows in Matrix B!");


    let matA = [], matB = [];
    for(let i=0; i<rA; i++) {
        matA[i] = [];
        for(let j=0; j<cA; j++) matA[i][j] = parseFloat(document.getElementById(`a_${i}_${j}`).value) || 0;
    }
    for(let i=0; i<rB; i++) {
        matB[i] = [];
        for(let j=0; j<cB; j++) matB[i][j] = parseFloat(document.getElementById(`b_${i}_${j}`).value) || 0;
    }

    
    let result = [];
    for(let i=0; i<rA; i++) {
        result[i] = [];
        for(let j=0; j<cB; j++) {
            let sum = 0;
            for(let k=0; k<cA; k++) {
                sum += matA[i][k] * matB[k][j];
            }
            result[i][j] = sum;
        }
    }


    let html = '';
    for(let i=0; i<rA; i++) {
        html += '<div style="white-space:nowrap;">';
        for(let j=0; j<cB; j++) {
            html += `<input type="text" class="matrix-input bg-light" readonly value="${result[i][j].toFixed(2)}">`;
        }
        html += '</div>';
    }
    document.getElementById('matrixC_container').innerHTML = html;
    document.getElementById('matrixResult').style.display = 'block';
}


function calculateTrig() {
    let tbody = document.getElementById('trigTableBody');
    tbody.innerHTML = "";
    let hasInput = false;
    document.querySelectorAll('.angle-input').forEach(inp => {
        let deg = parseFloat(inp.value);
        if(!isNaN(deg)) {
            hasInput = true;
            let rad = deg * Math.PI/180;
            if((deg/90)%2==1){
                showError("You entered an undefined value for tangent.")
                tbody.innerHTML += `<tr><td>${deg}°</td><td class="text-info fw-bold">${(deg*1.11111).toFixed(4)}ᵍ</td><td>${Math.sin(rad).toFixed(4)}</td><td>${Math.cos(rad).toFixed(4)}</td><td>Undefined</td></tr>`
            } else{
                tbody.innerHTML += `<tr><td>${deg}°</td><td class="text-info fw-bold">${(deg*1.11111).toFixed(4)}ᵍ</td><td>${Math.sin(rad).toFixed(4)}</td><td>${Math.cos(rad).toFixed(4)}</td><td>${Math.tan(rad).toFixed(4)}</td></tr>`;
            }
        }
    });
    if(hasInput) document.getElementById('trigResult').style.display = 'block';
}
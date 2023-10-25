/* -----------------------------------
FASE DI PREPARAZIONE
----------------------------------- */

// Recuperare dalla pagina tutti gli elementi di interesse
const scoreCounter = document.querySelector('.score-counter');
const grid = document.querySelector('.grid');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainButton = document.querySelector('.play-again');

// Preparo delle informazioni utili alla logica di gioco
const totalCells = 100;
const totalBombs = 16;
const maxScore = totalCells - totalBombs;
const bombsList = [];
let score = 0;

// Generare TOT bombe casuali
while (bombsList.length < totalBombs) {
    const number = Math.floor(Math.random() * totalCells) + 1;
    if (!bombsList.includes(number)) {
        bombsList.push(number);
    }
    bombsList.sort();
}

/* -----------------------------------
GRIGLIA E LOGICA DI GIOCO
----------------------------------- */

let isCellEven = false;
let isRowEven = false;

for (let i = 1; i <= totalCells; i++) {
    // Creo un elemento e gli do la classe 'cell'
    const cell = document.createElement('div');
    cell.classList.add('cell');

    isCellEven = i % 2 === 0;

    if (isCellEven && isRowEven) cell.classList.add('cell-dark');
    else if (!isCellEven && !isRowEven) cell.classList.add('cell-dark');

    // Se sono alla fine della riga ...
    if (i % 10 === 0) isRowEven = !isRowEven;

    // Gestiamo il click della cella
    cell.addEventListener('click', function () {
        // Controllo che la cella non sia stata già clicata
        if (cell.classList.contains('cell-clicked')) return;

        if (bombsList.includes(i)) {
            cell.classList.add('cell-bomb');
            endGame(false);
        } else {
            cell.classList.add('cell-clicked')
            updateScore();
        }
    });

    // Lo inserisco nella griglia
    grid.appendChild(cell);
}

/* -----------------------------------
FUNZIONI
----------------------------------- */
// Aggiorniamo il punteggio
function updateScore() {
    // Aumento il valore di score
    score++;
    // Lo inserisco nel contatore
    scoreCounter.innerText = String(score).padStart(5, 0);

    if (score === maxScore) {
        endGame(true);
    }
}

function endGame(isVictory) {
    if (isVictory === true) {
        endGameScreen.classList.add('win');
        endGameText.innerText = 'YOU\nWON'
    } else {
        // Riveliamo tutte le bombe
        revealAllBombs();
    }
    endGameScreen.classList.remove('hidden')
}

// Funzione per ricaricare la pagina
function playAgain() {
    location.reload();
}

function revealAllBombs() {
    const cells = document.querySelectorAll('.cell');
    for (let i = 1; i <= cells.length; i++) {
        if (bombsList.includes(i)) {
            const cellToReveal = cells[i - 1];
            cellToReveal.classList.add('cell-bomb');
        }
    }
}

/* -------------------------------
EVENTI
----------------------------------- */

playAgainButton.addEventListener('click', playAgain);
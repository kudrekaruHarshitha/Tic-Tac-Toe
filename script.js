const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const messageDisplay = document.getElementById('message');
const restartButton = document.getElementById('restart');

let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = clickedCell.getAttribute('data-index');

    if (boardState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardState[a] === '' || boardState[b] === '' || boardState[c] === '') {
            continue;
        }
        if (boardState[a] === boardState[b] && boardState[b] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        messageDisplay.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!boardState.includes('')) {
        messageDisplay.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    messageDisplay.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

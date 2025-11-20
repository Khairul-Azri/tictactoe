const board = document.getElementById('board');
let currentPlayer = 'X';
const cells = Array(9).fill(null);

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            setTimeout(() => alert(`Player ${cells[a]} wins!`), 100);
            return true;
        }
    }
    return false;
}

function handleClick(index) {
    if (!cells[index]) {
        // Increment the metrics counter
        fetch('/metrics/counter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ player: currentPlayer })
        });

        cells[index] = currentPlayer;
        renderBoard();
        if (checkWinner()) return;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function renderBoard() {
    board.innerHTML = '';
    cells.forEach((cell, index) => {
        const div = document.createElement('div');
        div.className = 'cell';
        div.innerText = cell;
        div.onclick = () => handleClick(index);
        board.appendChild(div);
    });
}

// Initial Board Render
renderBoard();

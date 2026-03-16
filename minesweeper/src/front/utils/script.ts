import { startGame, revealCell, flagCell } from './server'
import { Game, Grid } from './types.interface';

let game: Game | null = null;
let flagMode = false;

const startGameButton = document.getElementById("start-game");
const table = document.getElementById("game-table");
const modeToggle = document.getElementById("mode-toggle");

modeToggle?.addEventListener("click", () => {
    flagMode = !flagMode;
    modeToggle.textContent = flagMode ? "Reveal Mode" : "Flag Mode";
});


startGameButton?.addEventListener('click', async () => {
    try {
        const difficulty = (document.getElementById("difficulty") as HTMLSelectElement).value;
        const response = await startGame(difficulty)
        if (!response.ok) throw new Error(`startGame failed: ${response.status} ${response.statusText}`)
        const data = await response.json() as Game

        if (data) {
            game = data.data;
            console.log("game -> ", game)
            document.getElementById('game-id')!.innerHTML = game!.id
            render(game!.grid)
        }

    } catch (error) {
        console.error('startGame failed:', error)
    }
})

async function handleReveal(r: number, c: number) {
    if (!game) return;
    try {
        const res = await revealCell(game.id, r, c);
        if (!res.ok) throw new Error(`revealCell failed: ${res.status}`);
        const data = await res.json();
        game = data.data.game;
        render(game!.grid);

        if (game!.state === "won") handleGameWon();
        if (game!.state === "lost") handleGameOver();

    } catch (error) {
        console.error(error);
    }
}

async function handleFlag(r: number, c: number) {
    if (!game) return;
    try {
        const res = await flagCell(game.id, r, c);
        if (!res.ok) throw new Error(`flagCell failed: ${res.status}`);
        const data = await res.json();
        game = data.data.game;
        render(game!.grid);
    } catch (error) {
        console.error(error);
    }
}

function handleGameWon() {
    // disable all clicks by removing event listeners
    alert("You won!")
    table!.querySelectorAll("td").forEach(td => {
        td.replaceWith(td.cloneNode(true));
    });
}

function handleGameOver() {
    // disable all clicks by removing event listeners
    alert("You lost!")
    table!.querySelectorAll("td").forEach(td => {
        td.replaceWith(td.cloneNode(true));
    });
}

function createImg(src: string): HTMLImageElement {
    const img = document.createElement("img");
    img.src = src;
    img.style.width = "48px";
    img.style.height = "48px";
    img.style.display = "block";
    img.style.objectFit = "fill";
    img.draggable = false;
    return img;
}

function render(board: Grid) {
    table!.innerHTML = "";

    board.forEach((row, r) => {
        const tr = document.createElement("tr");

        row.forEach((cell, c) => {
            const td = document.createElement("td");
            td.dataset.row = String(r);
            td.dataset.col = String(c);

            if (game?.state === "lost" && cell.isMine) {
                td.appendChild(createImg("assets/Mine.png"));
            } else if (!cell.isRevealed) {
                td.appendChild(createImg(cell.isFlagged ? "assets/Flag.png" : "assets/Closed.png"));
            } else if (cell.adjacentMines > 0) {
                td.appendChild(createImg(`assets/${cell.adjacentMines}.png`));
            } else {
                td.style.backgroundColor = "#979797ff";
            }

            td.addEventListener("click", () => {
                if (flagMode) {
                    handleFlag(r, c);
                } else {
                    handleReveal(r, c);
                }
            });

            td.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                handleFlag(r, c);
            });

            tr.appendChild(td);
        });

        table!.appendChild(tr);
    });
}
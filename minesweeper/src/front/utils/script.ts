import { startGame, revealCell, flagCell } from './server'
import { Game, Grid } from './types.interface';

let game: Game | null = null;

const startGameButton = document.getElementById("start-game");
const table = document.getElementById("game-table");

startGameButton?.addEventListener('click', async () => {
    try {
        const response = await startGame()
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
    // TODO: call your backend reveal endpoint
    console.log("Reveal", r, c);
    try {
        const res = await revealCell(game!.id, r, c);
        const data = await res.json() as Game;
        console.log("revealCell response ->", data); // 👈 check the shape
        game = data.data.game;
        render(game!.grid);

        if (game!.state === "won") {
            handleGameWon();
        }

         if (game!.state === "lost") {
            handleGameOver();
        }

    } catch (error) {
        console.log(error);
        throw error;
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


function render(board: Grid) {
    table!.innerHTML = "";

    board.forEach((row, r) => {
        const tr = document.createElement("tr");

        row.forEach((cell, c) => {
            const td = document.createElement("td");
            td.dataset.row = String(r);
            td.dataset.col = String(c);

            if (game?.state === "lost" && cell.isMine) {
                const img = document.createElement("img");
                img.src = "../assets/Mine.png";
                img.style.width = "32px";
                img.style.height = "32px";
                img.style.display = "block";
                img.style.objectFit = "fill"
                img.draggable = false;
                td.appendChild(img);
            } else if (!cell.isRevealed) {
                const img = document.createElement("img");
                img.src = cell.isFlagged ? "../assets/Flag.png" : "../assets/Closed.png";
                img.style.width = "32px";
                img.style.height = "32px";
                img.style.display = "block";
                img.style.objectFit = "fill"
                img.draggable = false;
                td.appendChild(img);
            } else if (cell.adjacentMines > 0) {
                const img = document.createElement("img");
                img.src = `../assets/${cell.adjacentMines}.png`;
                img.style.width = "32px";
                img.style.height = "32px";
                img.style.display = "block";
                img.draggable = false;
                td.appendChild(img);
            } else {
                td.style.backgroundColor = "#979797ff";
                td.style.width = "32px";
                td.style.height = "32px";
            }

            td.addEventListener("click", () => handleReveal(r, c));
            td.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                handleFlag(r, c);
            });

            tr.appendChild(td);
        });

        table!.appendChild(tr);
    });
}
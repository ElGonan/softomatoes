
import { Difficulty, Game, Grid, RevealResult } from "../types.interface";
import { createGrid } from "./grid";


const mineSet = (difficulty: Difficulty): number => {
    /**
     * Set the number of mines depending on the difficulty
     * 
     * easy -> 5 mines
     * medium -> 15 mines
     * hard -> 30 mines
     * default -> 15 mines
     */

    switch (difficulty) {
        case "easy":
            return 5;
        case "medium":
            return 15;
        case "hard":
            return 30;
        default:
            return 15;
    };
};

const placeMines = (grid: ReturnType<typeof createGrid>, difficulty: Difficulty): void => {
    /*
    * Place mines randomly on the grid
   */

    const minesToPlace = mineSet(difficulty);
    const size = grid.length;
    let minesPlaced = 0;

    while (minesPlaced < minesToPlace) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);

        if (!grid[row][col].isMine) {
            grid[row][col].isMine = true;
            minesPlaced++;
        }
    }

    // Set the minecounter in each non-mine cell by scanning its 8 neighbors
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (grid[i][j].isMine) {
                continue;
            }

            let count = 0;

            // Walk the 3x3 neighborhood around the current cell
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    if (dx === 0 && dy === 0) {
                        continue;
                    }

                    const x = i + dx;
                    const y = j + dy;

                    // Only count neighbors that are inside the grid
                    if (x >= 0 && x < size && y >= 0 && y < size) {
                        if (grid[x][y].isMine) {
                            count++;
                        }
                    }
                }
            }

            // Store the number of adjacent mines for this cell
            grid[i][j].adjacentMines = count;
        }
    }

    // now we have a complete grid. So we just return
    return;
};


const checkEmptyness = (grid: Grid, row: number, col: number): RevealResult => {
    // Reveal a contiguous empty area (0 adjacent mines) plus its border numbers.
    const size = grid.length;

    if (row < 0 || row >= size || col < 0 || col >= size) {
        return "ignored";
    }

    const start = grid[row][col];
    if (start.isRevealed || start.isFlagged) {
        return "ignored";
    }

    const stack: Array<[number, number]> = [[row, col]];

    while (stack.length > 0) {
        const [r, c] = stack.pop() as [number, number];
        const cell = grid[r][c];

        if (cell.isRevealed || cell.isFlagged) {
            continue;
        }

        cell.isRevealed = true;

        // Only expand when this cell has no adjacent mines.
        if (cell.adjacentMines !== 0) {
            continue;
        }

        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) {
                    continue;
                }

                const nr = r + dr;
                const nc = c + dc;

                if (nr < 0 || nr >= size || nc < 0 || nc >= size) {
                    continue;
                }

                const neighbor = grid[nr][nc];
                if (!neighbor.isRevealed && !neighbor.isFlagged && !neighbor.isMine) {
                    stack.push([nr, nc]);
                }
            }
        }
    }

    return "revealed"
};

const revealCell = (grid: Grid, row: number, col: number): RevealResult => {
    /**
     * Core game function. Check the cell. if its a bomb, you lose
     *  */

    // check if cell is a bomb
    const size = grid.length;
    if (row < 0 || row >= size || col < 0 || col >= size) return "ignored";

    const cell = grid[row][col];

    if (cell.isRevealed || cell.isFlagged) return "ignored";

    if (cell.isMine) return "hit-mine";

    if (cell.adjacentMines === 0) {
        checkEmptyness(grid, row, col);
    } else {
        cell.isRevealed = true;
    }

    return "revealed";
    };


const isGridEmpty = (game: Game): boolean => {
    /**
     * Check if the grid is empty (all non-mine cells revealed), if it is, means the user won
     */

    // check the grid
    const grid = game.grid;

    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            const cell = grid[r][c];
            if (!cell.isMine && !cell.isRevealed) return false;
        }
    }
    
    return true;
}


export { placeMines, mineSet, revealCell, checkEmptyness, isGridEmpty }
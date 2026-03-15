/**
* definition of the grid
 */

import { Cell, Difficulty } from "../types.interface";

const gridSize = (difficulty: Difficulty): number => {
    /**
     * Set the grid size depending on the difficulty
     * 
 * easy -> 5x5
 * medium -> 10x10
 * hard -> 15x15
*/

switch (difficulty) {
    case "easy":
        return 5;

    case "medium": 
        return 10;

    case "hard":
        return 15;
    
    default:
        // Since we need a default value...
        return 10;
    };
};



const createGrid = (difficulty: Difficulty): Cell[][] => {
    /**
     * Create the grid for the game, by now, empty.
     */
    const size = gridSize(difficulty); 
    
    const grid: Cell[][] = [];


    for (let i = 0; i < size; i++) {
        const row: Cell[] = [];
        for (let j = 0; j < size; j++) {
            row.push({
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                adjacentMines: 0,
            });
        }
        grid.push(row);
    }

    return grid;
};


export { createGrid, gridSize };
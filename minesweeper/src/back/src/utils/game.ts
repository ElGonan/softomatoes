/**
 * Game file
 */

import { Cell, Grid, Difficulty, RevealResult } from "../types.interface";
import { createGrid } from "./grid";
import { placeMines } from "./mines";

const createGame = (dif: Difficulty): Grid => {
    // get the first grid

    let Grid: Grid = createGrid(dif);
    
    // We set the mines
    placeMines(Grid, dif);

    return Grid;
};



export { createGame };
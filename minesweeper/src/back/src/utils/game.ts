/**
 * Game file
 */

import { Grid, Difficulty, Game, State } from "../types.interface";
import { generateRandomId } from "../utils/general"
import { createGrid } from "./grid";
import { placeMines, revealCell, isGridEmpty } from "./mines";

const createGame = (dif: Difficulty): Game => {
    // get the first grid

    const grid: Grid = createGrid(dif);
    
    // We set the mines
    placeMines(grid, dif);

    // we create the game layout
    const game: Game = {
        difficulty: dif,
        state: "running",
        id: generateRandomId(10),
        grid: grid
    }

    return game
};


export const revealInGame = (
    game: Game,
    row: number,
    col: number,
): [Game, State] => {
    /**
     * Each time a user clicks a cell, it sends the call here. Specifies the clicked cell and the specific game board
     *  */

    // check if the user is sending an already complete gird
    if (game.state !== "running") return [game, game.state];

    const checkCell = revealCell(game.grid, row, col);
    
    if (checkCell === "ignored") return [game, game.state];

    // if the user hit a mine, then he lost
    if (checkCell === "hit-mine") {
        game.state = "lost";
        return [game, game.state];
    }

    // check if the grid is empty to set the win condition
    const hasUserWon = isGridEmpty(game);

    if (hasUserWon === true) {
        game.state = "won"
        return [game, game.state];
    } 

    // otherwise, the game is still runing  
    return [game, game.state];

}






export { createGame };
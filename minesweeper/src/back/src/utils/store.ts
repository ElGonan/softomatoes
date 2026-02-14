/**
 * Save the actual state of the game. 
 */

import { Game, Difficulty, State } from "../types.interface";
import { createGame, revealInGame, setFlag } from "./game";

const games = new Map<string, Game>();

const startNewGame = (difficulty: Difficulty): Game => {
    const game = createGame(difficulty);
    games.set(game.id, game);
    console.log("[StartNewGame] - game id -> ", game.id);
    return getPublicGame(game);
};

const getGame = (gameId: string) => {
    const game = games.get(gameId);
    if (!game) return null;
    return getPublicGame(game);
};

const revealInCurrentGame = (gameId: string, row: number, col: number) => {
    const game = games.get(gameId);
    console.log("[RevealCurrentGame] - List of games -> ", games);
    
    if (!game) {
        throw new Error("Game not found");
    }
    const [updatedGame, state] = revealInGame(game, row, col);
    return {
        game: getPublicGame(updatedGame),
        state
    };
};


const flagCell = (gameId: string, row: number, col: number) => {
    const game = games.get(gameId);
    if (!game) {
        throw new Error("Game not found");
    }

    return {
        game: getPublicGame(setFlag(game, row, col)),
        state: game.state
    }

}


const deleteGame = (gameId: string): void => {
    games.delete(gameId);
};

const clearAllGames = (): void => {
    games.clear();
};

const getPublicGame = (game: Game) => {
    const isGameOver = game.state === "lost";
    
    const publicGrid = game.grid.map(row => 
        row.map(cell => ({
            isRevealed: cell.isRevealed,
            isFlagged: cell.isFlagged,
            adjacentMines: cell.adjacentMines,
            // Only show isMine if cell is revealed OR game is lost
            isMine: (cell.isRevealed || isGameOver) ? cell.isMine : false
        }))
    );

    return {
        id: game.id,
        difficulty: game.difficulty,
        state: game.state,
        grid: publicGrid
    };
};

export { startNewGame, getGame, revealInCurrentGame, deleteGame, clearAllGames, getPublicGame, flagCell };
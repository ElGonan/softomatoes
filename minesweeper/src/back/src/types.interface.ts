export type Cell = {
    isMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    adjacentMines: number;
}

export type PublicCell = {
    isRevealed: boolean;
    isFlagged: boolean;
    adjacentMines: number;
    isMine?: boolean; // only present if revealed and is a mine (or game lost)
}

export type Grid = Cell[][];

export type Difficulty = "easy" | "medium" | "hard";

export type RevealResult = "hit-mine" | "revealed" | "ignored"

export type State = "won" | "lost" | "running"

export type Game = {
    difficulty: Difficulty;
    state: State;
    grid: Grid;
    id: string;
}
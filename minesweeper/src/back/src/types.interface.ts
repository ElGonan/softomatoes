export type Cell = {
    isMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    adjacentMines: number;
}

export type Grid = Cell[][];

export type Difficulty = "easy" | "medium" | "hard";


export const baseURL = "https://softomatoes-minesweeper-back.onrender.com"

export async function startGame() {
    /**
     * Start a new game via calling the correct endpoint
     */

    try {
        const res = await fetch(baseURL + '/game/start', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        });
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function revealCell(gameid: string, row: number, col: number) {
    /**
     * Reveal a cell
     */

    try {
        const res = await fetch(baseURL + '/game/reveal', {
            method: 'POST',
            body:JSON.stringify({
                "gameId": gameid,
                "row": row,
                "col": col
            }),
            headers: {'Content-Type': 'application/json'}
        });
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}




export async function flagCell(gameid: string, row: number, col: number) {
    /**
     * Reveal a cell
     */

    try {
        const res = await fetch(baseURL + '/game/flag', {
            method: 'POST',
            body:JSON.stringify({
                "gameId": gameid,
                "row": row,
                "col": col
            }),
            headers: {'Content-Type': 'application/json'}
        });
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
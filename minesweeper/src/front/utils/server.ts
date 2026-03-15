
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
        console.log(await res.json());
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const generateRandomId = (len: number) => {
    /**
     * Generate a random id for the game
     */

    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLenght = characters.length;

    for (let i = 0; i < len; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLenght));
    }

    return result;
}

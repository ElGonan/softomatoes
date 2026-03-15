import { startGame } from './server'


const startGameButton = document.getElementById("start-game");

// Call the function (was missing parentheses) and handle errors
startGameButton?.addEventListener('click', async () => {
    try {
        await startGame()
    } catch (error) {
        console.error('startGame failed:', error)
    }
})
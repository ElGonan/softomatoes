/**
 * Router for the app
 */

import express from "express"
import { Difficulty } from "../types.interface"
import { createGame } from "../utils/game"
import { revealCell } from "../utils/mines"

const routes = express.Router()

routes.get(`/start:difficulty`, (req: any, res: any) => {
    
    const difficulty = req.params;

    res.send(createGame(difficulty))
})



routes.post(`/sendSelection`, (req: any, res: any) => {

    res.send(revealCell(req.params.grid, req.params.row, req.params.col))
})

export { routes }
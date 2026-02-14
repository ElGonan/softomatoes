/**
 * Router for the app
 */

import express from "express"
import { Request, Response } from "express";
import { getGame, startNewGame, revealInCurrentGame, deleteGame } from "../utils/store"

const routes = express.Router()

routes.post(`/start`, (req: Request, res: Response) => {
    
    const difficulty = req.body.difficulty;

    res.send(startNewGame(difficulty));
})


routes.post(`/reveal`, (req: Request, res: Response) => {

    res.send(revealInCurrentGame(
        req.body.gameId,
        req.body.row,
        req.body.col
    ));
})


routes.post(`/delete`, (req: Request, res: Response) => {

    deleteGame(req.body.gameId)
    
    res.send({"message": "game deleted"})
})

export { routes }
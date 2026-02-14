/**
 * Router for the app
 */

import express from "express"
import { Request, Response } from "express";
import { getGame, startNewGame, revealInCurrentGame, deleteGame, flagCell } from "../utils/store"

const routes = express.Router()

routes.post(`/start`, (req: Request, res: Response) => {
    
    try {
        const difficulty = req.body.difficulty;
        const game = startNewGame(difficulty);
        res.status(200).json({ ok: true, data: game });
    } catch (err: any) {
        res.status(500).json({ ok: false, error: err?.message ?? "Failed to start game" });
    }
})


routes.post(`/reveal`, (req: Request, res: Response) => {

    try {
        const game = revealInCurrentGame(
            req.body.gameId,
            req.body.row,
            req.body.col
        );
        res.status(200).json({ ok: true, data: game });
    } catch (err: any) {
        res.status(404).json({ ok: false, error: err?.message ?? "Game not found" });
    }
})


routes.post(`/flag`, (req: Request, res: Response) => {
    try {
        const game = flagCell(
            req.body.gameId,
            req.body.row,
            req.body.col
        );
        res.status(200).json({ ok: true, data: game });
    } catch (err: any) {
        res.status(404).json({ ok: false, error: err?.message ?? "Game not found" });
    }
})


routes.post(`/delete`, (req: Request, res: Response) => {
    try {
        deleteGame(req.body.gameId)
        
        res.status(200).json({ ok: true, data: { message: "game deleted" } });
    } catch (err: any) {
        res.status(500).json({ ok: false, error: err?.message ?? "Failed to delete game" });
    }
})

export { routes }
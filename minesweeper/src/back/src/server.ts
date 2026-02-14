/**
 * Main server config
 */
import express, { Request, Response } from "express";
import { routes } from "./router/routes";

const app = express();
const port: number = 3000;

app.use(express.json());

app.use("/game", routes)

app.get('/', (req: any, res: any) => {
    res.send('Here the minesweeper!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
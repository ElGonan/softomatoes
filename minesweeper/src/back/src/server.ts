/**
 * Main server config
 */
import express, { Request, Response } from "express";
import { routes } from "./router/routes";

const app = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/game", routes)

app.get('/', (req: any, res: any) => {
    res.send('Minesweeper here adn running!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
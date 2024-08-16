import express, {Request, Response} from "express";

import logger from "morgan";
import path from "path";
import {fileURLToPath} from "url";
import cors from "cors";
import PlayerRouter from "./routes/PlayerRouter.js";
import MonsterRouter from "./routes/MonsterRouter.js";




const app: express.Application = express();
const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);

//Middleware
app.use(cors({"exposedHeaders": 'Location'}));
app.use(express.json()); //for parsing json data
app.get("/", (req:Request, res: Response) => {
    res.sendFile('./html/index.html', {root: __dirname})
})
app.use(express.static('public')); //for serving static data such as html, css,...
app.use("/api/players", PlayerRouter);
app.use("/api/monsters", MonsterRouter);
app.use(logger("dev"));
// Error handling - from express doc
app.use((req: Request, res: Response) =>{
    res.status(404).send("Error while setting up the router. Resource not found for:"+req.url);
});

export default app;
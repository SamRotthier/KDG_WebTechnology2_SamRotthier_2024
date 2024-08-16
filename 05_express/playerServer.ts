import express, {Request, Response, NextFunction} from "express";
import {Entities} from "./model/Types";
import logger from "morgan";
import playerRouter from "./routes/PlayerRouter";
import monsterRouter from "./routes/MonsterRouter";
import {readEntities} from "./repository/store";


const port: number = 3000;
const app: express.Application = express();

readEntities(init);

//http://localhost:3000/
function init(entities: Entities): void{
    app.use(logger("Dev")); //Morgan logger
    app.use(express.json());

    app.use(((req:Request, res:Response, next:NextFunction) => {
        req.body = {...entities,...req.body}
        next();
    }));

    app.use("/api/players", playerRouter);
    app.use("/api/monsters", monsterRouter);

    app.use((req: Request, res: Response, next: NextFunction) =>{
        res.status(404).send("Error setting up router, a resource is not found. Port:"+port+req.url);
    });

    //Launch server
    app.listen(port);
}
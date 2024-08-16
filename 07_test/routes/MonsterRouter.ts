import express, {Request, Response} from "express";
import {Monster, MonsterSummary} from "../model/Monster.js";
import {findMonsterByMonsterId, getMonstersFromPlayer, getMonsterSummary} from "../repository/monsterRepository.js";
import {Player, PlayerSummary} from "../model/Player.js";
import {findPlayerById, getPlayerSummary} from "../repository/playerRepository.js";


const monsterRouter = express.Router();
//http://localhost:3000/api/monsters

//http://localhost:3000/api/players/1/monsters
monsterRouter.get("/", (req: Request, res: Response) => {
    let monsters: Monster[] = req.body.monsters;

    if(req.originalUrl.includes('players/')){
        const playerId: number = parseInt(req.originalUrl.split("/")[3]);
        monsters = getMonstersFromPlayer(monsters, playerId)??[];
        if(monsters.length === 0){
            res.status(404).send(`No monsters were found`);
        }
    }

    let monstersSummary: MonsterSummary[] = [];
    monsters.forEach(player => {
        let monster = getMonsterSummary(player);
        monstersSummary.push(monster);
    })

    if(monstersSummary){
        res.status(200).send(monstersSummary);
    } else{
        res.status(404).send("Path not correct")
    }
})

//http://localhost:3000/api/monsters/1
monsterRouter.get("/:id", (req: Request, res: Response) => {
    const monsterId: number = parseInt(req.params.id);
    let monsters: Monster[] = req.body.monsters;
    //console.log(monsterId)
    //console.log(monsters)

    let monster = findMonsterByMonsterId(monsters,monsterId);
    if(monster.length < 0){
        res.status(404).send(`No monsters were found`);
    }
    //console.log(monster)

    //adding player summary
    let playersList: Player[] = req.body.players;
    //console.log(monster[0].PlayerId)
    let playerId: number = monster[0].PlayerId!
    let player: Player = findPlayerById(playersList, playerId)!;
    if(!player){
        res.status(404).send(`No players were found`);
    }
    let playerSummary: PlayerSummary = getPlayerSummary(player);

    //deleting the Id and adding player summary
    delete monster[0].PlayerId;
    monster[0].Player = playerSummary;

    res.status(200).send(monster);
})

export default monsterRouter;
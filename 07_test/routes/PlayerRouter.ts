import express, {Request, Response} from "express";
import {Player, PlayerSummary} from "../model/Player.js";
import {addPlayer, changePlayer, findPlayerById, getPlayerSummary} from "../repository/playerRepository.js";
import monsterRouter from "./MonsterRouter.js";



//http://localhost:3000/api/players
const playerRouter = express.Router();

//http://localhost:3000/api/players/playername
playerRouter.get("/playername", (req:Request, res:Response) => {
    let playersResult: any[] = [];
    let players: Player[] = req.body.players;

    players.forEach(player => {
        let playerSummary: PlayerSummary = getPlayerSummary(player);
        playersResult.push(playerSummary); // Push is add to array
    });

    if(playersResult.length > 0){
        res.status(200).send(playersResult);
    } else{
        res.status(404).send("No players were found.")
    }
})

/* Ik week hier een beetje van de opdracht af.
In de opdracht vragen ze via "http://localhost:3000/api/hoofdentiteiten?zoek=”term”" te kunnen zoeken.
Door de vorige get api nam node server altijd de bovenste en ging hij het zoeken dus overslaan.
Ik kon dit oplossen door deze 2 samen in een if vraag te steken en hierop vergelijkingen te doen.
Ik heb gekozen om ze toch op te splitsen en een extra api path te maken voor meer duidelijkheid.
 */
//http://localhost:3000/api/players/search?search=DragonSlayer
playerRouter.get("/search", (req:Request, res:Response) =>{
    let players : Player[] = req.body.players;
    let playersResult: any[] = [];
    let playersSummary : PlayerSummary[] = [];

    const searchTerm = req.query.search?.toString().toLowerCase();
    //console.log(searchTerm)

    players.forEach(player => {
        playersResult.push(getPlayerSummary(player));
    });

    if (searchTerm) {
        playersSummary = playersResult.filter(player => player.playerName?.toLowerCase().includes(searchTerm));
    }

    if(playersSummary.length > 0){
        res.status(200).send(playersSummary);
    } else{
        res.status(404).send("No player found");
    }
})

//http://localhost:3000/api/players/1
playerRouter.get("/:id", (req: Request, res: Response) => {
    let playersList: Player[] = req.body.players;

    let player = findPlayerById(playersList, +req.params.id);

    if(player != null){
        res.status(200).send(player);
    } else{
        res.status(404).send("No monster found")
    }
});

// In Postman - delete
//http://localhost:3000/api/players/1
playerRouter.delete("/:id", (req:Request, res:Response) => {
    let playersList: Player[] = req.body.players;
    let idDelete: number = +req.params.id;
    let index = playersList.findIndex(player => player.PlayerId === idDelete);

    if(index >= 0){
        playersList.splice(index, 1);
        res.sendStatus(204);
    } else{
        res.status(404).send("could not delete this id");
    }
})

// In Postman - post
/* Body (raw - Json:
{
    "PlayerId": 1,
    "PlayerName": "test",
    "StartDate": "12/08/2023",
    "Playergender": "Male",
    "DefeatedBosses": 10,
    "InhabitantOfRealm": "Yellow",
    "PlayTimeInHours": 20,
    "ProfilePicture": "string",
    "Monsters":{
                }
}
*/
//http://localhost:3000/api/players
playerRouter.post("/", (req: Request, res: Response) => {
    let playersList: Player[] = req.body.players;
    let PlayerId: number = Math.max(...playersList.map(a => a.PlayerId)) + 1;

    const newPlayer: Player = addPlayer(PlayerId, req.body.PlayerName, req.body.StartDate, req.body.Playergender, req.body.DefeatedBosses, req.body.InhabitantOfRealm, req.body.PlayTimeInHours, req.body.ProfilePicture, playersList)

    if(newPlayer){
        res.status(201).location(`/api/monsters/${newPlayer.PlayerId}`).send(newPlayer);
    } else{
        res.sendStatus(400);
    }

})

// In Postman - put
/* Body (raw - Json:
{
    "PlayerName": "test",
    "StartDate": "12/08/2023",
    "Playergender": "Male",
    "DefeatedBosses": 10,
    "InhabitantOfRealm": "Yellow",
    "PlayTimeInHours": 20,
    "ProfilePicture": "string",
    "Monsters":{
                }
}
*/
//http://localhost:3000/api/players/1
playerRouter.put("/:id", (req: Request, res: Response) => {
    let playersList: Player[] = req.body.players;
    const PlayerId: number = Number(req.params.PlayerId);
    const index = req.body.players.findIndex((player: Player) => player.PlayerId === PlayerId)

    if(index < 0){
        const newPlayer: Player = addPlayer(PlayerId, req.body.PlayerName, req.body.StartDate, req.body.Playergender, req.body.DefeatedBosses, req.body.InhabitantOfRealm, req.body.PlayTimeInHours, req.body.ProfilePicture, playersList)
        res.status(201).location(`/api/monsters/${newPlayer.PlayerId}`).send(newPlayer);
    } else if(!req.body){
        res.sendStatus(400);
    } else{
        changePlayer(PlayerId, req.body.PlayerName, req.body.StartDate, req.body.Playergender, req.body.DefeatedBosses, req.body.InhabitantOfRealm, req.body.PlayTimeInHours, req.body.ProfilePicture, playersList, index)
        res.sendStatus(204);}
})

playerRouter.use("/:id/monsters", monsterRouter);

export default playerRouter
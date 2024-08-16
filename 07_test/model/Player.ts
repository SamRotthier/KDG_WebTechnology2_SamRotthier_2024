import {Monster} from "./Monster.js";
import Resources from "./Resources.js";


interface Player {
    PlayerId: number,
    PlayerName: string,
    StartDate: string,
    Playergender: string,
    DefeatedBosses: number,
    InhabitantOfRealm: string,
    PlayTimeInHours: number,
    ProfilePicture: string,
    Monsters?:Monster[]
}

interface PlayerSummary extends Resources{
    playerId: number,
    playerName: string,
    timePlayed: number
}

export {Player, PlayerSummary};
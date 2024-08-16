import {readEntities} from "./store.js";
import {Player, PlayerSummary} from "../model/Player.js";
import {addSelf} from "../util/hal.js";


const entities = await readEntities();
const players = entities.players;

function allPlayerSummary(): PlayerSummary[]{
    let playersSummary: PlayerSummary[] = [];
    players.forEach((player: Player) => {playersSummary.push(getPlayerSummary(player))})
    return playersSummary;
}

function getPlayerSummary(player: Player): PlayerSummary{
    return {
        playerId: player.PlayerId,
        playerName: player.PlayerName,
        timePlayed: player.PlayTimeInHours,
        ...addSelf(`/players/${player.PlayerId}`)
    };
}

function findPlayerById(players: Player[], playerId: number): Player|null {
    return players.find((player: Player) => player.PlayerId === playerId) || null;
}

function addPlayer(PlayerId: number, PlayerName: string, StartDate: string, Playergender: string, DefeatedBosses: number, InhabitantOfRealm: string, PlayTimeInHours: number, ProfilePicture: string, playersList: Player[]) :Player {
    let player = {
        PlayerId: PlayerId,
        PlayerName: PlayerName,
        StartDate: StartDate ?? "not applicable",
        Playergender: Playergender ?? "not applicable",
        DefeatedBosses: DefeatedBosses ?? "not applicable",
        InhabitantOfRealm: InhabitantOfRealm ?? "not applicable",
        PlayTimeInHours: PlayTimeInHours ?? "not applicable",
        ProfilePicture: ProfilePicture ?? "not applicable",
    }
    addSelf(`http://localhost:3000/api/players/${player.PlayerId}`)
    playersList.push(player)
    return player
}

function changePlayer(PlayerId: number, PlayerName: string, StartDate: string, Playergender: string, DefeatedBosses: number, InhabitantOfRealm: string, PlayTimeInHours: number, ProfilePicture: string, playersList: Player[], index: number){
    let player = findPlayerById(playersList, PlayerId);
    if(player){
        player.PlayerName = PlayerName ?? player.PlayerName;
        player.StartDate = StartDate ?? player.StartDate ;
        player.Playergender = Playergender ?? player.Playergender;
        player.DefeatedBosses = DefeatedBosses ?? player.DefeatedBosses;
        player.InhabitantOfRealm = InhabitantOfRealm ?? player.InhabitantOfRealm;
        player.PlayTimeInHours = PlayTimeInHours ?? player.PlayTimeInHours;
        player.ProfilePicture = ProfilePicture ?? player.ProfilePicture;
        playersList[index] = player;
    }
}

function newId(){
    return Math.max(...players.map((a: any) => a.userid)) + 1;
}

function searchIndex(idDelete: number){
    return players.findIndex((player: Player) => player.PlayerId === idDelete);
}

function removePlayer(index: number){
    return players.splice(index, 1);
}

export {findPlayerById, getPlayerSummary,addPlayer,changePlayer, allPlayerSummary, newId, searchIndex, removePlayer};
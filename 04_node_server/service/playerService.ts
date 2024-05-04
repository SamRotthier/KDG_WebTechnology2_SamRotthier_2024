import {Player, Monster, Entities} from "../model/Types";
import {findPlayerById} from "../repository/playerRepository";
import {findMonsterBy} from "../repository/monsterRepository";



function getPlayerAndMonster(entities: Entities, PlayerId: number){
    const player: Player|null = findPlayerById(entities.players, PlayerId);
    if(player != null){
    player.Monsters = findMonsterBy(entities.monsters, (monster: Monster) => monster.PlayerId === PlayerId);
    }
    return player;
}

export {getPlayerAndMonster};
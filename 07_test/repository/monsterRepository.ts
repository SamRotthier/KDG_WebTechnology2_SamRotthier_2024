import {Monster} from "../model/Types.js";
import {MonsterSummary} from "../model/Monster.js";
import {addSelf} from "../util/hal.js";
import {readEntities} from "./store.js";


const entities = await readEntities();
const monsters = entities.monsters;

function findMonsterBy(monsters: Monster[], monsterTest: (monster: Monster) => boolean): Monster[] {
    return monsters.filter((monster: Monster) => monsterTest(monster));
    //gives back a filtered list of monsters where they "loop" over the list and checks if the test is true
}

function findMonsterByMonsterId(monsters: Monster[], monsterId: number): Monster[]{
    //console.log(monsters.filter((monster: Monster) => monster.MonsterId === monsterId))
    return monsters.filter((monster: Monster) => monster.MonsterId === monsterId);
}

function getMonstersFromPlayer(monsters: Monster[], playerId: number): Monster[]|undefined{
    if(monsters){
        return monsters.filter(monster => monster.PlayerId === playerId);
    }
}

function getMonsterSummary(monster: Monster): MonsterSummary{
    return {
        MonsterId: monster.MonsterId,
        MonsterName: monster.MonsterName,
        GuidEntry: monster.GuidEntry,
        ...addSelf(`/monsters/${monster.MonsterId}`)
    };
}

function allMonstersSummary(monstersFromPlayer?: Monster[]): MonsterSummary[]{
    let tracksSummary: MonsterSummary[] = [];
    if(monstersFromPlayer){
        monstersFromPlayer.forEach((track: Monster) => {tracksSummary.push(getMonsterSummary(track))})
    } else{
        monsters.forEach((monster: Monster) => {tracksSummary.push(getMonsterSummary(monster))})
    }
    return tracksSummary;
}


export {findMonsterBy,getMonsterSummary,getMonstersFromPlayer,findMonsterByMonsterId,allMonstersSummary};


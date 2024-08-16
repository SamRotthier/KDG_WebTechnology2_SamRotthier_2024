import {Monster} from "../model/Types";
import {MonsterSummary} from "../model/Monster";
import {addSelf} from "../util/hal";


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


export {findMonsterBy,getMonsterSummary,getMonstersFromPlayer,findMonsterByMonsterId};


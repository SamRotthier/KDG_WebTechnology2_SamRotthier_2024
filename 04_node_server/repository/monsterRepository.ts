import {Monster} from "../model/Types";


function findMonsterBy(monsters: Monster[], monsterTest: (monster: Monster) => boolean): Monster[] {
    return monsters.filter((monster: Monster) => monsterTest(monster));
    //gives back a filtered list of monsters where they "loop" over the list and checks if the test is true
}

export {findMonsterBy};

/*
//Tests
let monsters: Monster[] = [
    {
        "Monsterid": 1,
        "MonsterName": "Blob",
        "MonsterNickname": "Bob",
        "Element": "Neutral",
        "GuidEntry": 5,
        "CanEvolve": false,
        "PlayerId": 1
    },
    {
        "Monsterid": 2,
        "MonsterName": "Fire Snake",
        "MonsterNickname": "Drake",
        "Element": "Fire",
        "GuidEntry": 20,
        "CanEvolve": false,
        "PlayerId": 1
    },
    {
        "Monsterid": 3,
        "MonsterName": "Stone Giant",
        "MonsterNickname": "Stone Giant",
        "Element": "Stone",
        "GuidEntry": 50,
        "CanEvolve": false,
        "PlayerId": 2
    },
    {
        "Monsterid": 4,
        "MonsterName": "Ghost Whale",
        "MonsterNickname": "Whalord",
        "Element": "Water",
        "GuidEntry": 15,
        "CanEvolve": false,
        "PlayerId": 5
    }
    ]

console.log(findMonsterBy(monsters,(monster: Monster) => monster.Element === "Water"));
*/
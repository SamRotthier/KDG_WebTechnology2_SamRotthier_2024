import * as fs from "fs";

interface Player {
    PlayerId: number,
    PlayerName: string,
    InhabitantOfRealm: string,
    Playergender: string,
    StartDate: string,
    PlayTimeInHours: number,
    DefeatedBosses: number,
    ProfilePicture: string
}

interface Monster {
    Monsterid: number,
    MonsterName: string,
    MonsterNickname: string,
    Element: string,
    GuidEntry: number,
    CanEvolve: boolean,
    PlayerId: number
}

type Entities = {
    players: Player[],
    monsters: Monster[]
}

// Variables
let dbPath = "../db.json" // go 1 niveau back
let entities: Entities

function main(): void {
    fs.readFile(dbPath, 'utf8', (error, JsonData) => {
        if (error) {
            console.log(`Error was thrown while reading the file: ${dbPath}`);
        }
        entities = JSON.parse(JsonData); //Change Json to Object
        console.log(entities.players[0])
        console.log(entities.monsters[0])
    });
}

main();

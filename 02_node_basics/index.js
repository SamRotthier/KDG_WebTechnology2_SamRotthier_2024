//Imports
import * as fs from "fs"; // imports a standard node.js library for the file system
import {writeMonsters} from "./MonstersByPlayer.js";

// Variables
let dbPath = "../db.json"
let players;
let monsters;
let entities;

function main() {
    fs.readFile(dbPath, (error, JsonData) => {
        if (error) {
            console.log(`Error was thrown while reading the dataset: ${dbPath}`);
        }
        entities = JSON.parse(JsonData); //Change Json to Object
        players = entities.players;
        monsters = entities.monsters;
        writePlayers();
    })
}

// writeHoofden
function writePlayers() {
    fs.mkdtemp('monsters', (error, tempdir) => { //mkdtemp is make temporary directory
        if (error) {
            console.log(`Error was thrown while making a temporary directory: ${error}`)
        } else {
            process.chdir(tempdir); //change directory
            players.forEach(player => writeMonsters(player, monsters))
        }
    })
}

main();
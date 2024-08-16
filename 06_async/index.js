import {writeMonsters} from "./MonstersByPlayer.js";
import * as fs from "fs/promises";

let dbPath = "../db.json"
let players;
let monsters;
let entities;

function main() {
    fs.readFile(dbPath)
        .then(JsonData => {
            entities = JSON.parse(JsonData);
            players = entities.players;
            monsters = entities.monsters;
        }).then(writePlayers)//.then(writePlayersAsync)
}

function writePlayers() {
    loggingTimeStamps(`started writePlayers`);
    fs.mkdtemp('monsters').then(temp => {
        loggingTimeStamps(`${temp} created`);
        return temp;
    }).then(temp => {
        let Promises = []
        process.chdir(temp)
        players.forEach(player => {
            let result = writeMonsters(player, monsters)
            if (result) {
                let promise = result.then(() => {
                    loggingTimeStamps(`created: ${player.PlayerName}`);
                    return player.PlayerName;
                });
                Promises.push(promise)
            }
        });
        return Promise.all(Promises)
    }).then((data) => {
        loggingTimeStamps("Done writingPlayers");
        console.log(`Results: ${data.join(', ')}`)
    })
        .catch((error => console.log(`An error occurred for: ${dbPath}`)));
}

async function writePlayersAsync() {
    try {
        loggingTimeStamps(`started writePlayersAsync`);
        let temp = await fs.mkdtemp('monsters');
        process.chdir(temp);
        await players.forEach(player => writeMonsters(player, monsters, temp))
        loggingTimeStamps(`Done writePlayersAsync`)
    } catch (err) {
        console.log(`An error occurred for: ${dbPath}`);
    }
}

function loggingTimeStamps(status) {
    let currentTime = new Date();
    console.log(`${status}@${currentTime.getSeconds()}:${currentTime.getMilliseconds()}`)
}

main();
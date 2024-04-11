//Imports
import * as fs from "fs";
import * as path from "path";

// writeSubs
function writeMonsters(player, monsters) {
    let filteredMonsters = monsters.filter(monster => monster.PlayerId === player.PlayerId);
    if (filteredMonsters.length > 0) {
        let filteredMonstersString = JSON.stringify(filteredMonsters); // Change object to Json
        fs.writeFile(path.join(process.cwd(), player.PlayerName + ".json"), filteredMonstersString, err => { // cwd retuns the local direcority
            if (err) {
                console.log(`Error was thrown while writing the files: ${err} `)
            }
        });
    }
}

export {writeMonsters};

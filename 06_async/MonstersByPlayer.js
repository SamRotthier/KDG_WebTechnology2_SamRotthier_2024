import * as path from "path";
import * as fs from "fs/promises";

function writeMonsters(player, monsters) {
    let filteredMonsters = monsters.filter(monster => monster.PlayerId === player.PlayerId);
    if (filteredMonsters.length > 0) {
        return fs.writeFile(path.join(process.cwd(), player.PlayerName + ".json"), JSON.stringify(filteredMonsters));
    }
}

export {writeMonsters};

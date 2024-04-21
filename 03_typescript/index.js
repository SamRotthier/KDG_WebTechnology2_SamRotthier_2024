//npm i typescript -g
// Variables
var dbPath = "../db.json"; // go 1 niveau back
var entities;
function main() {
    fs.readFile(dbPath, 'utf8', function (error, JsonData) {
        if (error) {
            console.log("Error was thrown while reading the file: ".concat(dbPath));
        }
        entities = JSON.parse(JsonData); //Change Json to Object
        console.log(entities.players[0]);
        console.log(entities.monsters[0]);
    });
}
main();

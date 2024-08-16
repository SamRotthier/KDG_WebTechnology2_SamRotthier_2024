import {Entities} from "../model/Types";
import * as fs from "fs";

function readEntities(subscriber: (entities: Entities) => void){
    const db = "../db.json";
    fs.readFile(db,'utf8',(error, JsonData) => {
        if (error) {
            console.log(`Error occurred while reading file: ${db}`);
        }
        const entities: Entities = JSON.parse(JsonData);
        subscriber(entities);
    });
}

export {readEntities};
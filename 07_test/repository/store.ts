import * as fs from "fs/promises";
import {Entities} from "../model/Types.js";

async function readEntities() : Promise<Entities>{
    const db: string = "../db.json";
    return await fs.readFile(db, 'utf-8').then(data => JSON.parse(data));
}

export {readEntities};
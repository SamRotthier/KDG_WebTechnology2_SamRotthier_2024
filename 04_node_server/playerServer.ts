import {Entities, Player} from "./model/Types";
import {readEntities} from "./repository/store";
import {getPlayerAndMonster} from "./service/playerService";
import http, {IncomingMessage, ServerResponse} from "http"

const port: number = 3000;
//const server: Server = http.createServer(handleRequest);
const baseUrl: string = `http://localhost:${port}`

readEntities(init);

function init(entities: Entities): void {
    //server.listen(port,() => console.log(`Server is active on localhost:${port}`))
    http.createServer((req: IncomingMessage, res: ServerResponse) => {
            const url: URL = new URL(req.url!, baseUrl);
            const playerId: number | null = Number(url.searchParams.get('PlayerId')); // http://localhost:3000/?PlayerId=1
            if (playerId != null && playerId != 0) {
                let player: Player | null = getPlayerAndMonster(entities, playerId);
                if (player != null) {
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(player));
                } else {
                    res.writeHead(404, {'Content-Type': 'text/plain'});
                    res.end(`No Player with ${playerId} id found`);
                }
            } else {
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.end("No Id in URL");
            }
        }
    ).listen(port, () => {
        console.log(`server started on http://localhost:${port}`);
    })
}

/*
function handleRequest(req: IncomingMessage, res: ServerResponse): void{
    const url: URL = new URL(req.url!,baseUrl);
    const playerId: number|null = Number(url.searchParams.get('PlayerId'));

    if (server.playerId != null){
        let playerData = getPlayerAndMonster(entities, playerId)
    }
}
*/
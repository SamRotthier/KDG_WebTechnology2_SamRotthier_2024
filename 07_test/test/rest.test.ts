import request from "supertest";
import app from "../app.js";
import {expect, test, describe} from "@jest/globals";

let server = request(app);

describe("Test Players", () =>{
    test("GET Request Players - Status code 200", async () => {
        const res = await server.get("/api/players");
        expect(res.statusCode).toBe(200);
    })
    test("GET Request Players - +10 entities returned", async () =>{
        const res = await server.get("/api/players");
        expect(res.body.length).toBeGreaterThan(10);
    })
    test("GET Request Players - self link", async() =>{
        const res = await server.get("/api/players");
        const selflink: string = res.body[0]._links.self.href
        const url = new URL(selflink);
        const response = await server.get(url.pathname)
        expect(response.body.userid).toBe(Number(url.pathname.split('/').pop()));
    })
    test("GET Request Players - search functionality", async() =>{
        const searchTerm: string = "DragonSlayer";
        const res = await server.get(`/api/players/search?search=${searchTerm}`)
        let player = res.body[0];

        const result: string[] = Object.values(player).map((value:any) => value.toString().toLowerCase());

        expect(result.some(element => element.includes(searchTerm.toLowerCase()))).toBeTruthy();
        expect(player).toHaveProperty('_links.self.href');
    })
    test("POST Request Players - Status code 201", () =>{
        server.post("/api/players")
            .send({
                "PlayerId": 1,
                "PlayerName": "test",
                "StartDate": "12/08/2023",
                "Playergender": "Male",
                "DefeatedBosses": 10,
                "InhabitantOfRealm": "Yellow",
                "PlayTimeInHours": 20,
                "ProfilePicture": "string",
                "Monsters":{
                }
            })
            .expect(201)
    })
    test("DELETE Requet Players - Status code 404 after deletion",  () =>{
        const id = 1
        server.delete(`/api/players/${id}`)
            .then(res => {
                expect(res.statusCode).toBe(204)
                return server.get(`/api/players/${id}`)
            })
            .then(res => expect(res.status).toBe(404))
    })
})

describe("Test Monsters", () =>{
    test("GET /api/players/1/monsters - Return all monsters for Player 'DragonSlayer' ", async() =>{
        const id = 1
        const player: string = "DragonSlayer"
        const res = await server.get(`/api/players/${id}/monsters`)
        const playerName: string = res.body.at(-1).playerName
        expect(playerName).toBe(player);
    })
})
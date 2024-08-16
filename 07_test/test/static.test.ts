import {expect, test, describe} from "@jest/globals";
import request from "supertest";
import app from "../app.js"

let server = request(app);

describe('Test html', () => {
    test("return html homepage", async () => {
        const res = await server.get("/");
        expect(res.statusCode).toBe(200);
    })
})
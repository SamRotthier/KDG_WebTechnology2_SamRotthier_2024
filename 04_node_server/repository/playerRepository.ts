import {Player} from "../model/Types";

function findPlayerById(players: Player[], PlayerId: number): Player | null {
    return players.find((player: Player) => player.PlayerId === PlayerId) || null;
}

export {findPlayerById};

/*
//Tests
let players: Player[] = [
    {
        "PlayerId": 1,
        "PlayerName": "DragonSlayer",
        "StartDate": "2022-01-01",
        "Playergender": "F",
        "DefeatedBosses": 5,
        "InhabitantOfRealm": "Yellow",
        "PlayTimeInHours": 25,
        "ProfilePicture": "https://pin.it/3Ddilmu"
    },
    {
        "PlayerId": 2,
        "PlayerName": "DeamonSlayer",
        "StartDate": "2022-01-01",
        "Playergender": "M",
        "DefeatedBosses": 0,
        "InhabitantOfRealm": "Blue",
        "PlayTimeInHours": 10,
        "ProfilePicture": "https://pin.it/5riIOY3"
    },
    {
        "PlayerId": 3,
        "PlayerName": "PokemonMaster",
        "StartDate": "2022-01-06",
        "Playergender": "M",
        "DefeatedBosses": 6,
        "InhabitantOfRealm": "Red",
        "PlayTimeInHours": 500,
        "ProfilePicture": "https://pin.it/5EZ73t4"
    },
    {
        "PlayerId": 4,
        "PlayerName": "IKZELF121",
        "StartDate": "2022-04-04",
        "Playergender": "M",
        "DefeatedBosses": 5,
        "InhabitantOfRealm": "Blue",
        "PlayTimeInHours": 30,
        "ProfilePicture": "https://pin.it/2WdRBpN"
    },
    {
        "PlayerId": 5,
        "PlayerName": "Razum-Dar",
        "StartDate": "2022-02-04",
        "Playergender": "M",
        "DefeatedBosses": 5,
        "InhabitantOfRealm": "Red",
        "PlayTimeInHours": 1,
        "ProfilePicture": "https://pin.it/2WdRBpN"
    }
    ]
console.log( findPlayerById(players,4))
*/

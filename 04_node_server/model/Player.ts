import Monster from "./Monster"

interface Player {
    PlayerId: number,
    PlayerName: string,
    InhabitantOfRealm: string,
    Playergender: string,
    StartDate: string,
    PlayTimeInHours: number,
    DefeatedBosses: number,
    ProfilePicture: string
    Monsters?:Monster[]
}

export default Player;
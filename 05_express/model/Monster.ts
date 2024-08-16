import Resources from "./Resources";
import {PlayerSummary} from "./Player";
interface Monster {
    MonsterId: number,
    MonsterName: string,
    MonsterNickname: string,
    Element: string,
    GuidEntry: number,
    CanEvolve: boolean,
    PlayerId?: number,
    Player?: PlayerSummary
}
interface MonsterSummary extends Resources{
    MonsterId: number,
    MonsterName: string,
    GuidEntry: number
}

export {Monster, MonsterSummary};
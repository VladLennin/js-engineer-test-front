import {SuperPower} from "./superpower";
import {Image} from "./image";

export interface Hero{
    id: number
    nickname: string;
    real_name: string;
    origin_description: string;
    catch_phrase: string;
    images: Image[]
    superpowers: SuperPower[]

}

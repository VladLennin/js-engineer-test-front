import {Image} from "./image";

export interface HeroMainDto {
    id: number;
    nickname: string;
    images: Image[];
}
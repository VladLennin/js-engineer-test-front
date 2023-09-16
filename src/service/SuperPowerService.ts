import {AxiosResponse} from "axios";
import {HeroMainDto} from "../models/hero-main-dto";
import api from "../http";
import {SuperPower} from "../models/superpower";

export class SuperPowerService {
    static async getSuperPowers(): Promise<AxiosResponse<SuperPower[]>> {
        return await api.get(`/superpower`)
    }

    static async createSuperPower(power: string): Promise<AxiosResponse<SuperPower>> {
        return await api.post(`/superpower`, {power})
    }
}
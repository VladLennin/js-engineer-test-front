import api from "../http";
import {Axios, AxiosResponse} from "axios";
import {Hero} from "../models/hero";
import {HeroMainDto} from "../models/hero-main-dto";
import {SuperPower} from "../models/superpower";

export class HeroService {
    static async createHero(hero: Hero, files: any, chosenPowers: SuperPower[]): Promise<AxiosResponse<Hero>> {
        let powersID: number[] = []

        for (let i = 0; i < chosenPowers.length; i++) {
            powersID.push(chosenPowers[i].id)
        }
        console.log(files)

        let data = new FormData();
        data.append("heroDto", JSON.stringify({...hero, superpowers: powersID}))

        for (let i = 0; i < files.length; i++) {
            data.append("files", files[i].file, `file${i}.${files[i].file.name.split(".")[1]}`);
        }
        return await api.post('/hero', data, {
            headers: {"Content-Type": "multipart/form-data"}
        })
    }

    static async editHero(hero: Hero, files: any, chosenPowers: SuperPower[]) {
        let powersID: number[] = []

        for (let i = 0; i < chosenPowers.length; i++) {
            powersID.push(chosenPowers[i].id)
        }
        console.log(files)

        let data = new FormData();
        data.append("editedHero", JSON.stringify({...hero, superpowers: powersID}))

        for (let i = 0; i < files.length; i++) {
            data.append("files", files[i].file, `file${i}.${files[i].file.name.split(".")[1]}`);
        }

        return await api.put("/hero", data)
    }

    static async getCountHeroes() {
        return await api.get("/hero/count")
    }

    static async getHeroesPaginated(page: number, limit: number): Promise<AxiosResponse<HeroMainDto[]>> {
        return await api.get(`/hero/all/${page}/${limit}`)
    }


    static async getHeroById(id: number): Promise<AxiosResponse<Hero>> {
        return await api.get(`/hero/${id}`)
    }

    static async removeHero(id: number) {

        return await api.delete(`/hero/${id}`)
    }

    static async removeHeroImg(id:number){
        return await api.delete(`/hero/image/${id}`)
    }

}
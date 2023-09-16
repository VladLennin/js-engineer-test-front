import React, {FC} from 'react';
import {HeroMainDto} from "../models/hero-main-dto";
import {Link, useNavigate} from "react-router-dom";
import {RouteNames} from "../router/RouteNames";
import {log} from "util";
import {HeroService} from "../service/HeroService";

interface HeroCardProps {
    hero: HeroMainDto;
}

const HeroCard: FC<HeroCardProps> = ({hero}) => {
    const navigate = useNavigate()
    const removeHero = () => {
        HeroService.removeHero(hero.id).then(() => {
            navigate(-1)
        }).catch(e => {
            console.log(e)
        })
    }

    return (
        <div className={"w-[33vw] mt-5 rounded-2xl border-2 px-10 py-3 shadow-lg"}>
            <div className={"flex justify-end gap-5 items-center p-2"}>
                <Link className={"text-yellow-400"} to={RouteNames.EDIT_HERO_PAGE + "/" + hero.id}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </Link>
                <button className={"text-red-500"} onClick={removeHero}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                         className="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path
                            d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                    </svg>
                </button>
            </div>
            <Link to={RouteNames.DETAILED_HERO_PAGE + "/" + hero.id}>

                <img className={'w-full'} src={`http://localhost:3001/${hero.images[0].href}`} alt=""/>
                <p className={"text-center text-3xl font-thin break-all"}>{hero.nickname}</p>
            </Link>
        </div>
    );
};

export default HeroCard;

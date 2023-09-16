import React, {useEffect, useState} from 'react';
import {Hero} from "../models/hero";
import {HeroService} from "../service/HeroService";
import HeroCard from "../components/HeroCard";
import {HeroMainDto} from "../models/hero-main-dto";
import {Link} from "react-router-dom";
import {RouteNames} from "../router/RouteNames";
import PaginationControl from "../components/PaginationControl";

const AllHeroesPage = () => {

    const [heroes, setHeroes] = useState<HeroMainDto[]>([])
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(5)
    const [countPages, setCountPages] = useState<number>(0)


    useEffect(() => {
        HeroService.getHeroesPaginated(page, limit).then(res => {
            setHeroes(res.data)
        })
        HeroService.getCountHeroes().then(res => {
            setCountPages(Math.ceil(res.data / limit))
            setPage(1)
        })
    }, [])

    useEffect(() => {
        HeroService.getHeroesPaginated(page, limit).then(res => {
            setHeroes(res.data)
        })
    }, [page])

    useEffect(() => {
        HeroService.getHeroesPaginated(page, limit).then(res => {
            setHeroes(res.data)
        })
        HeroService.getCountHeroes().then(res => {
            setCountPages(Math.ceil(res.data / limit))
            setPage(1)
        })
    }, [limit])

    return (
        <>

            <div className={"flex justify-end pt-5 mr-5"}>
                <Link to={RouteNames.ADD_HERO_PAGE} className={"border rounded px-2 py-1 bg-green-300 text-[#ffff]"}>Create
                    new Hero</Link>
            </div>
            <div className={"flex flex-col items-center justify-center p-10"}>
                {heroes.length !== 0 &&
                    heroes.map(hero => (
                        <HeroCard key={hero.id} hero={hero}/>
                    ))
                }
            </div>
            <div className={"mb-5"}>
                {
                    heroes.length !== 0 &&
                    <PaginationControl page={page} setPage={setPage} countPages={countPages} limit={limit}
                                       setLimit={setLimit}/>
                }

            </div>
        </>
    );
};

export default AllHeroesPage;
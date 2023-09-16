import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Hero} from "../models/hero";
import {HeroService} from "../service/HeroService";
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa'
import {CarouselItem} from "../models/carouesel-item";
import {Carousel} from "../components/carouesel/Carousel";

const DetailedHeroPage = () => {
    const {id} = useParams()
    const [hero, setHero] = useState<Hero>({} as Hero)
    const navigate = useNavigate()
    useEffect(() => {
        HeroService.getHeroById(Number(id)).then(res => {
            setHero(res.data)
        }).catch(e => {
            console.log(e)
        })
    }, []);

    return (
        <div className={"flex items-center justify-center  h-full  flex-col mt-3"}>
            <div className={"flex justify-center w-1/3 "}>
                <Carousel
                    data={hero.images}
                    autoPlay={true}
                    rightItem={<FaArrowRight/>}
                    leftItem={<FaArrowLeft/>}
                    animationDuration={3000}
                />
            </div>
            <div className={"border-2 p-10 rounded-lg shadow-lg w-1/2 mt-3"}>

                <hr className={'my-10'}/>
                <p className={"text-3xl text-center font-thin break-all"}>
                    {hero.nickname}
                </p>
                <div className={"grid grid-cols-2 mt-10 gap-5"}>
                    <div>
                        <p className={"text-sm"}>Real name</p>
                        <p className={"font-bold text-xl break-all"}>{hero.real_name}</p>
                    </div>

                    <div>
                        <p className={"text-sm"}>Catch Phrase</p>
                        <p className={"font-bold text-xl break-all"}>{hero.catch_phrase}</p>
                    </div>

                    <div>
                        <p className={"text-sm"}>Origin description</p>
                        <p className={"font-bold text-xl w-full break-all "}>{hero.origin_description}</p>
                    </div>

                    <div className={"font-bold text-xl"}>
                        <p className={"text-sm"}>Super Powers</p>
                        {hero.superpowers?.map(item => (
                            <li key={item.id}>
                                {item.power}
                            </li>
                        ))}
                    </div>

                </div>
            </div>

            <button onClick={() => navigate(-1)} className={"my-3 text-thin text-2xl"}>← Back</button>
        </div>
    );
};

export default DetailedHeroPage;
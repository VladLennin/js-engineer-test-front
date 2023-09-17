import React, {useEffect, useState} from 'react';
import {SuperPower} from "../models/superpower";
import {SuperPowerService} from "../service/SuperPowerService";
import {Hero} from "../models/hero";
import {HeroService} from "../service/HeroService";
import {useNavigate, useParams} from "react-router-dom";
import {RouteNames} from "../router/RouteNames";
import uuid from "react-uuid";

const EditHeroPage = () => {

    const [superpowers, setSuperpowers] = useState<SuperPower[]>([])
    const [chosenPowers, setChosenPowers] = useState<SuperPower[]>([])
    const [newSuperpower, setNewSuperpower] = useState<string>("")
    const [hero, setHero] = useState<Hero>(
        {} as Hero
    )
    const [chosenFiles, setChosenFiles] = useState<any[]>([])

    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        HeroService.getHeroById(Number(id)).then(res => {
            setHero(res.data)
            setChosenPowers(res.data.superpowers)
        }).catch(e => {
            console.log(e)
        })

        SuperPowerService.getSuperPowers().then(res => {
            setSuperpowers(res.data)
        }).catch(e => {
            console.log(e)
        })
    }, []);

    const getBase64 = (file: File) => {
        return new Promise(async resolve => {
            let baseURL: string | ArrayBuffer | null = "";
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    }

    const handleFileInputChange = (e: any) => {
        const id = uuid()

        getBase64(e.target.files[0])
            .then(result => {
                setChosenFiles([...chosenFiles, {value: String(result), file: e.target.files[0], id: id}]);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const changeHero = () => {
        HeroService.editHero(hero, chosenFiles, chosenPowers).then(res => {
            navigate(RouteNames.ALL_HEROES_PAGE)
        }).catch(e => {
            console.log(e)
        })
    }

    const createSuperpower = () => {
        if (newSuperpower !== "") {
            SuperPowerService.createSuperPower(newSuperpower).then(res => {
                setSuperpowers([...superpowers, res.data])
                setChosenPowers([...chosenPowers, res.data])
                setNewSuperpower("")
            }).catch(e => {
                console.log(e)
            })
        }
    }

    const addChosenPower = (e: any) => {
        if (!chosenPowers.includes(chosenPowers.filter(i => i.id === Number(e.target.value))[0])) {
            setChosenPowers([...chosenPowers, superpowers.filter(i => i.id === Number(e.target.value))[0]])
        } else {
            alert("This super power already added")
        }
    }

    const removeExistImg = (id: number) => {
        HeroService.removeHeroImg(id).then(res => {
            console.log(res)
            setHero({...hero, images: hero.images.filter(i => i.id !== id)})

        }).catch(e => {
            console.log(e)
        })
    }

    return (
        <div className={"flex items-center justify-center flex-col pt-10 mb-5"}>
            <div className={"grid grid-cols-2 w-1/2 border-2 rounded-lg p-5 gap-5"}>
                <div>
                    <p className={"text-sm"}>Nickname</p>
                    <input value={hero.nickname} onChange={e => {
                        setHero({...hero, nickname: e.target.value})
                    }} className={"border-2 rounded p-1"} type="text"/>
                </div>

                <div>
                    <p className={"text-sm"}>Real Name</p>
                    <input value={hero.real_name} onChange={e => {
                        setHero({...hero, real_name: e.target.value})
                    }} className={"border-2 rounded p-1"} type="text"/>
                </div>

                <div className={"h-[2px] bg-gray-300 my-4 w-full col-span-2"}/>

                <div className={'col-span'}>
                    <p className={"text-sm"}>Origin Description</p>
                    <textarea value={hero.origin_description} onChange={e => {
                        setHero({...hero, origin_description: e.target.value})
                    }} className={"border-2 rounded w-full h-full p-1"}/>
                </div>

                <div>
                    <p className={"text-sm"}>Super Powers</p>
                    <select onChange={addChosenPower} value={0} className={"border-2 rounded p-2 w-full"}
                            defaultValue={0}>
                        <option value={0}>Choose Exists Powers</option>
                        {superpowers.map(item => (
                            <option value={item.id} key={item.id}>
                                {item.power}
                            </option>
                        ))}
                    </select>
                    <p className={"text-center font-bold"}>or</p>
                    <div className={"w-full"}>
                        <p className={"font-thin text-lg text-center w"}>Create new SuperPower</p>
                        <div className={"flex"}>
                            <input value={newSuperpower} onChange={(e) => {
                                setNewSuperpower(e.target.value)
                            }} className={" w-full border-2 rounded p-1"} type="text"/>
                            <button onClick={createSuperpower}
                                    className={"text-yellow-400 ml-3 hover:text-black duration-200"}>Add
                            </button>
                        </div>
                    </div>
                    <div>
                        {chosenPowers?.length === 0
                            ?
                            <p className={"font-thin text-center mt-5"}>Choose superpowers!</p>
                            :
                            <div className={"mt-2"}>
                                {chosenPowers?.map((power, index) => (
                                    <div className={"flex justify-between mt-1"}>
                                        {index + 1}.{power.power}
                                        <button onClick={() => {
                                            setChosenPowers(chosenPowers.filter(i => i.id !== power.id))
                                        }} className={'text-red-500'}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                 fill="currentColor"
                                                 className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                </div>

                <div className={"h-[2px] bg-gray-300 my-4 w-full col-span-2"}/>

                <div>
                    <p className={"text-sm"}>Catch Phrase</p>
                    <textarea value={hero.catch_phrase} onChange={e => {
                        setHero({...hero, catch_phrase: e.target.value})
                    }} className={"border-2 rounded w-full h-full p-1"}/>
                </div>

                <div>
                    <p className={"text-sm"}>Images</p>
                    <input onChange={e => {
                        handleFileInputChange(e)
                    }} className={"border-2 rounded w-full p-1"} type="file"/>
                </div>

                <div className={"col-span-2 grid grid-cols-4 gap-5 mt-3"}>
                    {chosenFiles?.map(item => (
                        <div className={'relative'}>
                            <button onClick={() => {
                                setChosenFiles(chosenFiles.filter(i => i.id !== item.id))
                            }} className={'text-red-500 absolute '}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                     fill="currentColor"
                                     className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                </svg>
                            </button>
                            <img key={item} className={"h-[100px]  border rounded "} src={item.value}/>
                        </div>
                    ))}
                    {hero.images?.map(item => (
                        <div className={'relative'}>
                            <button onClick={() => {
                                removeExistImg(item.id)
                            }} className={'text-red-500 absolute '}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                     fill="currentColor"
                                     className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                </svg>
                            </button>
                            <img key={item.id} className={"h-[100px]  border rounded "}
                                 src={"http://localhost:3001/" + item.href}/>
                        </div>
                    ))}


                </div>
                <div className={"flex justify-center col-span-2"}>
                    <button className={"border-2 rounded-lg px-5 py-2 bg-yellow-300"} onClick={changeHero}>
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditHeroPage;
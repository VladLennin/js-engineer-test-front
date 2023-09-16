import React from 'react';
import {Route, Routes} from "react-router-dom";
import {RouteNames} from "./RouteNames";
import AllHeroesPage from "../pages/AllHeroesPage";
import EditHeroPage from "../pages/EditHeroPage";
import AddHeroPage from "../pages/AddHeroPage";
import DetailedHeroPage from "../pages/DetailedHeroPage";

const AppRouter = () => {
    return (
        <Routes>
            <Route path={RouteNames.DETAILED_HERO_PAGE + "/:id"} element={<DetailedHeroPage/>}/>
            <Route path={RouteNames.ALL_HEROES_PAGE} element={<AllHeroesPage/>}/>
            <Route path={RouteNames.EDIT_HERO_PAGE + "/:id"} element={<EditHeroPage/>}/>
            <Route path={RouteNames.ADD_HERO_PAGE} element={<AddHeroPage/>}/>
        </Routes>
    );
};

export default AppRouter;
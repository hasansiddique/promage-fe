import React, {FC} from "react";
import {Routes, Route} from "react-router-dom";

import Layout from '../../views/layout';
import ProjectsList from '../../views/projects/ProjectsList.view';
import ProjectDetails from '../../views/projects/ProjectDetails.view';

interface RoutesInterface {}

const PagesRoutes: FC<RoutesInterface> = () => {

    return (
        <Routes>
            <Route path="/" element={<Layout><ProjectsList /></Layout>}/>
            <Route path="/details/:id" element={<Layout><ProjectDetails /></Layout>}/>
        </Routes>
    );
};

export default PagesRoutes;

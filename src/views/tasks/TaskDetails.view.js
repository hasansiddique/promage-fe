import { Table } from 'antd';
import React, { useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import { fetchProjectById } from './tasks.api';

const ProjectDetails = () => {
    const {state} = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const projectsIsFetching = useSelector((state) => state.projects.isFetching);
    const projectsList = useSelector((state) => state.projects.projectsList);

    useEffect(() => {
        const { projectId } = state;
        fetchProjectById(dispatch, projectId);
    }, []);

    return (
        <div>Hello</div>
    );
}
export default ProjectDetails;

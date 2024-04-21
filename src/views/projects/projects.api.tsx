import request from '../../common/request';
import transformKeys from '../../common/transformKeys';

import {
    initiateFetchList,
    fetchListComplete,
    fetchListFailed,

    initiateFetchProject,
    fetchProjectComplete,
    fetchProjectFailed,

    initiateDeleteProject,
    deleteProjectComplete,
    deleteProjectFailed,

    initiateUpdateProject,
    updateProjectComplete,
    updateProjectFailed,

    initiateCreateProject,
    createProjectComplete,
    createProjectFailed,
} from './projects.reducer';
import { toggleNotification } from '../../common/notifications/notifcation.reducer';


export const fetchAllProjects = async (dispatch: Function) => {
    try {
        dispatch(initiateFetchList());
        const response = await request.get('/v1/projects');
        dispatch(fetchListComplete(transformKeys.toCamelCase(response?.data?.projects)));
    } catch (error) {
        dispatch(toggleNotification({
            type: 'error',
            content: 'Cannot retrieve projects list.',
        }));
        dispatch(fetchListFailed());
        console.error(error);
    }
};

export const fetchProjectById = async (dispatch: Function, projectId: string) => {
    try {
        dispatch(initiateFetchProject());
        const response = await request.get(`/v1/projects/${projectId}`);
        dispatch(fetchProjectComplete(transformKeys.toCamelCase(response?.data?.project)));
    } catch (error) {
        dispatch(fetchProjectFailed());
        dispatch(toggleNotification({
            type: 'error',
            content: 'Cannot retrieve project details.',
        }));
        console.error(error);
    }
};

export const createNewProject = async (dispatch: Function, payload: object) => {
    try {
        dispatch(initiateCreateProject());
        const response = await request.post('/v1/projects/', payload);
        dispatch(createProjectComplete(transformKeys.toCamelCase(response?.data?.project)));
        dispatch(toggleNotification({
            type: 'success',
            content: 'Project creation successful.',
        }));
    } catch (error) {
        dispatch(createProjectFailed());
        dispatch(toggleNotification({
            type: 'error',
            content: 'Project creation failed.',
        }));
        console.error(error);
    }
};

export const updateProject = async (dispatch: Function, projectId: string, payload: object) => {
    try {
        dispatch(initiateUpdateProject());
        const response = await request.put(`/v1/projects/${projectId}`, payload);
        dispatch(updateProjectComplete(transformKeys.toCamelCase(response?.data?.project)));
        dispatch(toggleNotification({
            type: 'success',
            content: 'Project update successful.',
        }));
    } catch (error) {
        dispatch(updateProjectFailed());
        dispatch(toggleNotification({
            type: 'error',
            content: 'Project update failed.',
        }));
        console.error(error);
    }
};

export const deleteProject = async (dispatch: Function, projectId: string) => {
    try {
        dispatch(initiateDeleteProject());
        await request.delete(`/v1/projects/${projectId}`);
        dispatch(deleteProjectComplete(projectId));
        dispatch(toggleNotification({
            type: 'success',
            content: 'Project delete successful.',
        }));
    } catch (error) {
        dispatch(deleteProjectFailed());
        dispatch(toggleNotification({
            type: 'error',
            content: 'Project delete failed.',
        }));
        console.error(error);
    }
};

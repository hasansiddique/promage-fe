import request from '../../common/request';
import transformKeys from '../../common/transformKeys';

import {
    initiateFetchList,
    fetchListComplete,
    fetchListFailed,

    initiateFetchTask,
    fetchTaskComplete,
    fetchTaskFailed,

    initiateDeleteTask,
    deleteTaskComplete,
    deleteTaskFailed,

    initiateUpdateTask,
    updateTaskComplete,
    updateTaskFailed,

    initiateCreateTask,
    createTaskComplete,
    createTaskFailed,
} from './tasks.reducer';
import { toggleNotification } from '../../common/notifications/notifcation.reducer';


export const fetchAllTasks = async (dispatch: Function, projectId: string) => {
    try {
        dispatch(initiateFetchList());
        const response = await request.get(`/v1/tasks/projects/${projectId}`);
        dispatch(fetchListComplete(transformKeys.toCamelCase(response?.data?.tasks)));
    } catch (error) {
        dispatch(toggleNotification({
            type: 'failure',
            content: 'Cannot retrieve tasks list.',
        }));
        dispatch(fetchListFailed());
        console.error(error);
    }
};

export const fetchTaskById = async (dispatch: Function, taskId: string) => {
    try {
        dispatch(initiateFetchTask());
        const response = await request.get(`/v1/tasks/${taskId}`);
        dispatch(fetchTaskComplete(transformKeys.toCamelCase(response?.data?.task)));
    } catch (error) {
        dispatch(fetchTaskFailed());
        dispatch(toggleNotification({
            type: 'failure',
            content: 'Cannot retrieve task details.',
        }));
        console.error(error);
    }
};

export const createNewTask = async (dispatch: Function, payload: object) => {
    try {
        dispatch(initiateCreateTask());
        const response = await request.post('/v1/tasks/', payload);
        dispatch(createTaskComplete(transformKeys.toCamelCase(response?.data?.task)));
        dispatch(toggleNotification({
            type: 'success',
            content: 'Task creation successful.',
        }));
    } catch (error) {
        dispatch(createTaskFailed());
        dispatch(toggleNotification({
            type: 'failure',
            content: 'Task creation failed.',
        }));
        console.error(error);
    }
};

export const updateTask = async (dispatch: Function, taskId: string, payload: object) => {
    try {
        dispatch(initiateUpdateTask());
        const response = await request.put(`/v1/tasks/${taskId}`, payload);
        dispatch(updateTaskComplete(transformKeys.toCamelCase(response?.data?.task)));
        dispatch(toggleNotification({
            type: 'success',
            content: 'Task update successful.',
        }));
    } catch (error) {
        dispatch(updateTaskFailed());
        dispatch(toggleNotification({
            type: 'failure',
            content: 'Task update failed.',
        }));
        console.error(error);
    }
};

export const deleteTask = async (dispatch: Function, taskId: string) => {
    try {
        dispatch(initiateDeleteTask());
        await request.delete(`/v1/tasks/${taskId}`);
        dispatch(deleteTaskComplete(taskId));
        dispatch(toggleNotification({
            type: 'success',
            content: 'Task delete successful.',
        }));
    } catch (error) {
        dispatch(deleteTaskFailed());
        dispatch(toggleNotification({
            type: 'failure',
            content: 'Task delete failed.',
        }));
        console.error(error);
    }
};

import { createSlice } from '@reduxjs/toolkit';

import {
    FETCHING_SINGLE,
    FETCHING_LIST,
    CREATING,
    DELETING,
    UPDATING,
} from './constants';

export const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        fetchStatus: '',
        tasksList: [],
        taskDetails: {},
    },
    reducers: {
        initiateFetchList: (state) => {
            state.fetchStatus = FETCHING_SINGLE;
        },
        fetchListComplete: (state, action) => {
            state.fetchStatus = '';
            state.tasksList = action.payload;
        },
        fetchListFailed: (state) => {
            state.fetchStatus = '';
            state.tasksList = [];
        },

        initiateFetchTask: (state) => {
            state.fetchStatus = FETCHING_LIST;
        },
        fetchTaskComplete: (state, action) => {
            state.fetchStatus = '';
            state.tasksList = action.payload;
        },
        fetchTaskFailed: (state) => {
            state.fetchStatus = '';
            state.tasksList = [];
        },

        initiateCreateTask: (state) => {
            state.fetchStatus = CREATING;
        },
        createTaskComplete: (state, action) => {
            state.fetchStatus = '';
            // @ts-ignore
            state.tasksList.push(action.payload);
        },
        createTaskFailed: (state) => {
            state.fetchStatus = '';
            state.tasksList = [];
        },

        initiateUpdateTask: (state) => {
            state.fetchStatus = UPDATING;
        },
        updateTaskComplete: (state, action) => {
            state.fetchStatus = '';
            const index = state.tasksList.findIndex((f: { id: string }) => f.id === action.payload.id);

            // @ts-ignore
            state.tasksList[index] = action.payload;
        },
        updateTaskFailed: (state) => {
            state.fetchStatus = '';
            state.tasksList = [];
        },

        initiateDeleteTask: (state) => {
            state.fetchStatus = DELETING;
        },
        deleteTaskComplete: (state, action) => {
            const newList = state.tasksList.filter((f: { id: string }) => f.id !== action.payload);
            state.fetchStatus = '';
            state.tasksList = newList;
        },
        deleteTaskFailed: (state) => {
            state.fetchStatus = '';
            state.tasksList = [];
        },

        resetTasksList: (state) => {
            state.tasksList = [];
        }
    },
});

export const {
    initiateFetchList,
    fetchListComplete,
    fetchListFailed,

    initiateFetchTask,
    fetchTaskComplete,
    fetchTaskFailed,

    initiateCreateTask,
    createTaskComplete,
    createTaskFailed,

    initiateUpdateTask,
    updateTaskComplete,
    updateTaskFailed,

    initiateDeleteTask,
    deleteTaskComplete,
    deleteTaskFailed,

    resetTasksList,

} = taskSlice.actions;

export default taskSlice.reducer;

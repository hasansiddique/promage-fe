import { createSlice } from '@reduxjs/toolkit';

import {
    FETCHING_SINGLE,
    FETCHING_LIST,
    CREATING,
    DELETING,
    UPDATING,
    SUCCESS,
    FAILURE,
} from './constants';

export const projectSlice = createSlice({
    name: 'projects',
    initialState: {
        fetchStatus: '',
        projectsList: [],
        projectDetails: {},
    },
    reducers: {
        initiateFetchList: (state) => {
            state.fetchStatus = FETCHING_LIST;
        },
        fetchListComplete: (state, action) => {
            state.fetchStatus = '';
            state.projectsList = action.payload;
        },
        fetchListFailed: (state) => {
            state.fetchStatus = '';
            state.projectsList = [];
        },

        initiateFetchProject: (state) => {
            state.fetchStatus = FETCHING_SINGLE;
        },
        fetchProjectComplete: (state, action) => {
            state.fetchStatus = '';
            state.projectDetails = action.payload;
        },
        fetchProjectFailed: (state) => {
            state.fetchStatus = '';
            state.projectDetails = {};
        },

        initiateCreateProject: (state) => {
            state.fetchStatus = CREATING;
        },
        createProjectComplete: (state, action) => {
            state.fetchStatus = SUCCESS;
            // @ts-ignore
            state.projectsList.push(action.payload);
        },
        createProjectFailed: (state) => {
            state.fetchStatus = FAILURE;
        },

        initiateUpdateProject: (state) => {
            state.fetchStatus = UPDATING;
        },
        updateProjectComplete: (state, action) => {
            state.fetchStatus = SUCCESS;
            const index = state.projectsList.findIndex((f: { id: string }) => f.id === action.payload.id);

            // @ts-ignore
            state.projectsList[index] = action.payload;
        },
        updateProjectFailed: (state) => {
            state.fetchStatus = FAILURE;
        },

        initiateDeleteProject: (state) => {
            state.fetchStatus = DELETING;
        },
        deleteProjectComplete: (state, action) => {
            const newList = state.projectsList.filter((f: { id: string }) => f.id !== action.payload);
            state.fetchStatus = SUCCESS;
            state.projectsList = newList;
        },
        deleteProjectFailed: (state) => {
            state.fetchStatus = FAILURE;
        },

        resetFetchStatus: (state) => {
            state.fetchStatus = '';
        },
    },
});

export const {
    initiateFetchList,
    fetchListComplete,
    fetchListFailed,

    initiateFetchProject,
    fetchProjectComplete,
    fetchProjectFailed,

    initiateCreateProject,
    createProjectComplete,
    createProjectFailed,

    initiateUpdateProject,
    updateProjectComplete,
    updateProjectFailed,

    initiateDeleteProject,
    deleteProjectComplete,
    deleteProjectFailed,

    resetFetchStatus,

} = projectSlice.actions;

export default projectSlice.reducer;

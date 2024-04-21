import { createSlice } from '@reduxjs/toolkit';

import { FETCHING_LIST } from "../projects/constants";

export const managersSlice = createSlice({
    name: 'managers',
    initialState: {
        fetchStatus: '',
        managersList: [],
        managersDetails: {},
    },
    reducers: {
        initiateFetchList: (state) => {
            state.fetchStatus = FETCHING_LIST;
        },
        fetchListComplete: (state, action) => {
            state.fetchStatus = '';
            state.managersList = action.payload;
        },
        fetchListFailed: (state) => {
            state.fetchStatus = '';
            state.managersList = [];
        },
    },
});

export const {
    initiateFetchList,
    fetchListComplete,
    fetchListFailed,

} = managersSlice.actions;

export default managersSlice.reducer;

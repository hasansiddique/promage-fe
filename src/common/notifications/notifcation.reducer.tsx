import { createSlice } from '@reduxjs/toolkit';

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        type: '',
        content: '',
    },
    reducers: {
        toggleNotification: (state, action) => {
            state.type = action.payload.type;
            state.content = action.payload.content;
        },
    },
});

export const {
    toggleNotification,

} = notificationsSlice.actions;

export default notificationsSlice.reducer;

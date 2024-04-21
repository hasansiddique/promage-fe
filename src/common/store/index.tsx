import { configureStore } from '@reduxjs/toolkit';

import notificationsReducer from "../notifications/notifcation.reducer";
import projectsReducer from "../../views/projects/projects.reducer";
import managersReducer from "../../views/managers/managers.reducer";
import tasksReducer from "../../views/tasks/tasks.reducer";


export default configureStore({
    reducer: {
        notifications: notificationsReducer,
        projects: projectsReducer,
        managers: managersReducer,
        tasks: tasksReducer,
    },
});

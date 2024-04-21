import React from "react";

export interface AddType {
    projectId: string;
    isFormOpen: boolean;
    taskToUpdate?: FieldType;
    setFormOpen:  React.Dispatch<React.SetStateAction<boolean>>;
    setTaskToUpdate:  React.Dispatch<React.SetStateAction<FieldType>>;
}

export type TaskProps = {
    projectId: string;
};

export type FieldType = {
    id: string;
    status: string;
    endDate: string;
    startDate: string;
    description: string;
    project: string;
};

export const TASK_STATUSES_OPTIONS = [{
    label: 'COMPLETED',
    value: 'COMPLETED',
}, {
    label: 'STARTED',
    value: 'STARTED',
}, {
    label: 'REJECTED',
    value: 'REJECTED',
}]

export const FETCHING_SINGLE = 'FETCHING_SINGLE';
export const FETCHING_LIST = 'FETCHING_LIST';
export const CREATING = 'CREATING';
export const UPDATING = 'UPDATING';
export const DELETING = 'DELETING';

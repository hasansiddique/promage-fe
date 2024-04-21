import React from "react";

export interface ManagerType {
    id: string;
    name: string;
    isActive: string;
    designation: string;
}

export interface AddType {
    isFormOpen: boolean;
    projectToUpdate?: FieldType;
    setFormOpen:  React.Dispatch<React.SetStateAction<boolean>>;
    setProjectToUpdate:  React.Dispatch<React.SetStateAction<FieldType>>;
}

export type FieldType = {
    id: string;
    name: string;
    endDate: string;
    startDate: string;
    description: string;
    manager: ManagerType;
};

export interface DataType {
    id: string;
    name: string;
    manager: string;
    startDate: string;
    endDate: string;
    isRunning: boolean;
    description: string;
}

export const FETCHING_SINGLE = 'FETCHING_SINGLE';
export const FETCHING_LIST = 'FETCHING_LIST';
export const CREATING = 'CREATING';
export const UPDATING = 'UPDATING';
export const DELETING = 'DELETING';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

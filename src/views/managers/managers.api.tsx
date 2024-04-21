import request from '../../common/request';
import transformKeys from '../../common/transformKeys';

import {
    initiateFetchList,
    fetchListComplete,
    fetchListFailed,
} from './managers.reducer';


export const fetchAllManagers = async (dispatch: Function) => {
    try {
        dispatch(initiateFetchList());
        const response = await request.get('/v1/managers');
        dispatch(fetchListComplete(transformKeys.toCamelCase(response?.data?.managers)));
    } catch (error) {
        dispatch(fetchListFailed());
        console.error(error);
    }
};

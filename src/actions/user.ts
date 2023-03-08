import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store/store';
import { sleep } from '../utils/sleep';

export const SET_USER_INFO = 'SET_USER_INFO';

export const setUserInfo = (userId: string) => {
    return {
        type: SET_USER_INFO,
        userId,
    };
};

export const signIn = (): IUserInfoThunkAction => async dispatch => {
    await sleep(1000);
    dispatch(setUserInfo('TEST'));
};

export type IUserInfoThunkAction = ThunkAction<void, RootState, undefined, IUserInfoActions>;
export type IUserInfoActions = ReturnType<typeof setUserInfo>;

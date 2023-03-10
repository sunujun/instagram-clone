import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IFeedInfo, IUserInfo } from 'InstagramClone';
import { RootState } from '../store/store';
import { sleep } from '../utils/sleep';
import { getFeedListFailure } from './feed';

export const SET_USER_INFO = 'SET_USER_INFO' as const;

export const GET_MY_FEED_REQUEST = 'GET_MY_FEED_REQUEST' as const;
export const GET_MY_FEED_SUCCESS = 'GET_MY_FEED_SUCCESS' as const;
export const GET_MY_FEED_FAILURE = 'GET_MY_FEED_FAILURE' as const;

export const setUserInfo = (userInfo: IUserInfo) => {
    return {
        type: SET_USER_INFO,
        userInfo,
    };
};

export const getMyFeedRequest = () => {
    return {
        type: GET_MY_FEED_REQUEST,
    };
};

export const getMyFeedSuccess = (list: IFeedInfo[]) => {
    return {
        type: GET_MY_FEED_SUCCESS,
        list,
    };
};

export const getMyFeedFailure = () => {
    return {
        type: GET_MY_FEED_FAILURE,
    };
};

export const signIn = (): IUserInfoThunkAction => async dispatch => {
    await sleep(1000);
    dispatch(
        setUserInfo({
            uid: 'TEST_UID',
            name: 'TEST_NAME',
            profileImage: 'TEST_PROFILE_IMAGE',
        }),
    );
};

export const getMyFeedList = (): IUserInfoThunkAction => async dispatch => {
    dispatch(getMyFeedRequest());
    await sleep(500);
    dispatch(
        getMyFeedSuccess([
            {
                id: 'ID_01',
                content: 'CONTENT_01',
                writer: {
                    name: 'WRITER_NAME_01',
                    uid: 'WRITER_UID_01',
                },
                imageUrl: 'https://docs.expo.dev/static/images/tutorial/background-image.png',
                likeHistory: ['UID_01', 'UID_02', 'UID_03'],
                createdAt: new Date().getTime(),
            },
            {
                id: 'ID_02',
                content: 'CONTENT_02',
                writer: {
                    name: 'WRITER_NAME_02',
                    uid: 'WRITER_UID_02',
                },
                imageUrl: 'https://docs.expo.dev/static/images/tutorial/background-image.png',
                likeHistory: ['UID_01', 'UID_02', 'UID_03'],
                createdAt: new Date().getTime(),
            },
            {
                id: 'ID_03',
                content: 'CONTENT_03',
                writer: {
                    name: 'WRITER_NAME_03',
                    uid: 'WRITER_UID_03',
                },
                imageUrl: 'https://docs.expo.dev/static/images/tutorial/background-image.png',
                likeHistory: ['UID_01', 'UID_02', 'UID_03'],
                createdAt: new Date().getTime(),
            },
        ]),
    );
};

export type IUserInfoDispatch = ThunkDispatch<RootState, undefined, IUserInfoActions>;
export type IUserInfoThunkAction = ThunkAction<void, RootState, undefined, IUserInfoActions>;
export type IUserInfoActions =
    | ReturnType<typeof setUserInfo>
    | ReturnType<typeof getMyFeedRequest>
    | ReturnType<typeof getMyFeedSuccess>
    | ReturnType<typeof getFeedListFailure>;

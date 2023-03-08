import { IFeedInfo } from 'InstagramClone';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store/store';
import { sleep } from '../utils/sleep';

export const GET_FEED_LIST_REQUEST = 'GET_FEED_LIST_REQUEST';
export const GET_FEED_LIST_SUCCESS = 'GET_FEED_LIST_SUCCESS';
export const GET_FEED_LIST_FAILURE = 'GET_FEED_LIST_FAILURE';

export const getFeedListRequest = () => {
    return {
        type: GET_FEED_LIST_REQUEST,
    };
};

export const getFeedListSuccess = (list: IFeedInfo[]) => {
    return {
        type: GET_FEED_LIST_SUCCESS,
        list,
    };
};

export const getFeedListFailure = () => {
    return {
        type: GET_FEED_LIST_FAILURE,
    };
};

export const getFeedList = (): IFeedListThunkAction => async dispatch => {
    dispatch(getFeedListRequest());
    await sleep(500);
    dispatch(
        getFeedListSuccess([
            {
                id: 'ID_01',
                content: 'CONTENT_01',
                writer: {
                    name: 'WRITER_NAME_01',
                    uid: 'WRITER_UID_01',
                },
                imageUrl: 'IMAGE_URL_01',
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
                imageUrl: 'IMAGE_URL_02',
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
                imageUrl: 'IMAGE_URL_03',
                likeHistory: ['UID_01', 'UID_02', 'UID_03'],
                createdAt: new Date().getTime(),
            },
        ]),
    );
};

export type IFeedListThunkAction = ThunkAction<void, RootState, undefined, IFeedListActions>;
export type IFeedListActions =
    | ReturnType<typeof getFeedListRequest>
    | ReturnType<typeof getFeedListSuccess>
    | ReturnType<typeof getFeedListFailure>;

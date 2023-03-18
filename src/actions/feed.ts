import { Platform } from 'react-native';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import { IFeedInfo } from 'InstagramClone';
import { RootState } from '../store/store';
import { sleep } from '../utils/sleep';

export const GET_FEED_LIST_REQUEST = 'GET_FEED_LIST_REQUEST' as const;
export const GET_FEED_LIST_SUCCESS = 'GET_FEED_LIST_SUCCESS' as const;
export const GET_FEED_LIST_FAILURE = 'GET_FEED_LIST_FAILURE' as const;

export const CREATE_FEED_REQUEST = 'CREATE_FEED_REQUEST' as const;
export const CREATE_FEED_SUCCESS = 'CREATE_FEED_SUCCESS' as const;
export const CREATE_FEED_FAILURE = 'CREATE_FEED_FAILURE' as const;

export const FAVORITE_FEED_REQUEST = 'FAVORITE_FEED_REQUEST' as const;
export const FAVORITE_FEED_SUCCESS = 'FAVORITE_FEED_SUCCESS' as const;
export const FAVORITE_FEED_FAILURE = 'FAVORITE_FEED_FAILURE' as const;

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

export const createFeedRequest = () => {
    return {
        type: CREATE_FEED_REQUEST,
    };
};

export const createFeedSuccess = (item: IFeedInfo) => {
    return {
        type: CREATE_FEED_SUCCESS,
        item,
    };
};

export const createFeedFailure = () => {
    return {
        type: CREATE_FEED_FAILURE,
    };
};

export const favoriteFeedRequest = () => {
    return {
        type: FAVORITE_FEED_REQUEST,
    };
};

export const favoriteFeedSuccess = (feedId: IFeedInfo['id'], myId: string, action: 'add' | 'remove') => {
    return {
        type: FAVORITE_FEED_SUCCESS,
        feedId,
        myId,
        action,
    };
};

export const favoriteFeedFailure = () => {
    return {
        type: FAVORITE_FEED_FAILURE,
    };
};

export const getFeedList = (): IFeedListThunkAction => async dispatch => {
    dispatch(getFeedListRequest());
    /** feed database에 있는 리소스 가져오기 */
    const lastFeedList = await database()
        .ref('/feed')
        .once('value')
        .then(snapshot => snapshot.val());
    // Object.keys(lastFeedList): key로 이루어진 배열
    /** feed 정보에 id값과 likeHistory 추가하여 가공 */
    const result = Object.keys(lastFeedList).map(key => {
        return {
            ...lastFeedList[key],
            id: key,
            likeHistory: lastFeedList[key].likeHistory ?? [],
        };
    });
    dispatch(getFeedListSuccess(result));
    // await sleep(500);
    // dispatch(
    //     getFeedListSuccess([
    //         {
    //             id: 'ID_01',
    //             content: 'CONTENT_01',
    //             writer: {
    //                 name: 'WRITER_NAME_01',
    //                 uid: 'WRITER_UID_01',
    //             },
    //             imageUrl: 'https://docs.expo.dev/static/images/tutorial/background-image.png',
    //             likeHistory: ['UID_01', 'UID_02', 'UID_03'],
    //             createdAt: new Date().getTime(),
    //         },
    //         {
    //             id: 'ID_02',
    //             content: 'CONTENT_02',
    //             writer: {
    //                 name: 'WRITER_NAME_02',
    //                 uid: 'WRITER_UID_02',
    //             },
    //             imageUrl: 'https://docs.expo.dev/static/images/tutorial/background-image.png',
    //             likeHistory: ['UID_01', 'UID_02', 'UID_03'],
    //             createdAt: new Date().getTime(),
    //         },
    //         {
    //             id: 'ID_03',
    //             content: 'CONTENT_03',
    //             writer: {
    //                 name: 'WRITER_NAME_03',
    //                 uid: 'WRITER_UID_03',
    //             },
    //             imageUrl: 'https://docs.expo.dev/static/images/tutorial/background-image.png',
    //             likeHistory: ['UID_01', 'UID_02', 'UID_03'],
    //             createdAt: new Date().getTime(),
    //         },
    //     ]),
    // );
};

export const createFeed =
    (item: Omit<IFeedInfo, 'id' | 'writer' | 'likeHistory' | 'createdAt'>): IFeedListThunkAction =>
    async (dispatch, getState) => {
        dispatch(createFeedRequest());
        const createdAt = new Date().getTime();
        const userInfo = getState().userInfo.userInfo;
        const pickPhotoUrlList = item.imageUrl.split('/');
        const pickPhotoFileName = pickPhotoUrlList[pickPhotoUrlList.length - 1];
        const putFileUrl = await storage()
            .ref(pickPhotoFileName)
            .putFile(Platform.OS === 'ios' ? item.imageUrl.replace('file://', '') : item.imageUrl)
            .then(result => storage().ref(result.metadata.fullPath).getDownloadURL());
        const feedDB = database().ref('/feed');
        const saveItem: Omit<IFeedInfo, 'id'> = {
            content: item.content,
            writer: {
                name: userInfo?.name ?? 'unknown',
                uid: userInfo?.uid ?? 'unknown',
            },
            imageUrl: putFileUrl,
            likeHistory: [],
            createdAt,
        };
        await feedDB.push().set({
            ...saveItem,
        });
        const lastFeedList: { [key: string]: IFeedInfo } = await feedDB.once('value').then(snapshot => snapshot.val());
        Object.keys(lastFeedList).forEach(key => {
            const _item = lastFeedList[key];
            if (_item.createdAt === createdAt && putFileUrl === _item.imageUrl) {
                dispatch(
                    createFeedSuccess({
                        id: key,
                        content: _item.content,
                        writer: _item.writer,
                        imageUrl: _item.imageUrl,
                        likeHistory: _item.likeHistory ?? [],
                        createdAt,
                    }),
                );
            }
        });
        // await sleep(200);
        // dispatch(
        //     createFeedSuccess({
        //         id: 'ID_01',
        //         content: item.content,
        //         writer: {
        //             name: userInfo?.name ?? 'unknown',
        //             uid: userInfo?.uid ?? 'unknown',
        //         },
        //         imageUrl: item.imageUrl,
        //         likeHistory: [],
        //         createdAt: createdAt,
        //     }),
        // );
    };

export const favoriteFeed =
    (item: IFeedInfo): IFeedListThunkAction =>
    async (dispatch, getState) => {
        dispatch(favoriteFeedRequest());
        const myId = getState().userInfo.userInfo?.uid ?? null;
        if (myId === null) {
            dispatch(favoriteFeedFailure());
            return;
        }
        const feedDB = database().ref(`/feed/${item.id}`);
        const feedItem: IFeedInfo = await feedDB.once('value').then(snapshot => snapshot.val());
        // feed 리소스에 likeHistory가 없으면 추가
        if (typeof feedItem.likeHistory === 'undefined') {
            await feedDB.update({
                likeHistory: [myId],
            });
            dispatch(favoriteFeedSuccess(item.id, myId, 'add'));
        } else {
            const hasMyId = item.likeHistory.filter(likeUserId => likeUserId === myId).length > 0;
            if (hasMyId) {
                // likeHistory에 내 uid 값이 있으면 삭제
                await feedDB.update({
                    likeHistory: feedItem.likeHistory.filter(likeUserId => likeUserId !== myId),
                });
                dispatch(favoriteFeedSuccess(item.id, myId, 'remove'));
            } else {
                // likeHistory에 내 uid 값이 없으면 추가
                await feedDB.update({
                    likeHistory: feedItem.likeHistory.concat([myId]),
                });
                dispatch(favoriteFeedSuccess(item.id, myId, 'add'));
            }
        }
    };

export type IFeedListDispatch = ThunkDispatch<RootState, undefined, IFeedListActions>;
export type IFeedListThunkAction = ThunkAction<void, RootState, undefined, IFeedListActions>;
export type IFeedListActions =
    | ReturnType<typeof getFeedListRequest>
    | ReturnType<typeof getFeedListSuccess>
    | ReturnType<typeof getFeedListFailure>
    | ReturnType<typeof createFeedRequest>
    | ReturnType<typeof createFeedSuccess>
    | ReturnType<typeof createFeedFailure>
    | ReturnType<typeof favoriteFeedRequest>
    | ReturnType<typeof favoriteFeedSuccess>
    | ReturnType<typeof favoriteFeedFailure>;

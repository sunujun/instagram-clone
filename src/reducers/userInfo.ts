import { IFeedInfo, IUserInfo } from 'InstagramClone';
import { GET_MY_FEED_SUCCESS, IUserInfoActions, SET_USER_INFO } from '../actions/user';

export type IUserInfoReducer = {
    userInfo: IUserInfo | null;
    myFeedList: IFeedInfo[];
};

const defaultUserInfoState: IUserInfoReducer = {
    userInfo: null,
    myFeedList: [],
};

export const userInfoReducer = (state = defaultUserInfoState, action: IUserInfoActions) => {
    switch (action.type) {
        case SET_USER_INFO: {
            return {
                ...state,
                userInfo: action.userInfo,
            };
        }
        case GET_MY_FEED_SUCCESS: {
            return {
                ...state,
                myFeedList: action.list,
            };
        }
    }

    return {
        ...state,
    };
};

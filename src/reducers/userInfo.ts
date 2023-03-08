import { IFeedInfo, IUserInfo } from 'InstagramClone';
import { IUserInfoActions, SET_USER_INFO } from '../actions/user';

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
        case SET_USER_INFO:
            return {
                ...state,
            };
    }

    return {
        ...state,
    };
};

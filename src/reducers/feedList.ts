import { IFeedInfo } from 'InstagramClone';
import { GET_FEED_LIST_SUCCESS, IFeedListActions } from '../actions/feed';

export type IFeedListReducer = {
    list: IFeedInfo[];
};

const defaultFeedListState: IFeedListReducer = {
    list: [],
};

export const feedListReducer = (state = defaultFeedListState, action: IFeedListActions) => {
    switch (action.type) {
        case GET_FEED_LIST_SUCCESS:
            return {
                ...state,
            };
    }

    return {
        ...state,
    };
};

import { IFeedInfo } from 'InstagramClone';
import { CREATE_FEED_SUCCESS, FAVORITE_FEED_SUCCESS, GET_FEED_LIST_SUCCESS, IFeedListActions } from '../actions/feed';

export type IFeedListReducer = {
    list: IFeedInfo[];
};

const defaultFeedListState: IFeedListReducer = {
    list: [],
};

export const feedListReducer = (state = defaultFeedListState, action: IFeedListActions) => {
    switch (action.type) {
        case GET_FEED_LIST_SUCCESS: {
            return {
                ...state,
                list: action.list,
            };
        }
        case CREATE_FEED_SUCCESS: {
            return {
                ...state,
                list: state.list.concat([action.item]),
            };
        }
        case FAVORITE_FEED_SUCCESS: {
            return {
                ...state,
                list: state.list.map(item => {
                    if (action.feedId === item.id) {
                        return {
                            ...item,
                            likeHistory:
                                action.action === 'add'
                                    ? item.likeHistory.concat([action.myId])
                                    : item.likeHistory.filter(id => id !== action.myId),
                        };
                    }

                    return { ...item };
                }),
            };
        }
    }

    return {
        ...state,
    };
};

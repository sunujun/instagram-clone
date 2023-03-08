const defaultFeedListState = {
    list: [],
};

export const feedListReducer = (state = defaultFeedListState, action) => {
    return {
        ...state,
    };
};

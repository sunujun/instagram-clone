import { AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { IUserInfoReducer, userInfoReducer } from '../reducers/userInfo';
import { feedListReducer, IFeedListReducer } from '../reducers/feedList';

const rootReducer = combineReducers({
    userInfo: userInfoReducer,
    feedList: feedListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
// export type RootReducer = {
//     userInfo: IUserInfoReducer;
//     feedList: IFeedListReducer;
// };
type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;

export const useAppDispatch = () => useDispatch<TypedDispatch<RootState>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;

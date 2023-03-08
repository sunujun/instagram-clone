import { AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { userInfoReducer } from '../reducers/userInfo';
import { feedListReducer } from '../reducers/feedList';

const rootReducer = combineReducers({
    userInfo: userInfoReducer,
    feedList: feedListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;

export const useAppDispatch = () => useDispatch<TypedDispatch<RootState>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;

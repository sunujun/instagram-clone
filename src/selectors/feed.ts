import { useSelector } from 'react-redux';
import { IFeedInfo } from 'InstagramClone';
import { RootState } from '../store/store';

export const useTotalFeedList = () => useSelector<RootState, IFeedInfo[]>(state => state.feedList.list);

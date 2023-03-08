import { useSelector } from 'react-redux';
import { IUserInfo, IFeedInfo } from 'InstagramClone';
import { RootState } from '../store/store';

export const useMyInfo = () => useSelector<RootState, IUserInfo | null>(state => state.userInfo.userInfo);
export const useMyFeedList = () => useSelector<RootState, IFeedInfo[]>(state => state.userInfo.myFeedList);

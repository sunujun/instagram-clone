import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { favoriteFeed, getFeedList, IFeedListDispatch } from '../actions/feed';
import { FeedListItem } from '../components/FeedListItem';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { useTotalFeedList } from '../selectors/feed';
import { MainTabScreenProps } from '../navigation/types';
import { useMyInfo } from '../selectors/user';

export const HomeScreen = () => {
    const feedList = useTotalFeedList();
    const myInfo = useMyInfo();
    const dispatch = useDispatch<IFeedListDispatch>();
    const navigation = useNavigation<MainTabScreenProps<'Home'>['navigation']>();

    const onPressHome = () => {
        navigation.navigate('AddFeed');
    };

    useEffect(() => {
        dispatch(getFeedList());
    }, [dispatch]);

    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Title title="Home" />
                <Header.Button iconName="add" onPress={onPressHome} />
            </Header>
            <FlatList
                data={feedList}
                renderItem={({ item }) => {
                    const isLiked = item.likeHistory.filter(likeUserId => likeUserId === myInfo?.uid).length > 0;

                    return (
                        <FeedListItem
                            image={item.imageUrl}
                            comment={item.content}
                            isLiked={isLiked}
                            likeCount={item.likeHistory.length}
                            writer={item.writer.name}
                            createdAt={item.createdAt}
                            onPressFeed={() => {}}
                            onPressFavorite={() => {
                                dispatch(favoriteFeed(item));
                            }}
                        />
                    );
                }}
                ItemSeparatorComponent={() => {
                    return <Spacer space={24} />;
                }}
            />
        </View>
    );
};

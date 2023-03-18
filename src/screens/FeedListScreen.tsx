import React from 'react';
import { FlatList, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FeedListItem } from '../components/FeedListItem';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { RootStackScreenProps } from '../navigation/types';
import { useAppDispatch } from '../store/store';
import { favoriteFeed } from '../actions/feed';

export const FeedListScreen = () => {
    const route = useRoute<RootStackScreenProps<'FeedList'>['route']>();
    const navigation = useNavigation<RootStackScreenProps<'FeedList'>['navigation']>();
    const dispatch = useAppDispatch();

    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Title title="FEED LIST" />
                <Header.Button iconName="close" onPress={() => navigation.goBack()} />
            </Header>
            <FlatList
                data={route.params.list}
                renderItem={({ item }) => {
                    return (
                        <FeedListItem
                            image={item.imageUrl}
                            comment={item.content}
                            isLiked={false}
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

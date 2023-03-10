import { useRoute } from '@react-navigation/native';
import React from 'react';
import { FlatList, View } from 'react-native';
import { FeedListItem } from '../components/FeedListItem';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { RootStackScreenProps } from '../navigation/types';

export const FeedListScreen = () => {
    const route = useRoute<RootStackScreenProps<'FeedList'>['route']>();

    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Title title="FEED LIST" />
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
                            onPressFavorite={() => {}}
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

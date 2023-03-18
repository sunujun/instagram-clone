import React, { useEffect, useMemo } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components/Button';
import { Header } from '../components/Header/Header';
import { RemoteImage } from '../components/RemoteImage';
import { useMyFeedList } from '../selectors/user';
import { useAppDispatch } from '../store/store';
import { getMyFeedList } from '../actions/user';

export const MyPageScreen = () => {
    const data = useMyFeedList();
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const { width } = useWindowDimensions();

    const photoSize = useMemo(() => {
        return width / 3;
    }, [width]);

    useEffect(() => {
        dispatch(getMyFeedList());
    }, [dispatch]);

    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Title title="MY PAGE" />
            </Header>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return (
                        <Button onPress={() => navigation.navigate('FeedList', { list: data })}>
                            <RemoteImage url={item.imageUrl} width={photoSize} height={photoSize} />
                        </Button>
                    );
                }}
            />
        </View>
    );
};

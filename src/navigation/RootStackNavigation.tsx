import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabNavigation } from './MainTabNavigation';
import { AddFeedScreen } from '../screens/AddFeedScreen';
import { FeedListScreen } from '../screens/FeedListScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                presentation: 'containedModal',
            }}>
            <Stack.Screen name="MainTab" component={MainTabNavigation} />
            <Stack.Screen name="AddFeed" component={AddFeedScreen} />
            <Stack.Screen name="FeedList" component={FeedListScreen} />
        </Stack.Navigator>
    );
};

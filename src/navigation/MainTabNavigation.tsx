import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { MyPageScreen } from '../screens/MyPageScreen';
import { TabIcon } from '../components/TabIcon';
import { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => {
                const getIconName = () => {
                    if (route.name === 'MyPage') {
                        return 'person';
                    }

                    return 'home';
                };
                const routeIconName = getIconName();

                return {
                    headerShown: false,
                    tabBarIcon: ({ color }) => {
                        return <TabIcon visibleBadge={false} iconName={routeIconName} iconColor={color} />;
                    },
                };
            }}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="MyPage" component={MyPageScreen} />
        </Tab.Navigator>
    );
};

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigation } from './navigation/RootStackNavigation';
import { SplashView } from './SplashView';

export const RootApp = () => {
    const [initialize, setInitialize] = useState(false);

    if (!initialize) {
        return <SplashView onFinishLoad={() => setInitialize(true)} />;
    }

    return (
        <NavigationContainer>
            <RootStackNavigation />
        </NavigationContainer>
    );
};

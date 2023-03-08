import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigation } from './navigation/RootStackNavigation';

export const RootApp = () => {
    const [initialize, setInitialize] = useState(false);

    if (!initialize) {
        return <></>;
    }

    return (
        <NavigationContainer>
            <RootStackNavigation />
        </NavigationContainer>
    );
};

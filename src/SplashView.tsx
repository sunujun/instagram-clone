import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Typography } from './components/Typography';

type SplashViewProps = {
    onFinishLoad: () => void;
};

export const SplashView = ({ onFinishLoad }: SplashViewProps) => {
    useEffect(() => {
        setTimeout(() => {
            onFinishLoad();
        }, 1000);
    }, [onFinishLoad]);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Typography fontSize={36}>SPLASH VIEW</Typography>
        </View>
    );
};

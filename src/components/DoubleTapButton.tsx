import React from 'react';
import { View } from 'react-native';
import { State, TapGestureHandler } from 'react-native-gesture-handler';

export const DoubleTapButton = ({
    children,
    onPressDoubleTap,
}: {
    children: React.ReactNode;
    onPressDoubleTap: () => void;
}) => {
    return (
        <TapGestureHandler
            numberOfTaps={2}
            onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.ACTIVE) {
                    onPressDoubleTap();
                }
            }}>
            <View>{children}</View>
        </TapGestureHandler>
    );
};

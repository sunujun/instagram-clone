import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useAppDispatch } from './store/store';
import { signIn } from './actions/user';

type SplashViewProps = {
    onFinishLoad: () => void;
};

export const SplashView = ({ onFinishLoad }: SplashViewProps) => {
    const dispatch = useAppDispatch();

    const [showLoginButton, setShowLoginButton] = useState(false);

    const appInit = useCallback(async () => {
        try {
            const { idToken } = await GoogleSignin.signInSilently();
            if (idToken !== null) {
                dispatch(signIn(idToken));
                onFinishLoad();
            }
        } catch (e) {
            setShowLoginButton(true);
        }
    }, [dispatch, onFinishLoad]);

    const onPressSignIn = async () => {
        await GoogleSignin.hasPlayServices({
            showPlayServicesUpdateDialog: true,
        });
        const { idToken } = await GoogleSignin.signIn();
        if (idToken !== null) {
            dispatch(signIn(idToken));
            onFinishLoad();
        }
    };

    useEffect(() => {
        appInit();
    }, [appInit]);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {showLoginButton && <GoogleSigninButton onPress={onPressSignIn} />}
        </View>
    );
};

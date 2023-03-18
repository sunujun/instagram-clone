import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import mobileAds, { BannerAd, TestIds, BannerAdSize } from 'react-native-google-mobile-ads';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { RootApp } from './src/RootApp';
import store from './src/store/store';

mobileAds()
    .initialize()
    .then(adapterStatuses => {
        // Initialization complete!
        console.log(adapterStatuses);
    });

function App(): JSX.Element {
    const googleSignInConfigure = () => {
        GoogleSignin.configure({
            webClientId: '135091833054-l3uf3n2eu2h4uk6l24h7a1gcvcnhjput.apps.googleusercontent.com',
        });
    };

    useEffect(() => {
        googleSignInConfigure();
    }, []);

    return (
        <Provider store={store}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaProvider>
                    <RootApp />
                    <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.FULL_BANNER} />
                </SafeAreaProvider>
            </GestureHandlerRootView>
        </Provider>
    );
}

export default App;

// https://nickname33.tistory.com/26 - keystore
// https://developers.google.com/android/guides/client-auth?authuser=0&hl=ko - SHA1
// https://juzero-space.tistory.com/288 - google sign in

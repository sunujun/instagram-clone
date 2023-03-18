import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { RootApp } from './src/RootApp';
import store from './src/store/store';

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
                </SafeAreaProvider>
            </GestureHandlerRootView>
        </Provider>
    );
}

export default App;

// https://nickname33.tistory.com/26 - keystore
// https://developers.google.com/android/guides/client-auth?authuser=0&hl=ko - SHA1
// https://juzero-space.tistory.com/288 - google sign in

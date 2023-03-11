import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootApp } from './src/RootApp';
import store from './src/store/store';

function App(): JSX.Element {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <RootApp />
            </SafeAreaProvider>
        </Provider>
    );
}

export default App;

// https://nickname33.tistory.com/26 - keystore
// https://developers.google.com/android/guides/client-auth?authuser=0&hl=ko - SHA1
// https://juzero-space.tistory.com/288 - google sign in

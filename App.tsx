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

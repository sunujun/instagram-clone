import * as ReactNative from 'react-native';
import { jest } from '@jest/globals';

import 'react-native-gesture-handler/jestSetup';
import 'react-native-google-mobile-ads/jest.config';
import '@react-native-google-signin/google-signin/jest/build/setup';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

enum InitializationState {
    /**
     * The mediation adapter is less likely to fill ad requests.
     */
    AdapterInitializationStateNotReady = 0,
    /**
     * The mediation adapter is ready to service ad requests.
     */
    AdapterInitializationStateReady = 1,
}

type AdapterStatus = {
    name: string;
    description: string;
    state: InitializationState;
};

const mockAdapterStatus: AdapterStatus = {
    name: 'mockName',
    description: 'mockDescription',
    state: InitializationState.AdapterInitializationStateReady,
};

jest.doMock('react-native', () => {
    return Object.setPrototypeOf(
        {
            Platform: {
                OS: 'android',
                select: () => {},
            },
            NativeModules: {
                ...ReactNative.NativeModules,
                RNAppModule: {
                    addListener: jest.fn(),
                    removeListeners: jest.fn(),
                    eventsAddListener: jest.fn(),
                    eventsNotifyReady: jest.fn(),
                },
                RNGoogleMobileAdsModule: {
                    addListener: jest.fn(),
                    removeListeners: jest.fn(),
                    eventsAddListener: jest.fn(),
                    eventsNotifyReady: jest.fn(),
                    interstitialLoad: jest.fn(),
                    initialize: jest.fn<() => Promise<AdapterStatus>>().mockResolvedValue(mockAdapterStatus),
                },
                RNGoogleMobileAdsInterstitialModule: {},
                RNGoogleMobileAdsRewardedModule: {},
                RNGoogleMobileAdsConsentModule: {},
            },
        },
        ReactNative,
    );
});

// 참고: https://github.com/react-navigation/react-navigation/issues/8669
// 참고: https://github.com/react-native-google-signin/google-signin/blob/master/jest/setup.tsx

import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '../components/Header/Header';
import { RootStackScreenProps } from '../navigation/types';
import { Button } from '../components/Button';
import { RemoteImage } from '../components/RemoteImage';
import { Icon } from '../components/Icon';
import { MultiLineInput } from '../components/MultiLineInput';
import { Spacer } from '../components/Spacer';
import { Typography } from '../components/Typography';

export const AddFeedScreen = () => {
    const navigation = useNavigation<RootStackScreenProps<'AddFeed'>['navigation']>();
    const safeAreaInsets = useSafeAreaInsets();

    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
    const [inputMessage, setInputMessage] = useState('');

    const canSave = useMemo(() => {
        if (selectedPhoto === null) {
            return false;
        }
        if (inputMessage === '') {
            return false;
        }

        return true;
    }, [inputMessage, selectedPhoto]);

    const onPressBack = () => {
        navigation.navigate('AddFeed');
    };

    const onPressGetPhoto = () => {};

    const onPressSave = () => {
        if (!canSave) {
            return;
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Title title="ADD FEED" />
                <Header.Button iconName="close" onPress={onPressBack} />
            </Header>
            <View style={{ flex: 1, flexDirection: 'column', paddingHorizontal: 20, paddingTop: 32 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Button>
                        {selectedPhoto !== null ? (
                            <RemoteImage url={selectedPhoto} width={100} height={100} style={{ borderRadius: 4 }} />
                        ) : (
                            <View
                                style={{
                                    width: 100,
                                    height: 100,
                                    backgroundColor: 'lightgray',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 4,
                                }}>
                                <Icon name="add" color="gray" size={32} />
                            </View>
                        )}
                    </Button>
                    <View style={{ flex: 1, marginLeft: 8 }}>
                        <MultiLineInput
                            value={inputMessage}
                            onChangeText={setInputMessage}
                            onSubmitEditing={onPressSave}
                            placeholder="입력해주세요"
                            height={80}
                            fontSize={16}
                        />
                    </View>
                </View>
            </View>
            <Button onPress={onPressSave} disabled={!canSave}>
                <View style={{ backgroundColor: canSave ? 'black' : 'lightgray' }}>
                    <Spacer space={safeAreaInsets.bottom} />
                    <View style={{ height: 52, alignItems: 'center', justifyContent: 'center' }}>
                        <Typography fontSize={18} color={canSave ? 'white' : 'gray'}>
                            저장하기
                        </Typography>
                    </View>
                </View>
            </Button>
        </View>
    );
};

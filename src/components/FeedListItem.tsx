import React, { useRef } from 'react';
import { Animated, useWindowDimensions, View } from 'react-native';
import { getMillisecondToDateString } from '../utils/dateUtils';
import { Button } from './Button';
import { DoubleTapButton } from './DoubleTapButton';
import { Icon } from './Icon';
import { RemoteImage } from './RemoteImage';
import { Spacer } from './Spacer';
import { Typography } from './Typography';

export const FeedListItem = ({
    image,
    isLiked,
    likeCount,
    writer,
    comment,
    createdAt,
    onPressFeed,
    onPressFavorite,
}: {
    image: string;
    isLiked: boolean;
    likeCount: number;
    writer: string;
    comment: string;
    createdAt: number;
    onPressFeed: () => void;
    onPressFavorite: () => void;
}) => {
    const { width } = useWindowDimensions();
    const scaleValue = useRef(new Animated.Value(0)).current;
    const alphaValue = useRef(new Animated.Value(0)).current;

    const onPressDoubleTap = () => {
        if (isLiked) {
            return;
        }
        onPressFavorite();
        scaleValue.setValue(0);
        alphaValue.setValue(1);
        Animated.timing(scaleValue, {
            toValue: 2,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            setTimeout(() => {
                alphaValue.setValue(0);
            }, 1000);
        });
    };

    return (
        <Button onPress={onPressFeed}>
            <DoubleTapButton onPressDoubleTap={onPressDoubleTap}>
                <View style={{ width: width, height: width }}>
                    <RemoteImage url={image} width={width} height={width} />
                    <View
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Animated.View style={{ transform: [{ scale: scaleValue }], opacity: alphaValue }}>
                            <Icon name="heart" size={64} color="white" />
                        </Animated.View>
                    </View>
                </View>
            </DoubleTapButton>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button onPress={onPressFavorite}>
                    <View style={{ paddingHorizontal: 12, paddingVertical: 6 }}>
                        <Icon name={isLiked ? 'heart' : 'heart-outline'} size={20} color={isLiked ? 'red' : 'black'} />
                    </View>
                </Button>
                <Typography fontSize={16} color={'gray'}>
                    {getMillisecondToDateString(createdAt)}
                </Typography>
            </View>
            <View style={{ paddingHorizontal: 12 }}>
                <Typography fontSize={16}>{`좋아요 ${likeCount}개`}</Typography>
                <Spacer space={4} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Typography fontSize={16}>{writer}</Typography>
                    <Spacer space={8} horizontal />
                    <Typography fontSize={16}>{comment}</Typography>
                </View>
            </View>
        </Button>
    );
};

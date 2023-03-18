import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Button } from './Button';
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

    return (
        <Button onPress={onPressFeed}>
            <View style={{ width: width, height: width }}>
                <RemoteImage url={image} width={width} height={width} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button onPress={onPressFavorite}>
                    <View style={{ paddingHorizontal: 12, paddingVertical: 6 }}>
                        <Icon name={isLiked ? 'heart' : 'heart-outline'} size={20} color={isLiked ? 'red' : 'black'} />
                    </View>
                </Button>
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

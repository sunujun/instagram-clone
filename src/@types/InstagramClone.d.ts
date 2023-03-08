declare module 'InstagramClone' {
    export type IFeedInfo = {
        id: string;
        content: string;
        writer: {
            name: string;
            uid: string;
        };
        imageUrl: string;
        likeHistory: string[];
        createdAt: number;
    };
}

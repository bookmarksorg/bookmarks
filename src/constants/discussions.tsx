type DiscussionInfo = {
    title: string;
    description: string;
    author: string;
    comments: number;
    likes: number;
    bookmarks: number;
};

export const discussions: Record<string, DiscussionInfo> = {
    h6s8h0d8b9: {
        title: "Is Punpun actually a bird?",
        description: "I'm not sure if Punpun is a bird or not, does anyone know?",
        author: "Iasminborbita",
        comments: 3241,
        likes: 12034,
        bookmarks: 8091,
    },
    x7v6a9g3j1: {
        title: "Katniss and Peeta should have died",
        description: "I think Katniss and Peeta should have died in the end of the book, what do you think?",
        author: "thegreat_alex",
        comments: 543,
        likes: 2314,
        bookmarks: 1023,
    },
    b8f9k3l1c5: {
        title: "Snape is Harry's father",
        description: "This is a serious description to know if Snape is Harry's father",
        author: "Jorge_pat",
        comments: 143,
        likes: 1832,
        bookmarks: 982,
    },
};

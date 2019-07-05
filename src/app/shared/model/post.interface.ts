export interface Post {
    userId?: string;
    id?: string;
    title?: string;
    category?: string;
    body?: string;
}

export interface Comment {
    postId?: string;
    id?: string;
    name?: string;
    email?: string;
    body?: string;
}

export interface GroupPosts {
    category: string;
    posts: Post[];
}

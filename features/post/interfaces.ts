export interface PostResponse {
  error: string | null,
  data: Post[]
}
export interface Post {
    LikesCount: number;
    hasLiked: boolean;
    image: string | null;
    text: string;
    id: string;
    createdAt: Date;
    user: {
        id: string;
        name: string;
        bio: string | null;
        coverImage: string | null;
        createdAt: Date | null;
        username: string;
        avatarUrl: string | null;
    };
}
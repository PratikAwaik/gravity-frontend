import { Direction } from "./utils";

export enum PostType {
  TEXT = "TEXT",
  MEDIA = "MEDIA",
  ARTICLE = "ARTICLE",
}

export enum MediaType {
  IMAGE = "image",
  VIDEO = "video",
}

export interface Post {
  id: string;
  title: string;
  content: string;
  score: number;
  // should be of type Author/User
  author: {
    id: string;
    prefixedName: string;
  };
  community: {
    id: string;
    prefixedName: string;
    icon: string;
  };
  postScores: [PostScore];
  type: PostType;
  mediaType: MediaType;
  articleImage: string;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PostScore {
  userId: string;
  direction: Direction;
}

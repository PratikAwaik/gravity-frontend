import { ICommunity } from "./community";
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

export interface IPost {
  id: string;
  title: string;
  content: string;
  score: number;
  // should be of type Author/User
  author: {
    id: string;
    prefixedName: string;
  };
  community: ICommunity;
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

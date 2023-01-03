import { Direction } from "./utils";

export interface IComment {
  author: {
    id: string;
    profilePic: string | null;
    username: string;
  };
  children: IComment[];
  commentScores: CommentScore[] | null;
  content: string;
  createdAt: string;
  deleted: boolean;
  id: string;
  postId: string;
  parentId: string | null;
  score: number;
  updatedAt: string;
}

export interface CommentScore {
  userId: string;
  direction: Direction;
}

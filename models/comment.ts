import {IIcon} from "./common";
import {IPost} from "./post";
import {Direction} from "./utils";

export interface IComment {
  author: {
    id: string;
    icon: IIcon;
    username: string;
  };
  children: IComment[];
  commentScores: ICommentScore[] | null;
  content: string;
  deleted: boolean;
  id: string;
  postId: string;
  parentId: string | null;
  score: number;
  createdAt: number;
  updatedAt: number;
  post: IPost | null;
}

export interface ICommentScore {
  userId: string;
  direction: Direction;
}

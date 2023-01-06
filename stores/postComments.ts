import create from "zustand";
import { IComment } from "../models/comment";

interface IPostCommentsStore {
  postComments: IComment[];
  setPostComments: (postComments: IComment[]) => void;
  postCommentsCount: number;
  setPostCommentsCount: (postCommentsCount: number) => void;
}

export const usePostCommentsStore = create<IPostCommentsStore>((set) => ({
  postComments: [],
  setPostComments: (postComments: IComment[]) => set({ postComments }),
  postCommentsCount: 0,
  setPostCommentsCount: (postCommentsCount: number) =>
    set({ postCommentsCount: postCommentsCount }),
}));

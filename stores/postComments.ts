import create from "zustand";
import { IComment } from "../models/comment";

interface PostCommentsStoreProps {
  postComments: IComment[];
  setPostComments: (postComments: IComment[]) => void;
}

export const usePostCommentsStore = create<PostCommentsStoreProps>((set) => ({
  postComments: [],
  setPostComments: (postComments: IComment[]) => set({ postComments }),
}));

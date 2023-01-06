import create from "zustand";
import { IPost } from "../models/post";

interface IPostsStore {
  homePageNo: number;
  setHomePageNo: (homePageNo: number) => void;
  homeHasMore: boolean;
  setHomeHasMore: (homeHasMore: boolean) => void;
}

export const usePostsStore = create<IPostsStore>((set) => ({
  homePageNo: 0,
  setHomePageNo: (homePageNo: number) => set({ homePageNo }),
  homeHasMore: true,
  setHomeHasMore: (homeHasMore: boolean) => set({ homeHasMore }),
}));

import create from "zustand";
import { IPost } from "../models/post";

interface IPostsStore {
  homePageNo: number;
  setHomePageNo: (homePageNo: number) => void;
  homeHasMore: boolean;
  setHomeHasMore: (homeHasMore: boolean) => void;
  feed: IPost[];
  setFeed: (feed: IPost[]) => void;
}

export const usePostsStore = create<IPostsStore>((set) => ({
  homePageNo: 0,
  setHomePageNo: (homePageNo: number) => set({ homePageNo }),
  homeHasMore: true,
  setHomeHasMore: (homeHasMore: boolean) => set({ homeHasMore }),
  feed: [],
  setFeed: (feed: IPost[]) => set({ feed }),
}));

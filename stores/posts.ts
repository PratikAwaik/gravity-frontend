import create from "zustand";
import { IPost } from "../models/post";

interface IPostsStore {
  homePageNo: number;
  setHomePageNo: (homePageNo: number) => void;
  homeHasMore: boolean;
  setHomeHasMore: (homeHasMore: boolean) => void;
  communityPageNo: number;
  setCommunityPageNo: (communityPageNo: number) => void;
  communityHasMore: boolean;
  setCommunityHasMore: (communityHasMore: boolean) => void;
}

export const usePostsStore = create<IPostsStore>((set) => ({
  homePageNo: 0,
  setHomePageNo: (homePageNo: number) => set({ homePageNo }),
  homeHasMore: true,
  setHomeHasMore: (homeHasMore: boolean) => set({ homeHasMore }),
  communityPageNo: 0,
  setCommunityPageNo: (communityPageNo: number) => set({ communityPageNo }),
  communityHasMore: true,
  setCommunityHasMore: (communityHasMore: boolean) => set({ communityHasMore }),
}));

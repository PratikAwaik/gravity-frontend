import create from "zustand";

interface IPostsStore {
  homePageNo: number;
  setHomePageNo: (homePageNo: number) => void;
  homeHasMore: boolean;
  setHomeHasMore: (homeHasMore: boolean) => void;
  communityPageNo: number;
  setCommunityPageNo: (communityPageNo: number) => void;
  communityHasMore: boolean;
  setCommunityHasMore: (communityHasMore: boolean) => void;
  userPageNo: number;
  setUserPageNo: (userPageNo: number) => void;
  userHasMore: boolean;
  setUserHasMore: (userHasMore: boolean) => void;
  searchPageNo: number;
  setSearchPageNo: (searchPageNo: number) => void;
  searchHasMore: boolean;
  setSearchHasMore: (searchHasMore: boolean) => void;
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
  userPageNo: 0,
  setUserPageNo: (userPageNo: number) => set({ userPageNo }),
  userHasMore: true,
  setUserHasMore: (userHasMore: boolean) => set({ userHasMore }),
  searchPageNo: 0,
  setSearchPageNo: (searchPageNo: number) => set({ searchPageNo }),
  searchHasMore: true,
  setSearchHasMore: (searchHasMore: boolean) => set({ searchHasMore }),
}));

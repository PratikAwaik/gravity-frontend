import create from "zustand";

interface ICommunityStore {
  searchCommunityPageNo: number;
  setSearchCommunityPageNo: (searchCommunityPageNo: number) => void;
  searchCommunityHasMore: boolean;
  setSearchCommunityHasMore: (searchCommunityHasMore: boolean) => void;
}

export const useCommunityStore = create<ICommunityStore>((set) => ({
  searchCommunityPageNo: 0,
  setSearchCommunityPageNo: (searchCommunityPageNo: number) =>
    set({ searchCommunityPageNo }),
  searchCommunityHasMore: true,
  setSearchCommunityHasMore: (searchCommunityHasMore: boolean) =>
    set({ searchCommunityHasMore }),
}));

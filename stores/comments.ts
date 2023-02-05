import create from "zustand";

interface ICommentsStore {
  userCommentsPageNo: number;
  setUserCommentsPageNo: (userCommentsPageNo: number) => void;
  userCommentsHasMore: boolean;
  setUserCommentsHasMore: (userCommentsHasMore: boolean) => void;
  searchCommentsPageNo: number;
  setSearchCommentsPageNo: (searchCommentsPageNo: number) => void;
  searchCommentsHasMore: boolean;
  setSearchCommentsHasMore: (searchCommentsHasMore: boolean) => void;
}

export const useCommentsStore = create<ICommentsStore>((set) => ({
  userCommentsPageNo: 0,
  setUserCommentsPageNo: (userCommentsPageNo: number) =>
    set({ userCommentsPageNo }),
  userCommentsHasMore: true,
  setUserCommentsHasMore: (userCommentsHasMore: boolean) =>
    set({ userCommentsHasMore }),
  searchCommentsPageNo: 0,
  setSearchCommentsPageNo: (searchCommentsPageNo: number) =>
    set({ searchCommentsPageNo }),
  searchCommentsHasMore: true,
  setSearchCommentsHasMore: (searchCommentsHasMore: boolean) =>
    set({ searchCommentsHasMore }),
}));

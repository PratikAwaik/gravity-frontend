import create from "zustand";

interface IUsersStore {
  searchUsersPageNo: number;
  setSearchUsersPageNo: (searchUsersPageNo: number) => void;
  searchUsersHasMore: boolean;
  setSearchUsersHasMore: (searchUsersHasMore: boolean) => void;
}

export const useUsersStore = create<IUsersStore>((set) => ({
  searchUsersPageNo: 0,
  setSearchUsersPageNo: (searchUsersPageNo: number) =>
    set({ searchUsersPageNo }),
  searchUsersHasMore: true,
  setSearchUsersHasMore: (searchUsersHasMore: boolean) =>
    set({ searchUsersHasMore }),
}));

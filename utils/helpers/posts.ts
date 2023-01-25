import StorageService from "../../services/storage";
import { LOCAL_STORAGE_KEYS } from "../constants";

export const storeScrollPosition = (
  isPostDetail: boolean,
  isCommunityPosts: boolean,
  isUserPosts: boolean
) => {
  if (isPostDetail) return;
  let localStorageKey = LOCAL_STORAGE_KEYS.HOME_SCROLL_POSITION;
  if (isCommunityPosts)
    localStorageKey = LOCAL_STORAGE_KEYS.COMMUNITY_SCROLL_POSITION;
  else if (isUserPosts)
    localStorageKey = LOCAL_STORAGE_KEYS.USER_SCROLL_POSITION;
  StorageService.setItem(localStorageKey, window.pageYOffset.toString());
};

export const scrollToPreviousPosition = (localStorageKey: string) => {
  const yPosition = StorageService.getItem(localStorageKey);
  if (yPosition) {
    window.scrollTo(0, parseInt(yPosition) - 50);
    StorageService.removeItem(localStorageKey);
  }
};

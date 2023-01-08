import StorageService from "../../services/storage";
import { LOCAL_STORAGE_KEYS } from "../constants";

export const storeScrollPosition = () => {
  StorageService.setItem(
    LOCAL_STORAGE_KEYS.SCROLL_POSITION,
    window.pageYOffset.toString()
  );
};

export const scrollToPreviousPosition = () => {
  const yPosition = StorageService.getItem(LOCAL_STORAGE_KEYS.SCROLL_POSITION);
  if (yPosition) {
    window.scrollTo(0, parseInt(yPosition) - 50);
    StorageService.removeItem(LOCAL_STORAGE_KEYS.SCROLL_POSITION);
  }
};

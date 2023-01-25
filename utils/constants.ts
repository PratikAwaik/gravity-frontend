export const PAGES = {
  INDEX: "/",
  CREATE_POST: "/create/post",
  LOGIN: "/login",
  REGISTER: "/register",
  CREATE_COMMUNITY: "/create/community",
  COMMUNITY_DETAIL: "/community/*",
  POST_DETAIL: "/posts/*",
  NOT_FOUND: "/404",
};

export const getPostDetailPath = (id: string) => `/posts/${id}`;

export const getCommunityDetailPath = (name: string) => `/community/${name}`;

export const getUserDetailPath = (name: string) => `/user/${name}`;

export const AUTH = {
  PAGES: [PAGES.LOGIN, PAGES.REGISTER],
  PAGES_TO_EXCLUDE: [
    PAGES.LOGIN,
    PAGES.REGISTER,
    PAGES.INDEX,
    PAGES.COMMUNITY_DETAIL,
    PAGES.POST_DETAIL,
  ],
};

export const LOCAL_STORAGE_KEYS = {
  CURRENT_USER: "__gravity_current_user__",
  HOME_SCROLL_POSITION: "__gravity_home_scroll_position__",
  COMMUNITY_SCROLL_POSITION: "__gravity_community_scroll_position__",
  USER_SCROLL_POSITION: "__gravity_user_scroll_position__",
  USER_COMMENTS_SCROLL_POSITION: "__gravity_user_comments_scroll_position__",
};

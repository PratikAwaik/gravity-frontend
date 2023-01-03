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

export const getCommunityDetailPath = (id: string) => `/community/${id}`;

export const getUserDetailPath = (id: string) => `/user/${id}`;

export const AUTH = {
  LS_CURRENT_USER_KEY: "__gravity_current_user__",
  PAGES: [PAGES.LOGIN, PAGES.REGISTER],
  PAGES_TO_EXCLUDE: [
    PAGES.LOGIN,
    PAGES.REGISTER,
    PAGES.INDEX,
    PAGES.COMMUNITY_DETAIL,
    PAGES.POST_DETAIL,
  ],
};

export interface IUser {
  id: string;
  name: string;
  username: string;
  prefixedName: string;
}

export enum UserTabsTypes {
  POSTS = "posts",
  COMMENTS = "comments",
}

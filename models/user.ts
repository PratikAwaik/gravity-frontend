export interface IUser {
  id: string;
  name: string;
  username: string;
  prefixedName: string;
  karma: number;
  profilePic: string | null;
}

export enum UserTabsTypes {
  POSTS = "posts",
  COMMENTS = "comments",
}

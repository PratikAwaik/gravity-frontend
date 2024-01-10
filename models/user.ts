import {IIcon} from "./common";

export interface IUser {
  id: string;
  name: string;
  username: string;
  prefixedName: string;
  karma: number;
  icon: IIcon;
}

export enum UserTabsTypes {
  POSTS = "posts",
  COMMENTS = "comments",
}

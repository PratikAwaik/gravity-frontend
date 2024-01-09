import {IUser} from "./user";

export interface ICommunity {
  id: string;
  name: string;
  prefixedName: string;
  icon: ICommunityIcon;
  description: string;
  members: IUser[];
  membersCount: number;
  admin: IUser;
  createdAt: number;
}

export interface ICommunityIcon {
  url: string;
  publicId?: string;
}

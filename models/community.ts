import { IUser } from "./user";

export interface ICommunity {
  id: string;
  prefixedName: string;
  icon: string;
  members: IUser[];
}

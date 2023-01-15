import { IUser } from "./user";

export interface ICommunity {
  id: string;
  name: string;
  prefixedName: string;
  icon: string;
  description: string;
  members: IUser[];
  createdAt: number;
}

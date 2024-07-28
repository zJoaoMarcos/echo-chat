import { IChat, Message } from "./Message";

export interface IContact { 
  _id: string;
  name: string;
  avatar?: string;
  email: string;
  phone: string;
  contact_name: string;
}

export interface IUser {
  _id: string;
  name: string;
  avatar?: string;
  phone: string;
  email: string;
  contacts: IContact[]
  chats: IChat[]
}
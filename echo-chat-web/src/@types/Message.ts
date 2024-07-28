import { IUser } from "./User";

export enum MessageTypes { 
  TEXT = "TEXT",
  AUDIO = "AUDIO",
  FILE = "FILE",
  PHOTO = "PHOTO",
  VIDEO = "VIDEO",
}

export interface Message {
  _id: string;
  message: string;
  recipient_id: string;
  sender_id: {
    _id: string;
    name: string;
    phone: string;
  };
  type: MessageTypes;
  send_in: Date;
  createdAt: Date
}

export enum ChatTypes {
  DIRECT_MESSAGES = "DIRECT_MESSAGES",
  GROUP = "GROUP",
}

export interface IChat { 
  _id: string;
  messages: Message[];
  users: IUser[];
  chat_type: ChatTypes;
  name: string;
}
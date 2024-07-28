import { Document, PopulatedDoc, Schema, model } from "mongoose";
import { IMessage } from "./message-model";
import { IUser } from "../users/user-model";

export enum ChatTypes {
  DIRECT_MESSAGES = "DIRECT_MESSAGES",
  GROUP = "GROUP",
}

export interface IChat extends Document {
  users: PopulatedDoc<IUser & Document>[];
  messages: PopulatedDoc<IMessage & Document>[];
  chat_type: ChatTypes;
}

const chatSchema = new Schema<IChat>(
  {
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId, 
        ref: "Message",
      },
    ],
    chat_type: { type: String, enum: ChatTypes },
  },
  { timestamps: true }
);

export const ChatModel = model<IChat>("Chat", chatSchema);

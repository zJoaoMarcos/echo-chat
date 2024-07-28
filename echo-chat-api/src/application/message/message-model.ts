import { Document, PopulatedDoc, Schema, model } from "mongoose";

export enum MessageTypes { 
  TEXT = "TEXT",
  AUDIO = "AUDIO",
  FILE = "FILE",
  PHOTO = "PHOTO",
  VIDEO = "VIDEO",
}

export interface IMessage extends Document {
  message: string;
  recipient_id: Schema.Types.ObjectId;
  sender_id: Schema.Types.ObjectId;
  type: MessageTypes;
  send_in: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    message: { type: String, required: true },
    recipient_id: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
    sender_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: MessageTypes, required: true },
  },
  { timestamps: true }
);

export const MessageModel = model<IMessage>("Message", messageSchema);

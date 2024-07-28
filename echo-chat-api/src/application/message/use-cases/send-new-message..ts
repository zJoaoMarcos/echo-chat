import { UserModel } from "../../users/user-model";
import { ChatModel } from "../chat-model";
import { MessageModel, MessageTypes } from "../message-model";

interface Input { 
  message: string;
  sender_id: string;
  recipient_id: string;
  type: MessageTypes;
}

export class SendNewMessageUseCase { 
  async execute({ recipient_id, message, sender_id, type } : Input) { 
    const chat = await ChatModel.findOne({ _id: recipient_id }).populate({
      path: "messages",
      populate: {
        path: "sender_id",
        select: "-contacts -password -__v",
      },
    });

    if (!chat) {
      return;
    }

    const senderId = await UserModel.findById(
      sender_id,
      "-contacts -passwords -__v"
    );

    const newMessage = new MessageModel({
      message,
      sender_id,
      recipient_id,
      type,
    });

    const newMessageInserted = await newMessage.save()
    chat.messages.push(newMessage._id);
    await chat.save();

    const newMessageObject = newMessageInserted.toObject();

    return {
      ...newMessageObject,
      sender_id: senderId,
    }
  }
}
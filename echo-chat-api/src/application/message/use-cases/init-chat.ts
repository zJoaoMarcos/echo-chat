import { Types } from "mongoose";
import { ChatModel, ChatTypes, IChat } from "../chat-model";

interface Input {
  userIds: string[];
  chat_type: ChatTypes;
}

export class InitChatUseCase {
  async execute({ userIds, chat_type }: Input) {
    const usersMapped = userIds.map((ids) => new Types.ObjectId(ids));

    const chat = await ChatModel.findOne({
      users: usersMapped ,
      chat_type,
    }).populate({
      path: "messages",
      populate: {
        path: "sender_id",
        select: "-contacts -password -__v",
      },
    });

    if (chat) return chat 
    
    const newChat = new ChatModel({
      users: usersMapped,
      chat_type,
    });
    newChat.save();

    return newChat
  }
}

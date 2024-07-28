import { UserModel } from "../../users/user-model";
import { ChatModel, ChatTypes } from "../chat-model";

interface Input {
  userId: string;
  contactId: string;
}

export class GetDirectChatUseCase {
  async execute({ userId, contactId }: Input) {
    const user = await UserModel.findById(userId);

    if (!user) throw new Error("user not found.");

    const chat = await ChatModel.findOne({
      users: [user._id, contactId],
      chat_type: ChatTypes.DIRECT_MESSAGES,
    })
      .populate({
        path: "messages",
        populate: {
          path: "sender_id",
          select: "-contacts -password -__v",
        },
      })
      .populate({ path: "users", select: "-contacts -password" });

    return {
      chat,
    };
  }
}

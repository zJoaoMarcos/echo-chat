import { UserModel } from "../../users/user-model";
import { ChatModel } from "../chat-model";

interface Input { 
  userId: string;
} 

export class GetChatsUseCase { 
  async execute({ userId }: Input) {
    const user = await UserModel.findById(userId)

    if (!user) throw new Error('user not found.')
    
    const chats = await ChatModel.find({ users: { $in: user._id }})

    return {
      chats
    }
  }
}
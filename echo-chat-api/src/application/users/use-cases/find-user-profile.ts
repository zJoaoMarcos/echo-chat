import { ChatModel } from "../../message/chat-model";
import { UserModel } from "../user-model";

interface Input {
  id: string;
}

export class FindUserProfileUseCase {
  async execute({ id }: Input) {
    const user = await UserModel.findById(id, "-password").populate({
      path: "contacts._id",
      select: " -password -contacts -__v",
    });

    if (!user) throw new Error("user not found.");

    const contacts = user.contacts.map(({ _id, contact_name }) => {
      return {
        ..._id.toObject(),
        contact_name,
      };
    });

    const chats = await ChatModel.find({
      users: user._id /* , messages: { $exists: true, $ne: [] } */,
    }).populate("users", ["-contacts", "-password"]);

    const userObject = user.toObject();

    return {
      user: { ...userObject, contacts, chats },
    };
  }
}

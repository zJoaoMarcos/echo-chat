import { ChatModel } from "../../message/chat-model";
import { UserModel } from "../user-model";

interface Input {
  userId: string;
  newContact: {
    name: string;
    phone: string;
  };
}

export class AddContactUseCase {
  async execute({ userId, newContact }: Input) {
    const user = await UserModel.findById(userId);

    if (!user) throw new Error("user not found");

    const contact = await UserModel.findOne({ phone: newContact.phone });

    if (!contact) throw new Error("phone not found.");

    const doesContactExistsInContactsLists = user.contacts.find(
      (existingContact) => existingContact._id.equals(contact._id)
    );

    if (doesContactExistsInContactsLists)
      throw new Error("contact already exists in contacts list");

    user.contacts.push({
      _id: contact._id,
      contact_name: contact.name,
    });
    user.save();

    const userObject = user.toObject();

    return {
      contacts: userObject.contacts,
    };
  }
}

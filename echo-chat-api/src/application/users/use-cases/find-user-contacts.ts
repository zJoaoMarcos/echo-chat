import { UserModel } from "../user-model"

interface Input { 
  userId: string;
}

export class FindUserContactsUseCase { 
  async execute({ userId }: Input) { 
    const user = await UserModel.findById(userId)

    if (!user) throw new Error('user not found.')

    const contacts = user.toObject().contacts

    return { 
      contacts
    }
  } 
}
import * as bcrypt from 'bcrypt'

import { UserModel } from "../user-model";

interface Input {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  password: string;
}

export class RegisterNewUserUseCase {
  async execute({name, email, phone, avatar, password }: Input) {

    const userAlreadyExists = await UserModel.findOne({ $or: [{ name }, { phone }] })

    if (userAlreadyExists) throw new Error('e-mail already exists.')

    const passwordHashed = await bcrypt.hash(password, 10)

    const user = new UserModel({
      name,
      email,
      phone,
      avatar,
      password: passwordHashed,
    })
    user.save() 
    
    const userObject = user.toObject()

    return {
      user: { ...userObject, password: undefined },
    };
  }
}
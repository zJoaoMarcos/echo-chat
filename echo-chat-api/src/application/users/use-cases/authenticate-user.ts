import * as bcrypt from "bcrypt";

import { UserModel } from "../user-model";

interface Input {
  identifier: string;
  password: string;
}

export class AuthenticateUserUseCase {
  async execute({ identifier, password }: Input) {
    let user;

    if (identifier.includes("@")) {
      user = await UserModel.findOne({ email: identifier });

      if (!user) throw new Error("invalid credentials.");
    } else {
      user = await UserModel.findOne({ phone: identifier });

      if (!user) throw new Error("invalid credentials.");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new Error("invalid credentials.");

    const userObject = user.toObject()

    return {
      user: { ...userObject, password: undefined },
    };
  }
}

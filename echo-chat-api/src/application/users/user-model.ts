import { Document, PopulatedDoc, Schema, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  avatar: string;
  phone: string;
  password: string;
  contacts: {
    contact_name: string;
    _id: PopulatedDoc<IUser & Document>;
  }[];
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contacts: [
    {
      type: {
        _id: { type: Schema.Types.ObjectId, default: null, ref: "User" },
        contact_name: { type: String, required: true },
      },
    },
  ],
});

export const UserModel = model<IUser>("User", userSchema);

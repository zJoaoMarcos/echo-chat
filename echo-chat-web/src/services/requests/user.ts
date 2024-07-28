import { IUser } from "@/@types/User";
import { api } from "../api";
import { IChat } from "@/@types/Message";

interface SignInRequest { 
  identifier: string;
  password: string;
}

interface SignInResponse { 
  user: IUser;
  accessToken: string;
}

export async function SignIn({ identifier, password }: SignInRequest) { 

  try {
    const res = await api.post<SignInResponse>("/users/auth", {
      identifier,
      password,
    });

    return res.data
  } catch (error) {
    console.log(error)
    throw new Error('Falha tente novamente.')
  }
}

interface SignUpRequest {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  password: string;
}

export async function SignUpUser(data: SignUpRequest) {
  const { name, email, phone, avatar, password } = data

  try {
    const res = await api.post('/users', { 
      name,
      email, 
      phone,
      avatar,
      password,
     })

    return res.data
  } catch (error) {
    console.log(error)
    throw new Error('Falha tente novamente.')
  }
}

interface GetUserProfileResponse {
  user: IUser;
}

export async function getUserProfile() { 
  try {
    const res = await api.get<GetUserProfileResponse>('/users/me')
    
    return res.data
  } catch (error) {
    console.log(error)
    throw new Error('Falha tente novamente.')
  }
}

interface GetDirectChatRequest { 
  contactId: string;
}

export async function getDirectChat({ contactId }: GetDirectChatRequest) {
  try {
    const res = await  api.get<IChat | null>(`/chats/direct/${contactId}`)

    return res.data
  } catch (error) { 
    console.log(error)
    throw new Error('Falha tente novamente.')
  } 
}

interface AddContactRequest { 
  contact : {
    name: string;
    phone: string;
  }
}

export async function addContact({ contact }: AddContactRequest) { 
  try {
    const res = await api.post("/users/contact", {
      contact
    });

    return res.data
  } catch (error) {
    console.log(error)
    throw new Error('Falha tente novamente.')
  }
}
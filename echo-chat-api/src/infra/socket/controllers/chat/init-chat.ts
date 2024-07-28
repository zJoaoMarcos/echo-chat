import { Server, Socket } from "socket.io";
import { ChatTypes } from "../../../../application/message/chat-model";
import { InitChatUseCase } from "../../../../application/message/use-cases/init-chat";

interface Input {
  users: string[];
  chat_type: ChatTypes;
}

export async function initChatController(socket: Socket, io: Server) {
  socket.on("init_chat", async (data: Input) => {
    const { users, chat_type } = data;

    const initChatUseCase = new InitChatUseCase()

    const chat = await initChatUseCase.execute({ userIds: users, chat_type })

    socket.join(chat._id);
    if (chat.messages) io.emit("previousMessages", chat.messages);
  });
}

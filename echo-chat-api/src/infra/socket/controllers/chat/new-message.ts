import { Server, Socket } from "socket.io";
import { MessageTypes } from "../../../../application/message/message-model";
import { SendNewMessageUseCase } from "../../../../application/message/use-cases/send-new-message.";

interface Input {
  message: string;
  sender_id: string;
  recipient_id: string;
  type: MessageTypes;
}

export async function newMessageController(socket: Socket, io: Server) {
  socket.on("newMessage", async (data: Input) => {
    const { message, sender_id, recipient_id, type } = data;

    const sendNewMessageUseCase = new SendNewMessageUseCase()

    const newMessage = await sendNewMessageUseCase.execute({ message, sender_id, recipient_id, type })

    io.emit("newMessage", { 
      ...newMessage,
    });
  });
}

import { ChatTypes, IChat, Message } from "@/@types/Message";
import { useAuth } from "@/contexts/auth";
import React from "react";
import { Socket, io } from "socket.io-client";
import { ChatHeader } from "./header";
import { ChatFooter } from "./footer";
import { ChatMessages } from "./messages";

interface ChatProps {
  chat: IChat | null | undefined;
  contactId: string;
}

export function Chat(props: ChatProps) {
  const { chat, contactId } = props;

  const [messages, setMessages] = React.useState<Message[]>(
    chat?.messages || []
  );
  const socketConnection = React.useRef<Socket<any> | null>(null);

  const { user: currentUser } = useAuth();
  const contact = currentUser?.contacts.find(contact => contact._id === contactId)


  React.useEffect(() => {
    function onConnect() {
      const socket = io("http://localhost:3001");

      socket.emit("init_chat", {
        users: [currentUser?._id, contact?._id],
        chat_type: ChatTypes.DIRECT_MESSAGES,
      });

      socketConnection.current = socket;
    }

    if (currentUser) onConnect();

    socketConnection.current?.on('previousMessages', (messages: Message[]) => {
      setMessages(messages)
    })

    socketConnection.current?.on("newMessage", (message: Message) => {
      setMessages(prev => [...(prev), message]);
    });

    return () => {
      socketConnection.current?.disconnect();
    };
  }, [currentUser, contact]);


  return (
    <div className="w-full min-h-full flex flex-col justify-between bg-stone-50 rounded-e-lg">
      <ChatHeader contactName={contact?.name} />

      <ChatMessages messages={messages} />

      <ChatFooter chat={chat} socket={socketConnection} />
    </div>
  );
}

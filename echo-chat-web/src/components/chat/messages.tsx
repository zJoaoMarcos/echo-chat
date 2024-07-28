import { useAuth } from "@/contexts/auth";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Message as IMessage } from "@/@types/Message";
import { Message } from "./message";

interface ChatMessagesProps {
  messages: IMessage[] | [];
}

export function ChatMessages(props: ChatMessagesProps) {
  const { messages } = props;

  const { user } = useAuth();

  if (!messages) {
    return <p>carregando...</p>;
  }

  return (
    <ScrollArea>
      <section className="max-h-[85vh] flex flex-col gap-2 py-2 px-8">
        
        {/* <p className="text-center text-xs text-stone-500">Hoje, 15 Abril</p> */}

        {!!messages.length &&
          messages.map((message) => {
            const messageType =
            message?.sender_id?._id === user?._id ? "sent" : "received";
            
            return (
              <Message key={message._id} message={message} type={messageType} />
            );
          })}
          </section>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}

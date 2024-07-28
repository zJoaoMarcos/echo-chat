import { Message as IMessage } from "@/@types/Message";

interface MessageProps {
  type: "sent" | "received";
  message: IMessage;
}

const MessageStyle = {
  sent: { 
    container: "ml-auto flex-row",
    content: "items-end",
    bubble: "rounded-xl rounded-tr-none"
  },
  received: { 
    container: "mr-auto flex-row-reverse",
    content: "items-start",
    bubble: "rounded-xl rounded-tl-none"
  },
};

export function Message(props: MessageProps) {
  const { type, message } = props;

  const style = MessageStyle[type];

  const messageDate = new Date(message?.createdAt);

  return (
    <div className={`${style.container} flex flex-row  gap-2 text-xs`}>
        <div className={`flex flex-col gap-1  ${style.content}`}>
          <div className={` `}>
          <p>
            {" "}
            {new Intl.DateTimeFormat("pt-BR", {
              hour: "numeric",
              minute: "numeric",
            }).format(messageDate)}{" "}
          </p>
        </div>
        <p className={`${style.bubble} px-3.5 py-2 bg-stone-200  justify-start items-center gap-3 inline-flex`}>
          {message?.message}
        </p>
      </div>
    </div>
  );
}

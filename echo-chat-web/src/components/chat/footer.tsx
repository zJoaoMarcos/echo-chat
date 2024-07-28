import { useAuth } from "@/contexts/auth";
import { MutableRefObject } from "react";
import { Socket } from "socket.io-client";
import { Input } from "../ui/input";
import { Mic, Paperclip, Send, Smile } from "lucide-react";
import { IChat, MessageTypes } from "@/@types/Message";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonIcon } from "../ui/button-icon";

interface ChatFooterProps {
  socket: MutableRefObject<Socket<any, any> | null>;
  chat: IChat | null | undefined;
}

const sendMessageSchema = z.object({
  message: z.string(),
  sender_id: z.string(),
  recipient_id: z.string(),
  type: z.string(),
});

type SendMessageData = z.infer<typeof sendMessageSchema>;

export function ChatFooter(props: ChatFooterProps) {
  const { socket, chat } = props;
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    resetField,
    getValues,
    formState: { errors },
  } = useForm<SendMessageData>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      sender_id: user?._id,
      recipient_id: chat?._id,
      type: MessageTypes.TEXT,
    },
  });

  function handleSendMessage(data: SendMessageData) {
    const message = getValues("message");

    if (message !== "") {
      socket.current?.emit("newMessage", {
        ...data,
      });

      resetField("message");
    }
  }

  return (
    <footer className="px-3 py-4 border-t">
      {/*  <div className="pl-1 flex flex-row gap-1 items-center mb-2">
        <Avatar className="w-4 h-4">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>JM</AvatarFallback>
        </Avatar>
        <p className="text-xs text-stone-600">Jonas Brother está escrevendo...</p>
      </div> */}

      <form
        onSubmit={handleSubmit(handleSendMessage)}
        className="flex flex-row items-center justify-between border rounded-md"
      >
        <Input
          {...register("message")}
          placeholder="Escreva uma mensagem..."
          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />

        <div className="flex flex-row items-center gap-2 px-4 text-stone-600">
          {/*  <Paperclip className="w-4 h-4 hover:text-emerald-500 transition-colors  hover:cursor-pointer" />
          <Smile className="w-4 h-4 hover:text-emerald-500 transition-colors  hover:cursor-pointer" />
          <Mic className="w-4 h-4 hover:text-emerald-500 transition-colors  hover:cursor-pointer" /> */}
          {" | "}
          <ButtonIcon type="submit" icon={Send} />
        </div>
      </form>
    </footer>
  );
}

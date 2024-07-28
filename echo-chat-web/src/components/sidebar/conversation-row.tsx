"use client";

import Link from "next/link";
import { Contact, MessageCircle, MessageSquare, Users } from "lucide-react";

import { IChat } from "@/@types/Message";
import { useAuth } from "@/contexts/auth";
import { Avatar } from "../ui/avatar";

interface ConversationRowProps {
  chat: IChat;
}

export function ConversationRow(props: ConversationRowProps) {
  const { chat } = props;

  const { user: currentUser } = useAuth();

  if (chat.chat_type === "GROUP") {
    return (
      <Link
        href={`/chats/group/${chat._id}`}
        className="flex flex-row items-center justify-start gap-2 p-2 border-b hover:bg-stone-100 hover:cursor-auto"
      >
        <Avatar className="w-6 h-6 shadow-xl">
          <Users />
        </Avatar>

        <p className="text-xs">{chat.name}</p>
      </Link>
    );
  } else {
    const userConversation = chat.users.find(
      (user) => user._id !== currentUser?._id
    );

    return (
      <Link
        href={`/chats/direct/${userConversation?._id}`}
        className="flex flex-row items-center justify-start gap-2 p-2 border-b hover:bg-stone-100"
      >
        <Avatar className="w-6 h-6 shadow-xl">
          <MessageSquare />
        </Avatar>

        <p className="text-xs">{userConversation?.name}</p>
      </Link>
    );
  }
}

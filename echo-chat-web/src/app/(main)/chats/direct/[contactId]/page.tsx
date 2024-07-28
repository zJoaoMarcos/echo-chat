"use client";

import { Chat } from "@/components/chat";
import { getDirectChat } from "@/services/requests/user";
import { useQuery } from "@tanstack/react-query";
import React  from "react";
interface DirectChatProps {
  params: {
    contactId: string;
  };
}

export default function DirectChat({ params }: DirectChatProps) {
  const { contactId } = params;

  const { data: chat, isLoading } = useQuery({
    queryKey: ["chat:direct", contactId],
    queryFn: async () => await getDirectChat({ contactId })
  });

  return (
    <main className="w-full">
      <Chat chat={chat} contactId={contactId} />
    </main>
  );
}

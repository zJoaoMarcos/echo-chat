"use client";

import React from "react";
import { Contact, MessageCircle, MessagesSquare } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { useAuth } from "@/contexts/auth";
import { ContactRow } from "./contact-row";
import { SearchBar } from "./search-bar";

export function SidebarTabs() {
  const { user } = useAuth();

  const [contactSearch, setContactSearch] = React.useState("");
  const filteredContacts = user?.contacts?.filter(
    (contact) =>
      contact.contact_name.toLocaleLowerCase().includes(contactSearch) ||
      contact.phone.includes(contactSearch)
  );

  const contacts = contactSearch ? filteredContacts : user?.contacts;

  return (
    <Tabs defaultValue="contacts" className="w-full">
      {/*  <TabsList className="w-full rounded-none border-b">
        <TabsTrigger className="w-full h-full inline-flex items-center justify-start gap-2" value="contacts">
          <Contact size={18} /> Contatos
        </TabsTrigger>

        <TabsTrigger className="w-full h-full inline-flex items-center justify-start gap-2" value="chats">
          <MessageCircle size={18} /> Conversas
        </TabsTrigger>
      </TabsList> */}

      <TabsContent className="w-full" value="contacts">
        <SearchBar setSearchInput={setContactSearch} />

        <div className="w-full flex flex-col">
          {!!contacts?.length ? (
            contacts?.map((contact) => (
              <ContactRow key={contact._id} contact={contact} />
            ))
          ) : (
            <div className="w-full inline-flex items-center justify-center p-2">
              nenhum contato encontrado.
            </div>
          )}
        </div>
      </TabsContent>

      {/*   <TabsContent className="w-full" value="chats">
        <div className="w-full flex flex-col ">
          {!!chats?.length ? (
            chats?.map((chat) => (
              <ConversationRow key={chat._id} chat={chat} />
            ))
          ) : (
            <div className="w-full inline-flex items-center justify-center p-2">
              nenhuma conversa ou grupo encontrado
            </div>
          )}
        </div>
      </TabsContent> */}
    </Tabs>
  );
}

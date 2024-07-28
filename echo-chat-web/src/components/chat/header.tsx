import { Bell, EllipsisVertical, MessageSquareDot, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { getNameInitials } from "@/utils/get-name-initials";

interface ChatHeader {
  contactName: string | undefined;
}

export function ChatHeader(props: ChatHeader) {
  const { contactName } = props;

  const initialsFallback = contactName && getNameInitials(contactName);

  return (
    <header className="h-16 flex flex-row items-center justify-between p-2 border-b">
      <div className="flex items-center gap-2">
        <Avatar className="w-10 h-10 shadow-md">
          <AvatarFallback className="bg-green-100 border-2">{initialsFallback}</AvatarFallback>
        </Avatar>
        <p className="font-semibold">{contactName}</p>
      </div>

      <div>
        <ChatDropDownMenu />
      </div>
    </header>
  );
}

const ChatDropDownMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical className="w-5 h-5 hover:text-emerald-500 transition-colors hover:cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="flex flex-row gap-2">
          <MessageSquareDot className="w-4 h-4" />
          Mark unread
        </DropdownMenuItem>
        <DropdownMenuItem className="flex flex-row gap-2">
          <Bell className="w-4 h-4" /> Unmute
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex flex-row gap-2 text-red-500">
          <Trash2 className="w-4 h-4" /> Clear conversation
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

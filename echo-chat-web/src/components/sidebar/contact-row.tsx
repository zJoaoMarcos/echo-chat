import { Avatar, AvatarFallback } from "../ui/avatar";
import { IContact } from "@/@types/User";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface ContactProps {
  contact: IContact;
}

export function ContactRow(props: ContactProps) {
  const { contact } = props;
  const initialContactName = contact.name?.split("")[0];

  const pathname = usePathname();

  const isActiveLink = pathname.split("/chats/direct/")[1] === contact._id;

  return (
    <Link
      href={`/chats/direct/${contact._id}`}
      className={`flex flex-row items-center justify-start gap-2 p-4 border-b hover:bg-muted/30 hover:cursor-pointer ${isActiveLink && 'bg-emerald-100'}`}
    >
      <Avatar className="w-6 h-6">
        <AvatarFallback>{initialContactName}</AvatarFallback>
      </Avatar>
      <p className="text-sm">{contact.name}</p>
    </Link>
  );
}

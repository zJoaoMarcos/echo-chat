import { AudioLines } from "lucide-react";
import Image from "next/image";

export default function Chats() { 
  return (
    <section className="w-full bg-white h-full flex  flex-col gap-4 justify-center items-center rounded-e-xl">
      <Image alt="chats" src={'/chats-vector.svg'} width={500} height={100} />

      <div className="flex flex-row items-center gap-2">
        <h2 className="text-2xl">Echo Chat </h2>
        <AudioLines className="text-emerald-500" />
      </div>
    </section>
  )
}
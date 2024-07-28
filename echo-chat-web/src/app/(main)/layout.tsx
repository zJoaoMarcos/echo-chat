import { Sidebar } from "@/components/sidebar";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) { 
  return (
    <div className="h-screen w-screen flex flex-row bg-stone-100">
      <Sidebar />

      {children}
    </div>
  );
}
import { SidebarHeader } from "./header";
import { SidebarTabs } from "./tabs";

export function Sidebar() {
  return (
    <aside className="w-2/5 h-full flex flex-col bg-white border-r-2 rounded-s-lg">
      <SidebarHeader />

      <SidebarTabs /> 
    </aside>
  );
}
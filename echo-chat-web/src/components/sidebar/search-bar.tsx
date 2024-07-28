import { Search } from "lucide-react";
import { Input } from "../ui/input";

interface SearchBarProps { 
  setSearchInput: (search: string) => void;
}

export function SearchBar(props: SearchBarProps) {
  const { setSearchInput } = props

  return (
    <div className="w-full py-2 px-4 bg-muted/50 border-b">
      <div className="flex flex-row items-center justify-between border px-4 rounded-md bg-white">
        <Search className="w-4 h-4" />
        <Input
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Pesquisar..."
          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    </div>
  );
}

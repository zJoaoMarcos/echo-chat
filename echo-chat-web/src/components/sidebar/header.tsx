"use client";

import React from "react";

import { logout, useAuth } from "@/contexts/auth";
import { EllipsisVertical, LogOut, Plus } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { AddNewContactModal } from "../modals/add-new-contact";
import { getNameInitials } from "@/utils/get-name-initials";

export function SidebarHeader() {
  const { user, logout } = useAuth();

  const initialsFallback = user && getNameInitials(user.name);

  return (
    <header className="h-16 flex flex-row items-center justify-between gap-2 p-3 border-b">
      <div className="inline-flex items-center space-x-2">
        <Avatar className="w-10 h-10 shadow-lg">
          <AvatarFallback>{initialsFallback}</AvatarFallback>
        </Avatar>

        <p>{user?.name}</p>
      </div>

      <DropdownMenuOptions />
    </header>
  );
}

const DropdownMenuOptions = () => {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVertical className="w-5 h-5 hover:text-emerald-500 transition-colors hover:cursor-pointer" />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DialogTrigger>
            <DropdownMenuItem className="flex flex-row gap-2">
              <Plus className="w-4 h-4" />
              Adicionar contato
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem className="flex flex-row gap-2" onClick={logout}>
            <LogOut className="w-4 h-4 text-red-600" />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AddNewContactModal />
    </Dialog>
  );
};

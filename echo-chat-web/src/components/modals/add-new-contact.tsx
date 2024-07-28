"use client"

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { DialogContent, DialogFooter, DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addContact } from "@/services/requests/user";
import { toast } from "sonner";

const addContactSchema = z.object({
  contact: z.object({
    name: z.string(),
    phone: z.string(),
  })
})

type AddContactData = z.infer<typeof addContactSchema>

export function AddNewContactModal() { 
  const { register, handleSubmit, formState: { errors } } = useForm<AddContactData>({
    resolver: zodResolver(addContactSchema)
  })

  async function handleAddContact(data: AddContactData) { 
    console.log('passou')
    try {
      await addContact(data)

      toast.success('contato adicionado com sucesso')
    } catch (error) {
      toast.error('falha tente novamente.')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>Adicionar novo contato</DialogHeader>

      <form id="add-contact" onSubmit={handleSubmit(handleAddContact)} className="flex flex-col gap-2">
        <div className="space-y-1">
          <Label className="pl-1">Nome:</Label>
          <Input {...register('contact.name')} placeholder="Nome" className="focus-visible:ring-0 focus-visible:ring-offset-0" />
        </div>

        <div className="space-y-1">
          <Label className="pl-1">Número:</Label>
          <Input  {...register('contact.phone')} placeholder="Número" className="focus-visible:ring-0 focus-visible:ring-offset-0" />
        </div>
      </form>
      
      <DialogFooter>
        <Button form="add-contact" type="submit">
          Salvar 
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
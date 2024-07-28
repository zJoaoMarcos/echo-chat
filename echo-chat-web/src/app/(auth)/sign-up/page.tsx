"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignUpUser } from "@/services/requests/user";
import { InputPassword } from "@/components/ui/input-password";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { AudioLines } from "lucide-react";

const signUpSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    password: z.string(),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

type SignUpData = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  async function signUp(data: SignUpData) {
    try {
      await SignUpUser(data);

      toast.success("Cadastro realizado com sucesso");

      router.push("/sign-in");
    } catch (error) {
      toast.error("Falha tente novamente.");
    }
  }

  return (
    <div className="w-screen h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 bg-emerald-50/65">
      <form
        onSubmit={handleSubmit(signUp)}
        className="flex items-center justify-center py-12"
      >
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="flex flex-row items-center justify-center space-x-2">
              <AudioLines className="text-emerald-500" />
              <h1 className="text-3xl font-bold">Echo Chat</h1>
            </div>
            <p className="text-balance text-muted-foreground">
              Preencha o formulário e venha fazer parte do nosso clube!
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="mail@example.com"
                required
                {...register("email")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                placeholder="Jhon Doe"
                required
                {...register("name")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Telefone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="11 9999 9999"
                required
                {...register("phone")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <InputPassword
                id="password"
                type="password"
                required
                {...register("password")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Confirme a senha</Label>
              <InputPassword
                id="passwordConfirm"
                type="password"
                required
                {...register("passwordConfirm")}
              />
            </div>
            <Button type="submit" className="w-full">
              {isSubmitting ? "Enviando" : "Cadastrar"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Já tem conta?{" "}
            <Link href="/sign-in" className="underline">
              Entrar
            </Link>
          </div>
        </div>
      </form>

      <div className="hidden bg-teal-950 lg:flex lg:items-center lg:justify-center">
        <Image
          src="/chats-sign-up.svg"
          alt="Image"
          width="500"
          height="400"
          className="select-none"
        />
      </div>
    </div>
  );
}

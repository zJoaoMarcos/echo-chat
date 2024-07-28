"use client";

import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth";
import { InputPassword } from "@/components/ui/input-password";
import { AudioLines } from "lucide-react";

const signInSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});

type SignInData = z.infer<typeof signInSchema>;

export default function SignIn() {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  });

  async function signIn(data: SignInData) {
    await login(data.identifier, data.password);
  }

  return (
    <div className="w-screen h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2">
      <div className="hidden bg-emerald-50/65 lg:flex lg:items-center lg:justify-center">
        <Image
          src="/chats-sign-in.svg"
          alt="Image"
          width="500"
          height="400"
          className=""
        />
      </div>
      <form
        onSubmit={handleSubmit(signIn)}
        className="flex items-center justify-center py-12 bg-teal-950 text-white"
      >
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="flex flex-row items-center justify-center space-x-2">
              <AudioLines className="text-emerald-500" />
              <h1 className="text-3xl font-bold">Echo Chat</h1>
            </div>
            <p className="text-balance text-white/80">
              Entre com o seu email e senha.
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
                {...register("identifier")}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-xs underline"
                >
                  esqueceu a senha?
                </Link>
              </div>
              <InputPassword
                id="password"
                required
                placeholder="********"
                {...register("password")}
              />
            </div>
            <Button type="submit" className="w-full">
              {isSubmitting ? "Enviando" : "Entrar"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Não tem uma conta?{" "}
            <Link href="/sign-up" className="underline">
              Cadastre-se
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

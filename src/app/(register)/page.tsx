"use client";

import Input from "@/components/Input";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function Register() {
    const successToast = () => {
        toast.success("Cadastrado com sucesso!");
    };

    return (
        <div className="flex flex-col w-full">
            <h1 className="font-bold text-3xl text-zinc-600 text-center">Cadastre-se!</h1>
            <form action="" className="flex flex-col gap-3 mt-8 w-full px-24 pt-4">
                <Input id="name" label="Nome de usuário" />
                <Input id="email" label="Email" type="email" />
                <div className="flex gap-4 flex-col lg:flex-row">
                    <Input id="password" label="Senha" type="password" />
                    <Input id="confirm" label="Confirmar senha" type="password" />
                </div>
                <Input id="birthday" label="Data de nascimento" type="date" />
                <Link href="/confirm" onClick={successToast} type="submit" className="px-4 py-3 text-xl rounded-full bg-primary-700 text-white transition w-full hover:brightness-110 mt-4 text-center">
                    Cadastrar
                </Link>
            </form>
            <span className="text-center text-zinc-600 text-md mt-8">
                Já tem uma conta?{" "}
                <Link href="/login" className="text-blue-500">
                    Faça login!
                </Link>
            </span>
        </div>
    );
}

"use client";

import Input from "@/components/Input";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function Register() {
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.status === "authenticated") {
            router.push("/home");
        }
    }, [session?.status, router]);

    const { register, handleSubmit } = useForm<FieldValues>({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirm: "",
            birthday: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (data.password !== data.confirm) {
            toast.error("Senhas não coincidem!");
            return;
        }

        axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
                username: data.username,
                email: data.email,
                password: data.password,
                date_birth: data.birthday,
            })
            .then(() => {
                toast.success("Usuário criado com sucesso!");
                router.push("/confirm");
            })
            .catch((error) => {
                if (error.response.data.username) toast.error("Nome de usuário já existe!");
                else if (error.response.data.email) toast.error("Email já existe!");
                else toast.error("Erro ao criar usuário!");
            });
    };

    return (
        <div className="flex flex-col w-full">
            <h1 className="font-bold text-3xl text-zinc-600 text-center">Cadastre-se!</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 mt-8 w-full px-24 pt-4">
                <Input id="username" label="Nome de usuário" register={register} />
                <Input id="email" label="Email" type="email" register={register} />
                <div className="flex gap-4 flex-col lg:flex-row">
                    <Input id="password" label="Senha" type="password" register={register} />
                    <Input id="confirm" label="Confirmar senha" type="password" register={register} />
                </div>
                <Input id="birthday" label="Data de nascimento" type="date" register={register} />
                <button type="submit" className="px-4 py-3 text-xl rounded-full bg-primary-700 text-white transition w-full hover:brightness-110 mt-4 text-center">
                    Cadastrar
                </button>
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

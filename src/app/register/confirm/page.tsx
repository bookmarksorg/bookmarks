"use client";

import Input from "@/components/Input";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function Confirm() {
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.status === "authenticated") {
            router.push("/");
        }
    }, [session?.status, router]);

    const { register, handleSubmit } = useForm<FieldValues>({
        defaultValues: {
            code: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        // todo: send confirmation code to backend
    };

    const successToast = () => {
        toast.success("E-mail confirmado com sucesso!");
        router.push("/login");
    };

    return (
        <div className="flex flex-col w-full mt-12">
            <h1 className="font-bold text-3xl text-zinc-600 text-center">Confirmação de e-mail</h1>
            <span className="text-md px-24 mt-6 text-left text-zinc-600 font-medium">Um e-mail de confirmação foi enviado. Por favor, digite abaixo o código recebido para concluir o cadastro.</span>
            <form action="" className="flex flex-col gap-3 mt-12 w-full px-24">
                <Input id="code" label="Digite o código abaixo:" register={register} />
                <button type="submit" onClick={successToast} className="px-4 py-3 text-xl rounded-full bg-primary-700 text-white transition w-full hover:brightness-110 mt-2 text-center">
                    Confirmar
                </button>
            </form>
            <span className="text-center text-zinc-600 text-md mt-8">
                Não recebeu o código? <span className="text-blue-500 cursor-pointer hover:underline">Reenviar código!</span>
            </span>
        </div>
    );
}

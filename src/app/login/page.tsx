import Input from "@/components/Input";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
    return (
        <div className="flex min-h-full bg-primary-700">
            <div className="flex flex-[7] flex-col bg-primary-700 items-center gap-20">
                <div className="flex flex-col items-center gap-12 text-white mt-32 px-28">
                    <h1 className="text-4xl font-bold">Bem vindo de volta!</h1>
                    <Image src="/login.png" width={450} height={450} alt="Two people talking to each other with a cup of coffee on their hands" />
                </div>
            </div>
            <div className="flex flex-[5] flex-col bg-[#F4F1F1] rounded-xl items-center">
                <Image src="/logo.svg" width={120} height={120} alt="BookMarks's logo" className="mb-14 mt-8" />
                <div className="flex flex-col w-full">
                    <h1 className="font-bold text-3xl text-zinc-600 text-center">Faça seu login</h1>
                    <form action="" className="flex flex-col gap-3 mt-12 w-full px-24">
                        <Input id="name" label="Nome de usuário" />
                        <Input id="password" label="Senha" type="password" />
                        <Link href="/login" className="text-blue-500 text-md pl-1 mt-1">
                            Esqueceu sua senha?
                        </Link>
                        <Link href="/home" type="submit" className="px-4 py-3 text-xl rounded-full bg-primary-700 text-white transition w-full hover:brightness-110 mt-4 text-center">
                            Entrar
                        </Link>
                    </form>
                    <span className="text-center text-zinc-600 text-md mt-8">
                        Não possui uma conta?{" "}
                        <Link href="/" className="text-blue-500">
                            Cadastre-se!
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

import Image from "next/image";

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-full bg-secondary-600">
            <div className="flex flex-[7] flex-col bg-secondary-600 items-center gap-20">
                <div className="flex flex-col items-center gap-3 text-white mt-40 px-28">
                    <h1 className="text-5xl font-bold">
                        Junte-se a <span className="text-primary-600">comunidade!</span>
                    </h1>
                    <h3 className="text-3xl text-left break-words">Interaja com outros usuários e discuta seus livros favoritos!</h3>
                </div>
                <div className="bg-white h-[20rem] w-4/5 rounded-md px-6">
                    <div className="bg-zinc-700 w-11/12 h-4 mt-6 rounded-md"></div>
                    <div className="bg-zinc-700 w-4/5 h-4 mt-2 rounded-md"></div>
                    <div className="flex flex-row bg-primary-600/20 w-full h-24 mt-6 rounded-md">
                        <div className="flex flex-row gap-5 w-full">
                            <div className="h-10 w-10 ml-6 mt-3 rounded-full bg-[#4ca6e2]"></div>
                            <div className="flex flex-col flex-grow pr-8">
                                <div className="bg-zinc-400 w-3/5 h-3 mt-5 rounded-md"></div>
                                <div className="flex flex-col pl-2">
                                    <div className="bg-zinc-400 w-11/12 h-1.5 mt-4 rounded-md"></div>
                                    <div className="bg-zinc-400 w-5/6 h-1.5 mt-1.5 rounded-md"></div>
                                    <div className="bg-zinc-400 w-2/3 h-1.5 mt-1.5 rounded-md"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-primary-600/20 w-full h-24 mt-4 rounded-md">
                        <div className="flex flex-row gap-5 w-full">
                            <div className="h-10 w-10 ml-6 mt-3 rounded-full bg-[#e24ce2]"></div>
                            <div className="flex flex-col flex-grow pr-8">
                                <div className="bg-zinc-400 w-2/5 h-3 mt-5 rounded-md"></div>
                                <div className="flex flex-col pl-2">
                                    <div className="bg-zinc-400 w-11/12 h-1.5 mt-4 rounded-md"></div>
                                    <div className="bg-zinc-400 w-5/6 h-1.5 mt-1.5 rounded-md"></div>
                                    <div className="bg-zinc-400 w-2/3 h-1.5 mt-1.5 rounded-md"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-[5] flex-col bg-[#F4F1F1] rounded-xl items-center">
                <Image src="/logo.svg" width={120} height={120} alt="BookMarks's logo" className="mb-14 mt-8" />
                {children}
            </div>
        </div>
    );
}

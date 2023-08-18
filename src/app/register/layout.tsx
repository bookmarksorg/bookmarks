import Image from "next/image";

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-full">
            <div className="flex flex-[7] flex-col bg-[#2B3747] items-center gap-20">
                <div className="flex flex-col items-center gap-3 text-white mt-40 px-28">
                    <h1 className="text-5xl font-bold">
                        Junte-se a <span className="text-[#ED766F]">comunidade!</span>
                    </h1>
                    <h3 className="text-3xl text-left break-words">Interaja com outros usuários e discuta seus livros favoritos!</h3>
                </div>
                <div className="bg-white h-[20rem] w-4/5 rounded-md px-6">
                    <div className="bg-zinc-700 w-11/12 h-4 mt-6 rounded-md"></div>
                    <div className="bg-zinc-700 w-4/5 h-4 mt-2 rounded-md"></div>
                    <div className="flex flex-row bg-[#ED766f35] w-full h-24 mt-6 rounded-md">
                        <div className="flex flex-row gap-5 w-full">
                            <div className="h-8 w-8 ml-6 mt-3 rounded-full bg-[#4ca6e2]"></div>
                            <div className="flex flex-col flex-grow pr-8">
                                <div className="bg-zinc-500 w-3/5 h-3 mt-5 rounded-md"></div>
                                <div className="flex flex-col pl-2">
                                    <div className="bg-zinc-500 w-11/12 h-1.5 mt-4 rounded-md"></div>
                                    <div className="bg-zinc-500 w-5/6 h-1.5 mt-1.5 rounded-md"></div>
                                    <div className="bg-zinc-500 w-2/3 h-1.5 mt-1.5 rounded-md"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#ED766f35] w-full h-24 mt-4 rounded-md">
                        <div className="flex flex-row gap-5 w-full">
                            <div className="h-8 w-8 ml-6 mt-3 rounded-full bg-[#e24ce2]"></div>
                            <div className="flex flex-col flex-grow pr-8">
                                <div className="bg-zinc-500 w-2/5 h-3 mt-5 rounded-md"></div>
                                <div className="flex flex-col pl-2">
                                    <div className="bg-zinc-500 w-11/12 h-1.5 mt-4 rounded-md"></div>
                                    <div className="bg-zinc-500 w-5/6 h-1.5 mt-1.5 rounded-md"></div>
                                    <div className="bg-zinc-500 w-2/3 h-1.5 mt-1.5 rounded-md"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-[5] flex-col bg-[#F4F1F1] rounded-l-lg px-14 pt-8 items-center">
                <Image src="/logo.svg" width={100} height={150} alt="BookMarks's logo" className="mb-20" />
                {children}
            </div>
        </div>
    );
}

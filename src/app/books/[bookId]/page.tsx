import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaRegStar, FaRegStarHalfStroke, FaStar } from "react-icons/fa6";

export default function Books() {
    return (
        <div className="flex flex-col overflow-y-hidden">
            <Header />
            <div className="flex h-screen-header">
                <Sidebar />
                <div className="flex flex-col flex-grow p-8 pl-12 gap-8 bg-[#C4CCD8] overflow-y-auto">
                    <Link href="/library" className="flex gap-3 items-center hover:underline">
                        <FaArrowLeft className="w-5 h-5" />
                        <h2 className="text-xl font-semibold text-gray-600">Voltar</h2>
                    </Link>
                    <div className="flex bg-white text-gray-600 py-12 w-full rounded-lg px-12 justify-center gap-4">
                        <div className="flex flex-col w-76">
                            <Image
                                src="https://m.media-amazon.com/images/I/81tM68Xn66L._AC_UF1000,1000_QL80_.jpg"
                                alt="Star Wars: The High Republic: Light of the Jedi"
                                height={446}
                                width={300}
                                className="bg-secondary-700 rounded-lg cursor-pointer transition hover:brightness-110"
                            ></Image>
                            <button className="bg-primary-600 rounded-lg w-full py-2 text-white flex justify-center items-center mt-4 hover:brightness-110 transition">
                                <h2 className="text-lg font-bold flex gap-3 items-center">
                                    <FaStar className="w-5 h-5" />
                                    Adicionar aos favoritos
                                </h2>
                            </button>
                        </div>
                        <div className="flex flex-col flex-[7] pl-8 pr-16">
                            {/* title */}
                            <h1 className="text-4xl font-bold">Star Wars: The High Republic: Light of the Jedi</h1>
                            {/* sinopses */}
                            <p className="mt-4 text-md">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet temporibus commodi aliquid saepe pariatur animi asperiores excepturi quisquam rerum. Corrupti illum id
                                velit accusamus quia, at sint ullam alias. Cumque sequi assumenda praesentium dignissimos, iure illo eum distinctio eos voluptas, quidem facilis id. Aperiam saepe,
                                obcaecati blanditiis tempore odit id?
                            </p>
                            {/* details */}
                            <div className="flex gap-3 text-lg mt-6">
                                {/* author | pages | language */}
                                <div className="text-gray-500">
                                    <span className="font-bold">Autor: </span>
                                    <span>Charles Soule |</span>
                                </div>
                                <div className="text-gray-500">
                                    <span className="font-bold">Nº de páginas: </span>
                                    <span>182 |</span>
                                </div>
                                <div className="text-gray-500">
                                    <span className="font-bold">Idioma: </span>
                                    <span>Inglês</span>
                                </div>
                            </div>
                            {/* date */}
                            <div className="flex gap-3 text-lg mt-3">
                                <div className="text-gray-500">
                                    <span className="font-bold">Ano de lançamento: </span>
                                    <span>2021</span>
                                </div>
                            </div>
                            {/* genres */}
                            <div className="flex gap-3 text-lg mt-3">
                                <div className="flex flex-col gap-2 text-gray-500">
                                    <span className="font-bold">Gêneros: </span>
                                    <div className="flex gap-3">
                                        <span className="bg-[#F59E0B] text-white rounded-lg px-3 py-1 cursor-pointer hover:brightness-110">Fantasia</span>
                                        <span className="bg-[#10B981] text-white rounded-lg px-3 py-1 cursor-pointer hover:brightness-110">Ficção Científica</span>
                                        <span className="bg-secondary-600 text-white rounded-lg px-3 py-1 cursor-pointer hover:brightness-110">Aventura</span>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-6 bg-gray-300 h-[2px]" />
                            {/* rating */}
                            <div className="flex gap-3 text-lg">
                                <div className="flex flex-col gap-2 text-gray-500">
                                    <span className="font-bold">Nota dos usuários (1.345): </span>
                                    <div className="flex gap-2 text-[#F59E0B] items-center">
                                        <span className="font-bold">4.5</span>
                                        <div className="flex gap-1">
                                            <FaStar className="w-7 h-7 text-[#F59E0B]" />
                                            <FaRegStarHalfStroke className="w-8 h-8 -mt-0.5 text-[#F59E0B]" />
                                            <FaRegStar className="w-7 h-7 text-[#F59E0B]" />
                                            <FaRegStar className="w-7 h-7 text-[#F59E0B]" />
                                            <FaRegStar className="w-7 h-7 text-[#F59E0B]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

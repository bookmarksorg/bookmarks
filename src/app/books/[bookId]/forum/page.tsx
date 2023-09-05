"use client";

import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft, FaFloppyDisk } from "react-icons/fa6";

export default function Discussions() {
    const { bookId } = useParams();
    const id = bookId as string;

    const status = useSearchParams().get("status") === "discussions" ? "discussions" : "reviews";

    const [forumStatus, setForumStatus] = useState<"reviews" | "discussions">(status);

    const handleForumStatus = () => {
        if (forumStatus === "reviews") setForumStatus("discussions");
        else setForumStatus("reviews");
    };

    const books: Record<string, { image: string; title: string }> = {
        n3ui4tn3tm: {
            image: "https://m.media-amazon.com/images/I/91LptBSFxQL._AC_UF1000,1000_QL80_.jpg",
            title: "Percy Jackson and the Olympians: The Lightning Thief",
        },
        g6h34ui3w4: {
            image: "https://m.media-amazon.com/images/I/81tM68Xn66L._AC_UF1000,1000_QL80_.jpg",
            title: "Star Wars: The High Republic: Light of the Jedi",
        },
        m53ynos09g: {
            image: "https://m.media-amazon.com/images/I/71HbYElfY0L._AC_UF1000,1000_QL80_.jpg",
            title: "Harry Potter and the Sorcerer's Stone",
        },
        z7b8w0fkh0: {
            image: "https://m.media-amazon.com/images/I/91k68MKPbNL._AC_UF1000,1000_QL80_.jpg",
            title: "Oyasumi Punpun",
        },
        c3x5jiogs9: {
            image: "https://m.media-amazon.com/images/I/614SwlZNtJL._AC_UF1000,1000_QL80_.jpg",
            title: "The Hunger Games",
        },
    };

    return (
        <div className="flex flex-col overflow-y-hidden">
            <Header />
            <div className="flex h-screen-header">
                <Sidebar />
                <div className="flex flex-col flex-grow p-8 pl-12 gap-8 bg-[#C4CCD8] dark:bg-[#4B5B73] dark:text-white overflow-y-auto">
                    <Link href={`/books/${id}`} className="flex gap-3 items-center hover:underline">
                        <FaArrowLeft className="w-5 h-5" />
                        <h2 className="text-xl font-semibold">Voltar</h2>
                    </Link>
                    <div className="flex flex-col bg-[#F1F5FA] dark:bg-[#253449] text-gray-600 dark:text-white py-12 w-full rounded-lg px-12 justify-center gap-4">
                        <div className="flex gap-12">
                            <Image src={books[id].image} width={150} height={300} alt={`${books[id].title}'s cover`} className="rounded-lg cursor-pointer transition hover:brightness-110" />
                            <div className="flex flex-col gap-2 font-semibold justify-between w-full">
                                <h2 className="flex flex-col gap-2 text-2xl">
                                    <span className="">Fórum sobre:</span>
                                    <span className="text-primary-600 text-4xl">{books[id].title}</span>
                                </h2>
                                <div className="flex w-full items-center justify-between">
                                    <div className="flex text-xl gap-6">
                                        <span>
                                            <span className="text-primary-600">1.2k </span>
                                            reviews
                                        </span>
                                        <span>
                                            <span className="text-primary-600">576 </span>discussões
                                        </span>
                                    </div>
                                    <button className="bg-primary-600 rounded-lg px-8 py-2 text-white flex justify-center items-center hover:brightness-110 transition">
                                        <h2 className="text-md font-bold flex gap-3 items-center">
                                            <FaFloppyDisk className="w-5 h-5" />
                                            Criar nova discussão
                                        </h2>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-16 border-b-2 border-b-[#D5D8DB] dark:border-b-[#4B5B73] text-gray-500 dark:text-white">
                            <div className="flex">
                                <div
                                    className={`flex px-10 py-2 cursor-pointer border-b-4 border-transparent ${forumStatus === "reviews" ? "border-b-primary-700" : ""} transition`}
                                    onClick={() => handleForumStatus()}
                                >
                                    <span className="font-medium text-xl">Reviews</span>
                                </div>
                                <div
                                    className={`flex px-8 py-2 cursor-pointer border-b-4 border-transparent ${forumStatus === "discussions" ? "border-b-primary-700" : ""} transition`}
                                    onClick={() => handleForumStatus()}
                                >
                                    <span className="font-medium text-xl">Discussões</span>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <span className="font-semibold">Filtrar:</span>
                                <select className="border outline-none border-gray-300 rounded-lg px-4 py-1">
                                    <option value="1">Recentes</option>
                                    <option value="2">Antigos</option>
                                    <option value="3">Melhores</option>
                                </select>
                            </div>
                        </div>
                        {forumStatus === "reviews" ? (
                            <div className="flex flex-col">
                                <PostCard
                                    title="Esse livro é até que bom, recomendo"
                                    author="random_bob"
                                    description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus explicabo voluptatibus delectus necessitatibus suscipit, nam ipsum impedit voluptate dignissimos vero quas possimus odit, consequatur quam omnis quaerat! Aliquam, perspiciatis error."
                                    date="15/09/2021"
                                    isReview
                                    rating={4}
                                />
                                <PostCard
                                    title="Podia ser melhor"
                                    author="average_joe"
                                    description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime ut consequuntur architecto. Magnam quam autem amet consectetur, quod magni minima."
                                    date="13/09/2021"
                                    isReview
                                    rating={3}
                                />
                                <PostCard
                                    title="Odiei esse livro com todas as minhas forças"
                                    author="Joaozinho"
                                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab explicabo facere temporibus, impedit mollitia inventore hic autem porro molestias laborum maiores fugiat quasi ipsa laudantium cupiditate aliquid ad delectus, saepe cumque, dicta veniam. Nobis distinctio ipsam assumenda nihil illo hic iste nam non corporis odit, temporibus vel doloribus in quisquam?"
                                    date="08/09/2021"
                                    isReview
                                    rating={1}
                                />
                                <PostCard
                                    title="Esse livro é até que bom, recomendo"
                                    author="random_bob"
                                    description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus explicabo voluptatibus delectus necessitatibus suscipit, nam ipsum impedit voluptate dignissimos vero quas possimus odit, consequatur quam omnis quaerat! Aliquam, perspiciatis error."
                                    date="15/09/2021"
                                    isReview
                                    rating={4}
                                />
                                <PostCard
                                    title="Podia ser melhor"
                                    author="average_joe"
                                    description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime ut consequuntur architecto. Magnam quam autem amet consectetur, quod magni minima."
                                    date="13/09/2021"
                                    isReview
                                    rating={3}
                                />
                                <PostCard
                                    title="Odiei esse livro com todas as minhas forças"
                                    author="Joaozinho"
                                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab explicabo facere temporibus, impedit mollitia inventore hic autem porro molestias laborum maiores fugiat quasi ipsa laudantium cupiditate aliquid ad delectus, saepe cumque, dicta veniam. Nobis distinctio ipsam assumenda nihil illo hic iste nam non corporis odit, temporibus vel doloribus in quisquam?"
                                    date="08/09/2021"
                                    isReview
                                    rating={1}
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                <PostCard author="Iasminborbita" title="Is Punpun actually a bird?" description="I'm not sure if Punpun is a bird or not, does anyone know?" date="15/11/2022" />
                                <PostCard
                                    author="thegreat_alex"
                                    title="Katniss and Peeta should have died"
                                    description="I think Katniss and Peeta should have died in the end of the book, what do you think?"
                                    date="28/02/2023"
                                />
                                <PostCard author="Iasminborbita" title="Is Punpun actually a bird?" description="I'm not sure if Punpun is a bird or not, does anyone know?" date="15/11/2022" />
                                <PostCard
                                    author="thegreat_alex"
                                    title="Katniss and Peeta should have died"
                                    description="I think Katniss and Peeta should have died in the end of the book, what do you think?"
                                    date="28/02/2023"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

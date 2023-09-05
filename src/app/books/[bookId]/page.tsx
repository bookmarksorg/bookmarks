"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import BookDetail from "@/components/Books/BookDetail";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar/Sidebar";

import { FaArrowLeft } from "react-icons/fa6";

export default function Books() {
    const { bookId } = useParams();
    const id = bookId as string;

    return (
        <div className="flex flex-col overflow-y-hidden">
            <Header />
            <div className="flex h-screen-header">
                <Sidebar />
                <div className="flex flex-col flex-grow p-8 pl-12 gap-8 bg-[#C4CCD8] dark:bg-[#4B5B73] text-gray-600 dark:text-white overflow-y-auto">
                    <Link href="/library" className="flex gap-3 items-center hover:underline">
                        <FaArrowLeft className="w-5 h-5" />
                        <h2 className="text-xl font-semibold">Voltar</h2>
                    </Link>
                    <div className="flex flex-col bg-[#F1F5FA] dark:bg-[#253449] py-12 w-full rounded-lg px-12 justify-center gap-4">
                        <BookDetail id={id} />
                    </div>
                    <div className="flex flex-col bg-[#F1F5FA] dark:bg-[#253449] pt-3 pb-12 w-full rounded-lg px-12 justify-center gap-4">
                        <div className="flex flex-col mt-8">
                            <div className="flex justify-between px-1 items-center relative mb-4">
                                <h2 className="text-2xl font-bold">Reviews recentes</h2>
                                <Link href={`/books/${id}/forum`}>
                                    <span className="text-md font-semibold text-primary-600 hover:underline">Ver todos</span>
                                </Link>
                            </div>
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
                    </div>
                </div>
            </div>
        </div>
    );
}

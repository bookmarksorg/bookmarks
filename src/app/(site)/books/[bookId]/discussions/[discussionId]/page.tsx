"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

import { books } from "@/constants/books";
import { discussions } from "@/constants/discussions";
import { FaRegBookmark, FaRegCommentDots, FaRegThumbsUp, FaTrash } from "react-icons/fa6";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Comment from "@/components/Comment";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { DeleteModal } from "@/components/Books/DeleteModal";

export default function Discussions() {
    const { bookId, discussionId } = useParams();
    const book = bookId as string;
    const discussion = discussionId as string;

    const router = useRouter();

    const [deleteModal, setDeleteModal] = useState(false);

    async function handleDelete() {
        setDeleteModal(false);
        toast.success("Discussão excluída com sucesso!");
        router.push(`/books/${book}`);
    }

    return (
        <>
            <DeleteModal isOpen={deleteModal} onConfirm={() => handleDelete()} setModalIsOpen={setDeleteModal} />
            <div className="flex flex-col flex-grow p-8 pl-12 gap-8 bg-[#C4CCD8] dark:bg-[#1C2635] dark:text-white overflow-y-auto">
                <div className="flex flex-col bg-[#F1F5FA] dark:bg-[#253449] w-full rounded-lg justify-center">
                    <div className="relative w-full">
                        <div
                            style={{ backgroundImage: `url(${books[book].image})` }}
                            className={`bg-cover bg-center bg-no-repeat w-full h-60 rounded-lg opacity-50 flex items-center justify-center`}
                        />
                        <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold bg-[#253449] text-white px-10 py-4 rounded-xl opacity-100 w-max">
                            {books[book].title}
                        </h2>
                    </div>
                    <div className="px-12 py-12">
                        <div className="flex flex-col gap-4 ">
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold">{discussions[discussion].author}</span>
                                    {discussions[discussion].author.toLowerCase() === "jorge_pat" && (
                                        <span className="bg-primary-600 text-white px-4 py-2 rounded-md cursor-pointer transition hover:bg-primary-700" onClick={() => setDeleteModal(true)}>
                                            <FaTrash className="w-5 h-5" />
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-2xl font-bold">{discussions[discussion].title}</h2>
                                <p className="text-lg">{discussions[discussion].description}</p>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex justify-end mt-8 gap-6">
                                    <div className="flex gap-1 items-center">
                                        <FaRegCommentDots className="w-5 h-5" />
                                        <span className="text-sm font-medium">{discussions[discussion].comments} Comentários</span>
                                    </div>
                                    <div className="flex gap-1 items-center cursor-pointer transition hover:text-primary-600">
                                        <FaRegThumbsUp className="w-5 h-5" />
                                        <span className="text-sm font-mediu">{discussions[discussion].likes} Curtidas</span>
                                    </div>
                                    <div className="flex gap-1 items-center cursor-pointer transition hover:text-primary-600">
                                        <FaRegBookmark className="w-5 h-5" />
                                        <span className="text-sm font-medium">{discussions[discussion].bookmarks} Marcações</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col bg-[#F1F5FA] dark:bg-[#253449] text-gray-600 dark:text-white py-12 w-full rounded-lg px-12 justify-center gap-4">
                    <h2 className="text-2xl font-bold">Comentários</h2>
                    <div className="flex mt-4 gap-4 relative">
                        <textarea className="flex-grow border border-gray-300 dark:bg-transparent rounded-lg px-4 py-2" placeholder="Escreva um comentário..." rows={3} />
                        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg absolute right-4 bottom-3">Publicar</button>
                    </div>
                    <div className="flex flex-col gap-2 mt-8">
                        <Comment
                            author="anon_bob"
                            date="06/09/6969"
                            comment="I think that I don't agree with this thing that you said, because I think that this is not true, and I think that you are wrong."
                            answers="467"
                            likes="69"
                        />
                        <Comment
                            author="vitor_perei"
                            date="07/07/2007"
                            comment="You are right, I think that you are right, and I think that you are the best person in the world, and I think that you are the best person in the world, and I think that you are the best person in the world."
                            answers="999"
                            likes="999"
                        />
                        <Comment
                            author="anon_bob"
                            date="06/09/6969"
                            comment="I think that I don't agree with this thing that you said, because I think that this is not true, and I think that you are wrong."
                            answers="467"
                            likes="69"
                        />
                        <Comment
                            author="vitor_perei"
                            date="07/07/2007"
                            comment="You are right, I think that you are right, and I think that you are the best person in the world, and I think that you are the best person in the world, and I think that you are the best person in the world."
                            answers="999"
                            likes="999"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

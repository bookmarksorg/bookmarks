"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

import { FaRegBookmark, FaRegCommentDots, FaRegThumbsUp, FaTrash } from "react-icons/fa6";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Comment from "@/components/Comment";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { DeleteModal } from "@/components/Books/DeleteModal";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Discussions() {
    const { bookId, discussionId } = useParams();
    const [discussion, setDiscussion] = useState<any>({ author: "loading...", title: "loading...", description: "loading..." });
    const [book, setBook] = useState<any>({ title: "loading...", cover: "loading..." });
    const [deleteModal, setDeleteModal] = useState(false);
    const [username, setUsername] = useState("");

    const { data } = useSession();
    const router = useRouter();

    useEffect(() => {
        async function getBook() {
            if (!bookId) return;
            const { data: book } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${data?.user?.image}`,
                },
            });
            console.log(book);
            setBook(book);
        }

        async function getDiscussion() {
            if (!discussionId) return;
            const { data: discussion } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/discussions/${discussionId}`, {
                headers: {
                    Authorization: `Bearer ${data?.user?.image}`,
                },
            });
            console.log(discussion);

            const { data: user } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${discussion.id_user}`, {
                headers: {
                    Authorization: `Bearer ${data?.user?.image}`,
                },
            });

            discussion.author = user.username;

            setDiscussion(discussion);
        }

        if (data?.user?.image) getBook();
        if (data?.user?.image) getDiscussion();
        if (data?.user?.name) setUsername(data?.user?.name);
    }, [data, bookId, discussionId]);

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
                        <div style={{ backgroundImage: `url(${book.cover})` }} className={`bg-cover bg-center bg-no-repeat w-full h-60 rounded-lg opacity-50 flex items-center justify-center`} />
                        <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold bg-[#253449] text-white px-10 py-4 rounded-xl opacity-100 w-max">{book.title}</h2>
                    </div>
                    <div className="px-12 py-12">
                        <div className="flex flex-col gap-4 ">
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold">{discussion.author}</span>
                                    {discussion.author.toLowerCase() === username.toLowerCase() && (
                                        <span className="bg-primary-600 text-white px-4 py-2 rounded-md cursor-pointer transition hover:bg-primary-700" onClick={() => setDeleteModal(true)}>
                                            <FaTrash className="w-5 h-5" />
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-2xl font-bold">{discussion.title}</h2>
                                <p className="text-lg">{discussion.description}</p>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex justify-end mt-8 gap-6">
                                    <div className="flex gap-1 items-center">
                                        <FaRegCommentDots className="w-5 h-5" />
                                        <span className="text-sm font-medium">0 Comentários</span>
                                    </div>
                                    <div className="flex gap-1 items-center cursor-pointer transition hover:text-primary-600">
                                        <FaRegThumbsUp className="w-5 h-5" />
                                        <span className="text-sm font-mediu">3 Curtidas</span>
                                    </div>
                                    <div className="flex gap-1 items-center cursor-pointer transition hover:text-primary-600">
                                        <FaRegBookmark className="w-5 h-5" />
                                        <span className="text-sm font-medium">4 Marcações</span>
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

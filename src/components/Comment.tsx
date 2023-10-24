"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaExclamationCircle, FaTrashAlt } from "react-icons/fa";
import { FaRegCommentDots, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa6";

interface CommentProps {
    id: string;
    author: string;
    comment: string;
    date: string;
    answers: number;
    likes: number;
    isAuthor?: boolean;
    isLiked?: boolean;
    handleDeleteCommment: (id: string) => void;
}

export default function Comment({ id, author, comment, date, answers, likes, isAuthor, isLiked, handleDeleteCommment }: CommentProps) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const { data } = useSession();
    const [localLikes, setLocalLikes] = useState(likes);
    const [localIsLiked, setLocalIsLiked] = useState(isLiked || false);

    const handleDelete = (id: string) => {
        if (!confirmDelete) {
            setConfirmDelete(true);
            return;
        }
        handleDeleteCommment(id);
    };

    async function handleLike() {
        if (!data?.user?.image || !id) return;
        const { data: like } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/comments/${id}/like/`, {
            headers: {
                Authorization: `Bearer ${data?.user?.image}`,
            },
        });
        if (like.is_liked) toast.success("Post curtido com sucesso");
        else toast.success("Post descurtido com sucesso");
        setLocalIsLiked(like.is_liked);
        setLocalLikes(localLikes + (like.is_liked ? 1 : -1));
    }

    return (
        <div className={`flex flex-col mt-4 bg-white dark:bg-[#2D3F59] text-gray-600 dark:text-white/90 rounded-md px-8 py-6 w-full`}>
            <div className="flex justify-between mb-4">
                <div className="flex gap-2 items-center">
                    <Link href={`/profile/${author}`} className="text-sm font-bold hover:underline cursor-pointer">
                        {author}
                    </Link>
                </div>
                <span className="text-sm font-semibold">{date}</span>
            </div>
            <span className="text-md font-medium mt-3">{comment}</span>
            <div className="flex justify-end mt-8 gap-6">
                {isAuthor && (
                    <div onClick={() => handleDelete(id)} className="flex gap-1 items-center cursor-pointer transition text-primary-600">
                        {confirmDelete ? <FaExclamationCircle className="w-5 h-5" /> : <FaTrashAlt className="w-5 h-5" />}
                        <span className="text-sm font-medium">{confirmDelete ? "Confirmar" : "Excluir"}</span>
                    </div>
                )}
                <div className="flex gap-1 items-center cursor-pointer transition hover:text-primary-600">
                    <FaRegCommentDots className="w-5 h-5" />
                    <span className="text-sm font-medium">{answers} Respostas</span>
                </div>
                <div className={`flex gap-1 items-center cursor-pointer transition ${localIsLiked ? "text-primary-600" : "hover:text-primary-600"}`} onClick={handleLike}>
                    {localIsLiked ? <FaThumbsUp className="w-5 h-5" /> : <FaRegThumbsUp className="w-5 h-5" />}
                    <span className="text-sm font-medium select-none">
                        {localLikes} Curtida{localLikes === 1 ? "" : "s"}
                    </span>
                </div>
            </div>
        </div>
    );
}

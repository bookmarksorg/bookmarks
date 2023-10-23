"use client";

import Link from "next/link";
import { useState } from "react";
import { FaExclamationCircle, FaTrashAlt } from "react-icons/fa";
import { FaRegCommentDots, FaRegThumbsUp } from "react-icons/fa6";

interface CommentProps {
    id: string;
    author: string;
    comment: string;
    date: string;
    answers: number;
    likes: number;
    isAuthor?: boolean;
    handleDeleteCommment: (id: string) => void;
}

export default function Comment({ id, author, comment, date, answers, likes, isAuthor, handleDeleteCommment }: CommentProps) {
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDelete = (id: string) => {
        if (!confirmDelete) {
            setConfirmDelete(true);
            return;
        }
        handleDeleteCommment(id);
    };

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
                <div className="flex gap-1 items-center cursor-pointer transition hover:text-primary-600">
                    <FaRegThumbsUp className="w-5 h-5" />
                    <span className="text-sm font-medium">
                        {likes} Curtida{likes === 1 ? "" : "s"}
                    </span>
                </div>
            </div>
        </div>
    );
}

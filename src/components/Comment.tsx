"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaExclamationCircle, FaRegCommentAlt, FaTrashAlt } from "react-icons/fa";
import { FaRegCommentDots, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa6";

interface CommentProps {
    id: string;
    author: string;
    comment: string;
    date: string;
    qtyAnswers: number;
    likes: number;
    username?: string;
    isLiked?: boolean;
    handleDeleteCommment: (id: string) => void;
    depth: number;
    setCommentToAnswer: (id: string) => void;
    setIsLoading: (isLoading: boolean) => void;
    refresh?: () => void;
    commentsState?: any;
}

export default function Comment({ id, author, comment, date, qtyAnswers, likes, setCommentToAnswer, username, isLiked, handleDeleteCommment, depth, setIsLoading, commentsState }: CommentProps) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const { data } = useSession();
    const [localLikes, setLocalLikes] = useState(likes);
    const [localIsLiked, setLocalIsLiked] = useState(isLiked || false);
    const [answering, setAnswering] = useState(false);
    const [answersOpen, setAnswersOpen] = useState(false);
    const isAuthor = author === username;
    const [answers, setAnswers] = useState<any[]>([]);

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

    const handleAnswer = () => {
        if (answering) {
            setAnswering(false);
            setCommentToAnswer("");
            setAnswersOpen(true);
            return;
        }
        const element = document.getElementById("comment");
        if (element) {
            console.log("scrolling");
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            element.focus();
        }
        setAnswering(true);
        setCommentToAnswer(id);
    };

    async function handleAnswers() {
        if (!data?.user?.image || !id || qtyAnswers === 0) return;
        if (!answersOpen) {
            setIsLoading(true);
            const { data: answers } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/comments/${id}/answers/`, {
                headers: {
                    Authorization: `Bearer ${data?.user?.image}`,
                },
            });
            setAnswers(answers);
            setIsLoading(false);
        }
        setAnswersOpen(!answersOpen);
    }

    useEffect(() => {
        async function refresh() {
            const { data: answers } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/comments/${id}/answers/`, {
                headers: {
                    Authorization: `Bearer ${data?.user?.image}`,
                },
            });
            setAnswers(answers);
        }
        if (commentsState && data?.user?.image && id) refresh();
    }, [commentsState, data, id]);

    return (
        <div className="flex flex-col gap-2">
            <div
                className={`flex flex-col mt-4 bg-white dark:bg-[#2D3F59] text-gray-600 dark:text-white/90 rounded-md px-8 py-6 shadow-md transition ${answering ? "border-2 border-primary-600" : ""}`}
                style={{ marginLeft: `${depth * 2}rem`, width: `calc(100% - ${depth * 2}rem)` }}
            >
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
                    <div onClick={handleAnswer} className={`flex gap-1 items-center cursor-pointer transition ${answering ? "text-primary-600" : "hover:text-primary-600"}`}>
                        <FaRegCommentAlt className="w-5 h-5" />
                        <span className="text-sm font-medium">Responder</span>
                    </div>
                    <div className={`flex gap-1 items-center cursor-pointer transition ${answersOpen ? "text-primary-600" : "hover:text-primary-600"}`}>
                        <FaRegCommentDots className="w-5 h-5" />
                        <span onClick={() => handleAnswers()} className="text-sm font-medium">
                            {qtyAnswers} Respostas
                        </span>
                    </div>
                    <div className={`flex gap-1 items-center cursor-pointer transition ${localIsLiked ? "text-primary-600" : "hover:text-primary-600"}`} onClick={handleLike}>
                        {localIsLiked ? <FaThumbsUp className="w-5 h-5" /> : <FaRegThumbsUp className="w-5 h-5" />}
                        <span className="text-sm font-medium select-none">
                            {localLikes} Curtida{localLikes === 1 ? "" : "s"}
                        </span>
                    </div>
                </div>
            </div>
            {answers &&
                answersOpen &&
                answers.map((answer) => (
                    <Comment
                        key={answer.id_comment}
                        id={answer.id_comment}
                        author={answer.author}
                        date={new Date(answer.date).toLocaleDateString("pt-BR")}
                        comment={answer.description}
                        qtyAnswers={answer.qty_answers}
                        likes={answer.likes}
                        username={username}
                        isLiked={answer.is_liked}
                        handleDeleteCommment={handleDeleteCommment}
                        depth={answer.depth}
                        setCommentToAnswer={setCommentToAnswer}
                        setIsLoading={setIsLoading}
                    />
                ))}
        </div>
    );
}

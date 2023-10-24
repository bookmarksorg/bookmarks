"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { FaBookmark, FaRegBookmark, FaRegCommentDots, FaRegThumbsUp, FaThumbsUp, FaTrash } from "react-icons/fa6";
import { FaArrowAltCircleRight, FaExclamationTriangle } from "react-icons/fa";
import Comment from "@/components/Comment";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { DeleteModal } from "@/components/Books/DeleteModal";
import { useSession } from "next-auth/react";
import axios from "axios";
import Loading from "@/components/Loading";
import Link from "next/link";
import Lottie from "lottie-react";
import Empty from "@/assets/empty.json";

export default function Discussions() {
    const { bookId, discussionId } = useParams();
    const [discussion, setDiscussion] = useState<any>({ author: "", title: "", description: "" });
    const [book, setBook] = useState<any>({ title: "", cover: "" });
    const [deleteModal, setDeleteModal] = useState(false);
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [localIsLiked, setLocalIsLiked] = useState(false);
    const [localIsBookMarked, setLocalIsBookMarked] = useState(false);
    const [localLikes, setLocalLikes] = useState(0);
    const [localBookmarks, setLocalBookmarks] = useState(0);
    const [comments, setComments] = useState<any[]>([]);
    const [comment, setComment] = useState("");
    const { data } = useSession();
    const router = useRouter();

    useEffect(() => {
        setIsLoading(true);
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
            let response;
            try {
                response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/discussions/${discussionId}`, {
                    headers: {
                        Authorization: `Bearer ${data?.user?.image}`,
                    },
                });
            } catch (err) {
                console.error(err);
                toast.error("Discussão não encontrada");
                return router.push(`/books/${bookId}`);
            }
            const { data: discussion } = response;

            console.log(discussion);
            setDiscussion(discussion);
            setLocalIsLiked(discussion.is_liked);
            setLocalIsBookMarked(discussion.is_tagged);
            setLocalLikes(discussion.qty_likes);
            setLocalBookmarks(discussion.qty_tags);
            setComments(discussion.comments);
        }

        if (data?.user?.image) getBook();
        if (data?.user?.image) getDiscussion();
        if (data?.user?.name) setUsername(data?.user?.name);
        setIsLoading(false);
    }, [data, bookId, discussionId, router]);

    async function handleDelete() {
        setDeleteModal(false);
        if (!discussionId) return;
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/discussions/${discussionId}/`, {
            headers: {
                Authorization: `Bearer ${data?.user?.image}`,
            },
        });
        toast.success("Discussão excluída com sucesso!");
        router.push(`/books/${bookId}`);
    }

    async function handleLikeDiscussion() {
        if (!data?.user?.image || !discussionId) return;
        const { data: like } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/discussions/${discussionId}/like/`, {
            headers: {
                Authorization: `Bearer ${data?.user?.image}`,
            },
        });
        if (like.is_liked) toast.success("Post curtido com sucesso");
        else toast.success("Post descurtido com sucesso");
        setLocalIsLiked(like.is_liked);
        setLocalLikes(localLikes + (like.is_liked ? 1 : -1));
    }

    async function handleBookmark() {
        if (!data?.user?.image || !discussionId) return;
        if (discussion.author.toLowerCase() === username.toLowerCase()) {
            return toast.error("Você não pode remover seu próprio post dos bookmarks", { className: "text-center" });
        }
        const { data: bookmark } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/discussions/${discussionId}/bookmark/`, {
            headers: {
                Authorization: `Bearer ${data?.user?.image}`,
            },
        });
        if (bookmark.is_tagged) toast.success("Post adicionado aos bookmarks");
        else toast.success("Post removido dos bookmarks");
        setLocalIsBookMarked(bookmark.is_tagged);
        setLocalBookmarks(localBookmarks + (bookmark.is_tagged ? 1 : -1));
    }

    async function handleCommentDiscussion() {
        if (!data?.user?.image || !discussionId) return;
        await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/comments/`,
            {
                description: comment,
                id_discussion: discussionId,
            },
            {
                headers: {
                    Authorization: `Bearer ${data?.user?.image}`,
                },
            }
        );
        toast.success("Comentário publicado com sucesso");
        setComment("");
        const { data: discussion } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/discussions/${discussionId}`, {
            headers: {
                Authorization: `Bearer ${data?.user?.image}`,
            },
        });
        setComments(discussion.comments);
    }

    async function handleDeleteCommment(id: string) {
        if (!data?.user?.image || !discussionId) return;
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/comments/${id}/`, {
            headers: {
                Authorization: `Bearer ${data?.user?.image}`,
            },
        });
        toast.success("Comentário excluído com sucesso");
        const { data: discussion } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/discussions/${discussionId}`, {
            headers: {
                Authorization: `Bearer ${data?.user?.image}`,
            },
        });
        setComments(discussion.comments);
    }

    return (
        <>
            {isLoading && <Loading />}
            <DeleteModal isOpen={deleteModal} onConfirm={() => handleDelete()} setModalIsOpen={setDeleteModal} />
            <div className="flex flex-col flex-grow p-8 pl-12 gap-8 bg-[#C4CCD8] dark:bg-[#1C2635] dark:text-white overflow-y-auto">
                <div className="flex flex-col bg-[#F1F5FA] dark:bg-[#253449] w-full rounded-lg justify-center">
                    <div className="relative w-full">
                        <div style={{ backgroundImage: `url(${book.cover})` }} className={`bg-cover bg-center bg-no-repeat w-full h-60 rounded-lg opacity-50 flex items-center justify-center`} />
                        <Link
                            href={`/books/${bookId}`}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold bg-[#253449] text-white px-10 py-4 rounded-xl opacity-100 w-max hover:underline"
                        >
                            {book.title}
                        </Link>
                    </div>
                    <div className="px-12 py-12">
                        <div className="flex flex-col gap-4 ">
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2">
                                        <Link href={`/profile/${discussion.author}`} className="text-lg font-semibold hover:underline">
                                            {discussion.author}
                                        </Link>
                                        {discussion.is_adult && (
                                            <div className="dark:bg-primary-600/20 bg-primary-600/30 flex items-center justify-center border-primary-700 border rounded-full px-2 py-0.5 text-primary-700 w-fit text-xs font-medium">
                                                NSFW <FaExclamationTriangle className="w-3 h-3 ml-2" />
                                            </div>
                                        )}
                                        {discussion.is_spoiler && (
                                            <div className="dark:bg-primary-600/20 bg-primary-600/30 flex items-center justify-center border-primary-700 border rounded-full px-2 py-0.5 text-primary-700 w-fit text-xs font-medium">
                                                SPOILER
                                                <FaExclamationTriangle className="w-3 h-3 ml-2" />
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-sm font-medium">{new Date(discussion.date).toLocaleDateString("pt-BR")}</span>
                                </div>
                                <h2 className="text-3xl font-bold">{discussion.title}</h2>
                                <p className="text-md mt-3">{discussion.description}</p>
                            </div>
                            <div className={`flex ${discussion.author.toLowerCase() === username.toLowerCase() ? "justify-between" : "justify-end"} items-center`}>
                                {discussion.author.toLowerCase() === username.toLowerCase() && (
                                    <span
                                        className="bg-primary-600 text-white px-4 py-2 rounded-md cursor-pointer transition hover:bg-primary-700 w-fit h-fit self-end"
                                        onClick={() => setDeleteModal(true)}
                                    >
                                        <FaTrash className="w-5 h-5" />
                                    </span>
                                )}
                                <div className="flex self-end mt-8 gap-6">
                                    <div className="flex gap-1 items-center">
                                        <FaRegCommentDots className="w-5 h-5" />
                                        <span className="text-sm font-medium">
                                            {comments.length} Comentário{comments.length === 1 ? "" : "s"}
                                        </span>
                                    </div>
                                    <div className={`flex gap-1 items-center cursor-pointer transition ${localIsLiked ? "text-primary-600" : "hover:text-primary-600"}`} onClick={handleLikeDiscussion}>
                                        {localIsLiked ? <FaThumbsUp className="w-5 h-5" /> : <FaRegThumbsUp className="w-5 h-5" />}
                                        <span className="text-sm font-medium select-none">
                                            {localLikes} Curtida{localLikes === 1 ? "" : "s"}
                                        </span>
                                    </div>
                                    <div
                                        className={`flex gap-1 items-center cursor-pointer ${
                                            localIsBookMarked || discussion.author.toLowerCase() === username.toLowerCase() ? "text-primary-600" : "transition hover:text-primary-600"
                                        }`}
                                        onClick={handleBookmark}
                                    >
                                        {localIsBookMarked || discussion.author.toLowerCase() === username.toLowerCase() ? <FaBookmark className="w-5 h-5" /> : <FaRegBookmark className="w-5 h-5" />}
                                        <span className="text-sm font-medium select-none">
                                            {localBookmarks} Marcaç{localBookmarks === 1 ? "ão" : "ões"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col bg-[#F1F5FA] dark:bg-[#253449] text-gray-600 dark:text-white py-12 w-full rounded-lg px-12 justify-center gap-4">
                    <h2 className="text-2xl font-bold">Comentários</h2>
                    <div className="flex mt-4 gap-4 relative">
                        <textarea
                            className="flex-grow border border-gray-300 dark:bg-transparent dark:border-2 rounded-lg px-4 py-2 min-h-[100px]"
                            placeholder="Escreva um comentário..."
                            rows={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg absolute right-4 bottom-3" onClick={handleCommentDiscussion}>
                            Publicar
                        </button>
                    </div>
                    <div className="flex flex-col gap-2 mt-8">
                        {comments?.map((comment: any) => (
                            <Comment
                                key={comment.id_comment}
                                id={comment.id_comment}
                                author={comment.author}
                                date={new Date(comment.date).toLocaleDateString("pt-BR")}
                                comment={comment.description}
                                answers={comment.qty_answers}
                                likes={comment.likes}
                                isAuthor={comment.author.toLowerCase() === username.toLowerCase()}
                                isLiked={comment.is_liked}
                                handleDeleteCommment={handleDeleteCommment}
                            />
                        ))}
                        {comments?.length === 0 && (
                            <div className="flex flex-col items-center justify-center pb-4 text-gray-600 dark:text-white">
                                <h2 className="text-3xl font-bold pb-2">Nenhum comentário encontrado...</h2>
                                <p className="text-lg text-center pb-4">Seja o primeiro a comentar!</p>
                                <Lottie animationData={Empty} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

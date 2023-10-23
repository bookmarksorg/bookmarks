import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaRegCommentDots, FaRegThumbsUp, FaRegBookmark, FaStar, FaBookmark, FaThumbsUp } from "react-icons/fa6";

interface PostCardProps {
    title: string;
    description: string;
    author: string;
    bookId?: string;
    date: string;
    isReview?: boolean;
    rating?: number;
    discussionId?: string;
    likes?: number;
    comments?: number;
    bookmarks?: number;
    isSpoiler?: boolean;
    isAdult?: boolean;
    isBookMarked?: boolean;
    isLiked?: boolean;
    isAuthor?: boolean;
    refresh?: () => void;
}

export default function PostCard({
    title,
    description,
    author,
    bookId,
    date,
    isReview,
    rating,
    discussionId,
    likes,
    comments,
    bookmarks,
    isSpoiler,
    isAdult,
    isBookMarked,
    isLiked,
    isAuthor,
    refresh,
}: PostCardProps) {
    const { data } = useSession();
    const [book, setBook] = useState("");
    const [isUnderage, setIsUnderage] = useState(false);
    const [localIsLiked, setLocalIsLiked] = useState(isLiked || false);
    const [localIsBookMarked, setLocalIsBookMarked] = useState(isBookMarked || false);
    const [localLikes, setLocalLikes] = useState(likes || 0);
    const [localBookmarks, setLocalBookmarks] = useState(bookmarks || 0);

    useEffect(() => {
        async function getBook() {
            if (!bookId) return;
            const { data: book } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${data?.user?.image}`,
                },
            });
            setBook(book.title);
        }

        async function getUser() {
            const { data: user } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
                headers: {
                    Authorization: `Bearer ${data?.user?.image}`,
                },
            });
            if (user.date_birth) {
                setIsUnderage(new Date().getFullYear() - new Date(user.date_birth).getFullYear() < 18);
            }
        }

        if (data?.user?.image && bookId) getBook();
        if (data?.user?.image) getUser();
    }, [data, bookId]);

    async function handleLike() {
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
        if (isAuthor) return toast.error("Você não pode remover seu próprio post dos bookmarks", { className: "text-center" });
        const { data: bookmark } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/discussions/${discussionId}/bookmark/`, {
            headers: {
                Authorization: `Bearer ${data?.user?.image}`,
            },
        });
        if (bookmark.is_tagged) toast.success("Post adicionado aos bookmarks");
        else toast.success("Post removido dos bookmarks");
        setLocalIsBookMarked(bookmark.is_tagged);
        setLocalBookmarks(localBookmarks + (bookmark.is_tagged ? 1 : -1));
        if (refresh) refresh();
    }

    return (
        <div className="flex relative">
            {isUnderage && isAdult && (
                <div className="absolute inset-0 flex justify-center items-center z-10 ">
                    <div className="flex flex-col items-center bg-primary-600/25 text-primary-700 py-4 px-10 rounded-xl border-primary-700 border-2 mt-5">
                        <FaExclamationTriangle className="w-6 h-6 mb-3 mt-1" />
                        <h1 className="text-lg font-bold">Você é menor de idade</h1>
                        <span className="text-xs font-medium">Você não pode ver conteúdos NSFW</span>
                    </div>
                </div>
            )}
            <div
                className={`flex flex-col mt-4 bg-white dark:bg-[#2D3F59] text-gray-600 dark:text-white/90 rounded-md px-8 ${isReview ? "py-8" : "py-6"} w-full ${
                    isUnderage && isAdult ? "blur-sm" : ""
                }`}
            >
                <div className="flex justify-between mb-4">
                    <div className="flex gap-2 items-center">
                        <Link href={`/profile/${author}`} className="text-sm font-bold hover:underline cursor-pointer">
                            {author}
                        </Link>
                        {rating && (
                            <span className="text-orange-400">
                                {Array.from({ length: rating }).map((_, index) => (
                                    <FaStar key={index} className="w-4 h-4 inline-block mr-1 -mt-1" />
                                ))}
                                {Array.from({ length: 5 - rating }).map((_, index) => (
                                    <FaStar key={index} className="w-4 h-4 inline-block mr-1 -mt-1 text-gray-300" />
                                ))}
                            </span>
                        )}
                        {isAdult && (
                            <div className="dark:bg-primary-600/20 bg-primary-600/30 flex items-center justify-center border-primary-700 border rounded-full px-2 py-0.5 text-primary-700 w-fit text-xs font-medium">
                                NSFW <FaExclamationTriangle className="w-3 h-3 ml-2" />
                            </div>
                        )}
                        {isSpoiler && (
                            <div className="dark:bg-primary-600/20 bg-primary-600/30 flex items-center justify-center border-primary-700 border rounded-full px-2 py-0.5 text-primary-700 w-fit text-xs font-medium">
                                SPOILER
                                <FaExclamationTriangle className="w-3 h-3 ml-2" />
                            </div>
                        )}
                    </div>
                    <span className="text-sm font-semibold">{date}</span>
                </div>
                {book && (
                    <Link href={`/books/${bookId}`} className="text-sm font-bold text-primary-600 hover:underline cursor-pointer w-fit">
                        {book}
                    </Link>
                )}
                {isReview ? (
                    <h1 className="text-2xl font-bold mt-2">{title}</h1>
                ) : (
                    <Link href={`/books/${bookId}/discussions/${discussionId}`} className="text-lg font-bold">
                        {title}
                    </Link>
                )}
                <span className="text-sm font-medium mt-3">{description}</span>
                {!isReview && (
                    <div className="flex justify-end mt-8 gap-6">
                        <Link href={`/books/${bookId}/discussions/${discussionId}`} className="flex gap-1 items-center cursor-pointer transition hover:text-primary-600">
                            <FaRegCommentDots className="w-5 h-5" />
                            <span className="text-sm font-medium">
                                {comments} Comentário{comments === 1 ? "" : "s"}
                            </span>
                        </Link>
                        <div className={`flex gap-1 items-center cursor-pointer transition ${localIsLiked ? "text-primary-600" : "hover:text-primary-600"}`} onClick={handleLike}>
                            {localIsLiked ? <FaThumbsUp className="w-5 h-5" /> : <FaRegThumbsUp className="w-5 h-5" />}
                            <span className="text-sm font-medium select-none">
                                {localLikes} Curtida{localLikes === 1 ? "" : "s"}
                            </span>
                        </div>
                        <div className={`flex gap-1 items-center cursor-pointer ${localIsBookMarked || isAuthor ? "text-primary-600" : "transition hover:text-primary-600"}`} onClick={handleBookmark}>
                            {localIsBookMarked || isAuthor ? <FaBookmark className="w-5 h-5" /> : <FaRegBookmark className="w-5 h-5" />}
                            <span className="text-sm font-medium select-none">
                                {localBookmarks} Marcaç{localBookmarks === 1 ? "ão" : "ões"}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

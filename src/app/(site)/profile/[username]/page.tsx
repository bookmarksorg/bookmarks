"use client";

import Comment from "@/components/Comment";
import Header from "@/components/Header";
import { ProfileModal } from "@/components/Home/ProfileModal";
import Book from "@/components/Library/Book";
import Loading from "@/components/Loading";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar/Sidebar";
import axios from "axios";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";

type FeedStatus = "bookmarks" | "books" | "comments" | "discussions" | "reviews";

export default function Profile() {
    const [isUser, setIsUser] = useState<boolean>(false);
    const [feedStatus, setFeedStatus] = useState<FeedStatus>("bookmarks");
    const [user, setUser] = useState<any>({});
    const { data } = useSession();
    const [isLoading, setIsLoading] = useState(true);
    const [localBookmarks, setLocalBookmarks] = useState<any[]>([]);
    const [profileModal, setProfileModal] = useState(false);

    const url = usePathname().toLowerCase();

    const colors: { [key: string]: string } = {
        Terror: "bg-[#990000] text-white", // Dark Red
        Drama: "bg-[#FF5733] text-white", // Deep Orange
        Thriller: "bg-[#FF6600] text-white", // Intense Orange
        Musical: "bg-[#FFCC00] text-gray-700", // Vibrant Yellow
        Romance: "bg-[#FFFF99] text-gray-700", // Soft Yellow
        Fantasy: "bg-[#33FF66] text-gray-700", // Enchanted Green
        Western: "bg-[#99FF66] text-gray-700", // Desert Green
        War: "bg-[#353628] text-white", // Military Green
        Action: "bg-[#0099FF] text-gray-700", // Dynamic Blue
        Sport: "bg-[#33CCFF] text-white", // Energetic Blue
        Medicine: "bg-[#3399FF] text-white", // Healing Blue
        "Sci-Fi": "bg-[#3366CC] text-white", // Futuristic Blue
        Documentary: "bg-[#000066] text-white", // Thoughtful Navy
        Comedy: "bg-[#9900CC] text-white", // Playful Purple
        Family: "bg-[#CC99FF] text-white", // Friendly Lavender
    };

    useEffect(() => {
        setIsLoading(true);
        async function getUser() {
            const { data: user } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${url.split("/")[2]}/user`, {
                headers: {
                    Authorization: `Bearer ${data?.user?.image}`,
                },
            });

            setUser(user);
            setLocalBookmarks(user.bookmarks);
        }

        if (data && data.user) {
            getUser();
            if (url === `/profile/${data.user.name}`) setIsUser(true);
        }
        setIsLoading(false);
    }, [data, url]);

    const handleFeedStatus = (value: FeedStatus) => {
        setFeedStatus(value);
    };

    async function refresh() {
        const { data: user } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
            headers: {
                Authorization: `Bearer ${data?.user?.image}`,
            },
        });
        setLocalBookmarks(user.bookmarks);
    }

    async function refreshUser() {
        const { data: user } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${url.split("/")[2]}/user`, {
            headers: {
                Authorization: `Bearer ${data?.user?.image}`,
            },
        });

        setUser(user);
        setLocalBookmarks(user.bookmarks);
    }

    async function handleDeleteCommment(id: string) {
        if (!data?.user?.image) return;
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/comments/${id}/`, {
            headers: {
                Authorization: `Bearer ${data?.user?.image}`,
            },
        });
        toast.success("Comentário excluído com sucesso");
        refresh();
    }

    return (
        <div className="flex flex-col flex-grow p-8 pl-12 gap-8 bg-[#C4CCD8] dark:bg-[#1C2635] text-gray-600 dark:text-white overflow-y-auto">
            {isLoading && <Loading />}
            <ProfileModal isOpen={profileModal} setModalIsOpen={setProfileModal} refresh={refreshUser} />
            <div className="flex flex-col bg-[#F1F5FA] dark:bg-[#253449] mt-12 pt-6 pb-8 px-20 rounded-lg h-fit relative">
                {/* photo and change bio */}
                <div className="flex">
                    <div className="flex bg-primary-700 h-32 w-32 border-[3px] border-white dark:border-[#253449] text-white rounded-full items-center justify-center text-6xl absolute left-20 -top-14">
                        {user.username && user.username[0].toUpperCase()}
                    </div>
                </div>
                {/* name and points */}
                <div className="flex mt-20 items-center justify-between">
                    <div className="flex gap-8 items-center">
                        <h2 className="text-3xl font-medium">{user.username}</h2>
                        <span className="text-xl text-primary-600">{user?.points} pts</span>
                    </div>
                    {isUser && (
                        <button
                            onClick={() => setProfileModal(true)}
                            className="flex self-end items-center gap-3 px-5 py-2 rounded-lg bg-primary-600 text-white transition hover:brightness-105 font-semibold"
                        >
                            <FaEdit />
                            Editar perfil
                        </button>
                    )}
                </div>
                {/* favorite genres */}
                <div className="flex mt-10 gap-3">
                    {user?.genres?.map((genre: { id_gender: number; name: string }) => (
                        <span key={genre.id_gender} className={`flex text-md px-6 py-1 rounded-lg transition hover:brightness-90 cursor-pointer font-medium ${colors[genre.name]}`}>
                            {genre.name}
                        </span>
                    ))}
                    {user?.genres?.length === 0 && <span className="italic text-gray-400">Sem gêneros favoritos</span>}
                </div>
                {/* bio */}
                <div className="flex mt-6">
                    <p>{user?.description || <span className="italic text-gray-400">Sem descrição</span>}</p>
                </div>
            </div>
            <div className="flex flex-col bg-[#F1F5FA] dark:bg-[#253449] text-gray-500 dark:text-white rounded-lg py-3 pb-8">
                {/* another filter bar */}
                <div className="flex justify-between border-b-2 gap-2 border-b-[#D5D8DB] dark:border-b-[#4B5B73]">
                    <div
                        className={`flex justify-center flex-1 py-4 text-lg cursor-pointer border-b-4 border-transparent ${feedStatus === "bookmarks" ? "border-b-primary-700" : ""} transition`}
                        onClick={() => handleFeedStatus("bookmarks")}
                    >
                        <span className="ml-2 font-medium text-lg">Meus Bookmarks ({user?.bookmarks?.length})</span>
                    </div>
                    <div
                        className={`flex justify-center flex-1 py-4 text-lg cursor-pointer border-b-4 border-transparent ${feedStatus === "books" ? "border-b-primary-700" : ""} transition`}
                        onClick={() => handleFeedStatus("books")}
                    >
                        <span className="ml-2 font-medium text-lg">Livros favoritos ({user?.favorite_books?.length})</span>
                    </div>
                    <div
                        className={`flex justify-center flex-1 py-4 text-lg cursor-pointer border-b-4 border-transparent ${feedStatus === "comments" ? "border-b-primary-700" : ""} transition`}
                        onClick={() => handleFeedStatus("comments")}
                    >
                        <span className="ml-2 font-medium text-lg">Comentários ({user?.comments?.length})</span>
                    </div>
                    <div
                        className={`flex justify-center flex-1 py-4 text-lg cursor-pointer border-b-4 border-transparent ${feedStatus === "discussions" ? "border-b-primary-700" : ""} transition`}
                        onClick={() => handleFeedStatus("discussions")}
                    >
                        <span className="ml-2 font-medium text-lg">Minhas discussões ({user?.discussions?.length})</span>
                    </div>
                    <div
                        className={`flex justify-center flex-1 pr-2 py-4 text-lg cursor-pointer border-b-4 border-transparent ${feedStatus === "reviews" ? "border-b-primary-700" : ""} transition`}
                        onClick={() => handleFeedStatus("reviews")}
                    >
                        <span className="ml-2 font-medium text-lg">Minhas reviews ({user?.reviews?.length})</span>
                    </div>
                </div>
                {feedStatus === "bookmarks" && (
                    <div className="flex flex-col w-full px-12 mt-6 justify-center">
                        {user?.bookmarks?.map((bookmark: any) => (
                            <PostCard
                                key={bookmark.id_discussion}
                                author={bookmark.author}
                                bookId={bookmark.cod_ISBN}
                                title={bookmark.title}
                                description={bookmark.description}
                                date={new Date(bookmark.date).toLocaleDateString("pt-BR")}
                                discussionId={bookmark.id_discussion}
                                isAdult={bookmark.is_adult}
                                isSpoiler={bookmark.is_spoiler}
                                likes={bookmark.qty_likes}
                                comments={bookmark.qty_comments}
                                bookmarks={bookmark.qty_tags}
                                isBookMarked={bookmark.is_tagged}
                                isLiked={bookmark.is_liked}
                                isAuthor={bookmark.is_author}
                                refresh={refresh}
                            />
                        ))}

                        {user?.bookmarks?.length === 0 && <span className="italic text-center pt-8 pb-5 text-gray-400 text-lg">Sem bookmarks</span>}
                    </div>
                )}
                {feedStatus === "books" && (
                    <div className="grid grid-cols-5 px-12 mt-6 gap-8">
                        {user?.favorite_books?.map((book: any) => (
                            <Book key={book.cod_ISBN} book={book} noDetails={true} />
                        ))}
                        {user?.favorite_books?.length === 0 && <span className="italic col-span-5 text-center pt-8 pb-5 text-gray-400 text-lg">Sem livros favoritos</span>}
                    </div>
                )}
                {feedStatus === "comments" && (
                    <div className="flex flex-col w-full px-12 mt-6 justify-center">
                        {user?.comments?.map((comment: any) => (
                            <Comment
                                key={comment.id_comment}
                                id={comment.id_comment}
                                author={comment.author}
                                date={new Date(comment.date).toLocaleDateString("pt-BR")}
                                comment={comment.description}
                                qtyAnswers={comment.answers}
                                likes={comment.likes}
                                username={data?.user?.name || ""}
                                isLiked={comment.is_liked}
                                depth={0}
                                setIsLoading={setIsLoading}
                                isProfile={true}
                                linkDiscussion={`/books/${comment.book}/discussions/${comment.id_discussion}`}
                            />
                        ))}
                        {user?.comments?.length === 0 && <span className="italic text-center pt-8 pb-5 text-gray-400 text-lg">Sem comentários</span>}
                    </div>
                )}
                {feedStatus === "discussions" && (
                    <div className="flex flex-col w-full px-12 mt-6 justify-center">
                        {user?.discussions?.map((discussion: any) => (
                            <PostCard
                                key={discussion.id_discussion}
                                author={user?.username}
                                bookId={discussion.cod_ISBN}
                                title={discussion.title}
                                description={discussion.description}
                                date={new Date(discussion.date).toLocaleDateString("pt-BR")}
                                discussionId={discussion.id_discussion}
                                likes={discussion.qty_likes}
                                comments={discussion.qty_comments}
                                bookmarks={discussion.qty_tags}
                                isAdult={discussion.is_adult}
                                isSpoiler={discussion.is_spoiler}
                                isLiked={discussion.is_liked}
                                isAuthor={discussion.is_author}
                                isBookMarked={discussion.is_tagged}
                            />
                        ))}
                        {user?.discussions?.length === 0 && <span className="italic text-center pt-8 pb-5 text-gray-400 text-lg">Sem discussões</span>}
                    </div>
                )}
                {feedStatus === "reviews" && (
                    <div className="flex flex-col w-full px-12 mt-6 justify-center">
                        {user?.reviews?.map((review: any) => (
                            <PostCard
                                key={review.id_discussion}
                                author={user?.username}
                                bookId={review.cod_ISBN}
                                title={review.title}
                                description={review.description}
                                date={new Date(review.date).toLocaleDateString("pt-BR")}
                                discussionId={review.id_discussion}
                                isAdult={review.is_adult}
                                isSpoiler={review.is_spoiler}
                                isReview
                                rating={review.rating}
                            />
                        ))}
                        {user?.reviews?.length === 0 && <span className="italic text-center pt-8 pb-5 text-gray-400 text-lg">Sem reviews</span>}
                    </div>
                )}
                {feedStatus !== "discussions" && user?.tagged?.length > 0 && (
                    <button className="flex items-center self-center text-lg py-2 px-10 mt-10 rounded-lg bg-primary-600 text-white transition hover:brightness-105 font-semibold">Mostrar mais</button>
                )}
            </div>
        </div>
    );
}

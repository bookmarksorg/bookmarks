"use client";

import Comment from "@/components/Comment";
import Header from "@/components/Header";
import Book from "@/components/Library/Book";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar/Sidebar";
import axios from "axios";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

type FeedStatus = "bookmarks" | "books" | "comments" | "discussions";

export default function Profile() {
    const [isUser, setIsUser] = useState<boolean>(false);
    const [feedStatus, setFeedStatus] = useState<FeedStatus>("bookmarks");
    const [user, setUser] = useState<any>({});
    const { data } = useSession();

    const url = usePathname().toLowerCase();

    const colors: { [key: string]: string } = {
        Terror: "bg-[#FF0000] text-white", // Red
        Drama: "bg-[#FF5733] text-white", // Orange
        Thriller: "bg-[#FFAC33] text-white", // Dark Orange
        Musical: "bg-[#FFC300] text-gray-700", // Yellow
        Romance: "bg-[#FFEE33] text-gray-700", // Light Yellow
        Fantasy: "bg-[#33FF57] text-gray-700", // Green
        Western: "bg-[#33FFAC] text-gray-700", // Light Green
        War: "bg-[#33FFC3] text-gray-700", // Cyan
        Action: "bg-[#33FFEE] text-gray-700", // Light Blue
        Sport: "bg-[#33ACFF] text-white", // Sky Blue
        Medicine: "bg-[#338EFF] text-white", // Deep Blue
        "Sci-Fi": "bg-[#33C3FF] text-white", // Blue-Gray
        Documentary: "bg-[#3363FF] text-white", // Dark Blue
        Comedy: "bg-[#5733FF] text-white", // Purple
        Family: "bg-[#AC33FF] text-white", // Lavender
    };

    useEffect(() => {
        async function getUser() {
            const { data: user } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
                headers: {
                    Authorization: `Bearer ${data?.user?.image}`,
                },
            });
            console.log(user);
            setUser(user);
        }

        if (data && data.user) {
            getUser();
            if (url === `/profile/${data.user.name}`) setIsUser(true);
        }
    }, [data, url]);

    const handleFeedStatus = (value: FeedStatus) => {
        setFeedStatus(value);
    };

    return (
        <div className="flex flex-col flex-grow p-8 pl-12 gap-8 bg-[#C4CCD8] dark:bg-[#1C2635] text-gray-600 dark:text-white overflow-y-auto">
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
                        <button className="flex self-end items-center gap-3 px-5 py-2 rounded-lg bg-primary-600 text-white transition hover:brightness-105 font-semibold">
                            <FaEdit />
                            Editar perfil
                        </button>
                    )}
                </div>
                {/* favorite genres */}
                <div className="flex mt-10 gap-3">
                    {user?.genres?.map((genre: { id_gender: number; name: string }) => (
                        <span key={genre.id_gender} className={`flex text-md px-6 py-1 rounded-lg transition hover:brightness-90 cursor-pointer ${colors[genre.name]}`}>
                            {genre.name}
                        </span>
                    ))}
                </div>
                {/* bio */}
                <div className="flex mt-6">
                    <p>{user?.description || <span className="italic text-gray-400">Sem descrição</span>}</p>
                </div>
            </div>
            <div className="flex flex-col bg-[#F1F5FA] dark:bg-[#253449] text-gray-500 dark:text-white rounded-lg py-3 pb-8">
                {/* another filter bar */}
                <div className="flex border-b-2 border-b-[#D5D8DB] dark:border-b-[#4B5B73]">
                    <div
                        className={`flex px-8 py-4 text-lg cursor-pointer border-b-4 border-transparent ${feedStatus === "bookmarks" ? "border-b-primary-700" : ""} transition`}
                        onClick={() => handleFeedStatus("bookmarks")}
                    >
                        <span className="ml-2 font-mediumtext-lg">Meus Bookmarks ({user?.bookmarks?.length})</span>
                    </div>
                    <div
                        className={`flex px-4 py-4 text-lg cursor-pointer border-b-4 border-transparent ${feedStatus === "books" ? "border-b-primary-700" : ""} transition`}
                        onClick={() => handleFeedStatus("books")}
                    >
                        <span className="ml-2 font-medium  text-lg">Livros favoritos ({user?.favorite_books?.length})</span>
                    </div>
                    <div
                        className={`flex px-4 py-4 text-lg cursor-pointer border-b-4 border-transparent ${feedStatus === "comments" ? "border-b-primary-700" : ""} transition`}
                        onClick={() => handleFeedStatus("comments")}
                    >
                        <span className="ml-2 font-medium text-lg">Comentários ({user?.comments?.length})</span>
                    </div>
                    <div
                        className={`flex px-4 py-4 text-lg cursor-pointer border-b-4 border-transparent ${feedStatus === "discussions" ? "border-b-primary-700" : ""} transition`}
                        onClick={() => handleFeedStatus("discussions")}
                    >
                        <span className="ml-2 font-medium text-lg">Minhas discussões ({user?.discussions?.length})</span>
                    </div>
                </div>
                {feedStatus === "bookmarks" && (
                    <div className="flex flex-col w-full px-12 mt-6 justify-center">
                        {user?.bookmarks?.map((bookmark: any) => (
                            <PostCard
                                key={bookmark.id_bookmark}
                                author={bookmark.author}
                                bookId={bookmark.cod_ISBN}
                                title={bookmark.title}
                                description={bookmark.description}
                                date={new Date(bookmark.date).toLocaleDateString("pt-BR")}
                                discussionId={bookmark.id_discussion}
                                isAdult={bookmark.is_adult}
                                isSpoiler={bookmark.is_spoiler}
                                isBookMarked
                            />
                        ))}

                        {user?.bookmarks?.length === 0 && <span className="italic text-center pt-8 pb-5 text-gray-400">Sem bookmarks</span>}
                    </div>
                )}
                {feedStatus === "books" && (
                    <div className="grid grid-cols-5 px-12 mt-6 gap-8">
                        {user?.favorite_books?.map((book: any) => (
                            <Book key={book.cod_ISBN} book={book} noDetails={true} />
                        ))}
                        {user?.favorite_books?.length === 0 && <span className="italic col-span-5 text-center pt-8 pb-5 text-gray-400">Sem livros favoritos</span>}
                    </div>
                )}
                {feedStatus === "comments" && (
                    <div className="flex flex-col w-full px-12 mt-6 justify-center">
                        {user?.comments?.map((comment: any) => (
                            <Comment key={comment.id_comment} author={user?.username} date={comment.date} comment={comment.comment} answers={comment.answers} likes={comment.likes} />
                        ))}
                        {user?.comments?.length === 0 && <span className="italic text-center pt-8 pb-5 text-gray-400">Sem comentários</span>}
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
                                likes={discussion.likes}
                                comments={discussion.comments}
                                bookmarks={discussion.bookmarks}
                                isAdult={discussion.is_adult}
                                isSpoiler={discussion.is_spoiler}
                                isBookMarked
                            />
                        ))}
                    </div>
                )}
                {feedStatus !== "discussions" && user?.tagged?.length > 0 && (
                    <button className="flex items-center self-center text-lg py-2 px-10 mt-10 rounded-lg bg-primary-600 text-white transition hover:brightness-105 font-semibold">Mostrar mais</button>
                )}
            </div>
        </div>
    );
}

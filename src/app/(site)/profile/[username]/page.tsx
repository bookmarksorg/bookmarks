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
                        <span className="ml-2 font-mediumtext-lg">Meus Bookmarks ({user?.tagged?.length})</span>
                    </div>
                    <div
                        className={`flex px-4 py-4 text-lg cursor-pointer border-b-4 border-transparent ${feedStatus === "books" ? "border-b-primary-700" : ""} transition`}
                        onClick={() => handleFeedStatus("books")}
                    >
                        <span className="ml-2 font-medium  text-lg">Livros favoritos ({user?.user?.favorite_books?.length})</span>
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
                        {/* <PostCard
                                    author="Iasminborbita"
                                    book="Oyasumi Punpun"
                                    bookId="z7b8w0fkh0"
                                    title="Is Punpun actually a bird?"
                                    description="I'm not sure if Punpun is a bird or not, does anyone know?"
                                    date="15/11/2022"
                                    discussionId="h6s8h0d8b9"
                                    isBookMarked
                                />
                                <PostCard
                                    author="thegreat_alex"
                                    book="The Hunger Games"
                                    bookId="c3x5jiogs9"
                                    title="Katniss and Peeta should have died"
                                    description="I think Katniss and Peeta should have died in the end of the book, what do you think?"
                                    date="28/02/2023"
                                    discussionId="x7v6a9g3j1"
                                    isBookMarked
                                />
                                <PostCard
                                    author="Iasminborbita"
                                    book="Oyasumi Punpun"
                                    bookId="z7b8w0fkh0"
                                    title="Is Punpun actually a bird?"
                                    description="I'm not sure if Punpun is a bird or not, does anyone know?"
                                    date="15/11/2022"
                                    discussionId="h6s8h0d8b9"
                                    isBookMarked
                                />
                                <PostCard
                                    author="thegreat_alex"
                                    book="The Hunger Games"
                                    bookId="c3x5jiogs9"
                                    title="Katniss and Peeta should have died"
                                    description="I think Katniss and Peeta should have died in the end of the book, what do you think?"
                                    date="28/02/2023"
                                    discussionId="x7v6a9g3j1"
                                    isBookMarked
                                />
                                <PostCard
                                    author="Iasminborbita"
                                    book="Oyasumi Punpun"
                                    bookId="z7b8w0fkh0"
                                    title="Is Punpun actually a bird?"
                                    description="I'm not sure if Punpun is a bird or not, does anyone know?"
                                    date="15/11/2022"
                                    discussionId="h6s8h0d8b9"
                                    isBookMarked
                                /> */}
                    </div>
                )}
                {feedStatus === "books" && (
                    <div className="grid grid-cols-5 px-12 mt-6 gap-8">
                        {/* <Book id="c3x5jiogs9" image="https://m.media-amazon.com/images/I/614SwlZNtJL._AC_UF1000,1000_QL80_.jpg" noDetails={true} />
                                <Book id="z7b8w0fkh0" image="https://m.media-amazon.com/images/I/91k68MKPbNL._AC_UF1000,1000_QL80_.jpg" noDetails={true} />
                                <Book id="g6h34ui3w4" image="https://m.media-amazon.com/images/I/81tM68Xn66L._AC_UF1000,1000_QL80_.jpg" noDetails={true} />
                                <Book id="m53ynos09g" image="https://m.media-amazon.com/images/I/71HbYElfY0L._AC_UF1000,1000_QL80_.jpg" noDetails={true} />
                                <Book id="n3ui4tn3tm" image="https://m.media-amazon.com/images/I/91LptBSFxQL._AC_UF1000,1000_QL80_.jpg" noDetails={true} />
                                <Book id="z7b8w0fkh0" image="https://m.media-amazon.com/images/I/91k68MKPbNL._AC_UF1000,1000_QL80_.jpg" noDetails={true} />
                                <Book id="n3ui4tn3tm" image="https://m.media-amazon.com/images/I/91LptBSFxQL._AC_UF1000,1000_QL80_.jpg" noDetails={true} />
                                <Book id="m53ynos09g" image="https://m.media-amazon.com/images/I/71HbYElfY0L._AC_UF1000,1000_QL80_.jpg" noDetails={true} />
                                <Book id="g6h34ui3w4" image="https://m.media-amazon.com/images/I/81tM68Xn66L._AC_UF1000,1000_QL80_.jpg" noDetails={true} />
                                <Book id="c3x5jiogs9" image="https://m.media-amazon.com/images/I/614SwlZNtJL._AC_UF1000,1000_QL80_.jpg" noDetails={true} /> */}
                    </div>
                )}
                {feedStatus === "comments" && (
                    <div className="flex flex-col w-full px-12 mt-6 justify-center">
                        {/* <Comment
                                    author={username}
                                    date="06/09/6969"
                                    comment="I think that I don't agree with this thing that you said, because I think that this is not true, and I think that you are wrong."
                                    answers="467"
                                    likes="69"
                                />
                                <Comment
                                    author={username}
                                    date="07/07/2007"
                                    comment="You are right, I think that you are right, and I think that you are the best person in the world, and I think that you are the best person in the world, and I think that you are the best person in the world."
                                    answers="999"
                                    likes="999"
                                />
                                <Comment
                                    author={username}
                                    date="06/09/6969"
                                    comment="I think that I don't agree with this thing that you said, because I think that this is not true, and I think that you are wrong."
                                    answers="467"
                                    likes="69"
                                />
                                <Comment
                                    author={username}
                                    date="07/07/2007"
                                    comment="You are right, I think that you are right, and I think that you are the best person in the world, and I think that you are the best person in the world, and I think that you are the best person in the world."
                                    answers="999"
                                    likes="999"
                                />
                                <Comment
                                    author={username}
                                    date="07/07/2007"
                                    comment="You are right, I think that you are right, and I think that you are the best person in the world, and I think that you are the best person in the world, and I think that you are the best person in the world."
                                    answers="999"
                                    likes="999"
                                /> */}
                    </div>
                )}
                {feedStatus === "discussions" && (
                    <div className="flex flex-col w-full px-12 mt-6 justify-center">
                        {/* <PostCard
                                    author={username}
                                    book="Oyasumi Punpun"
                                    bookId="z7b8w0fkh0"
                                    title="Is Punpun actually a bird?"
                                    description="I'm not sure if Punpun is a bird or not, does anyone know?"
                                    date="15/11/2022"
                                    discussionId="h6s8h0d8b9"
                                    isBookMarked
                                />
                                <PostCard
                                    author={username}
                                    book="The Hunger Games"
                                    bookId="c3x5jiogs9"
                                    title="Katniss and Peeta should have died"
                                    description="I think Katniss and Peeta should have died in the end of the book, what do you think?"
                                    date="28/02/2023"
                                    discussionId="x7v6a9g3j1"
                                    isBookMarked
                                /> */}
                    </div>
                )}
                {feedStatus !== "discussions" && user?.tagged?.length > 0 && (
                    <button className="flex items-center self-center text-lg py-2 px-10 mt-10 rounded-lg bg-primary-600 text-white transition hover:brightness-105 font-semibold">Mostrar mais</button>
                )}
            </div>
        </div>
    );
}

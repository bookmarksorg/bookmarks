"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

type FeedStatus = "bookmarks" | "books" | "comments" | "discussions";

export default function Profile() {
    const [isUser, setIsUser] = useState<boolean>(true);
    const [feedStatus, setFeedStatus] = useState<FeedStatus>("bookmarks");

    const url = usePathname().toLowerCase();
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        if (url !== "/profile/jorge_pat") {
            setIsUser(false);
        }
        setUsername(url.split("/")[2]);
    }, [url]);

    const handleFeedStatus = (value: FeedStatus) => {
        setFeedStatus(value);
    };

    return (
        <div className="flex flex-col overflow-y-hidden">
            <Header />
            <div className="flex h-screen-header">
                <Sidebar />
                <div className="flex flex-col flex-grow p-8 pl-12 gap-8 bg-[#C4CCD8] overflow-y-auto">
                    <div className="flex flex-col bg-white mt-12 pt-6 pb-8 px-20 rounded-lg h-fit relative">
                        {/* photo and change bio */}
                        <div className="flex">
                            <div className="flex bg-primary-700 h-32 w-32 border-[3px] border-white text-white rounded-full items-center justify-center text-6xl absolute left-20 -top-14">J</div>
                        </div>
                        {/* name and points */}
                        <div className="flex mt-20 items-center justify-between text-gray-600">
                            <div className="flex gap-8 items-center">
                                <h2 className="text-3xl font-medium">{username}</h2>
                                <span className="text-xl text-primary-600">1000 pts</span>
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
                            <span className="flex text-md bg-primary-600/50 border border-primary-700 px-6 py-1 rounded-lg text-primary-700 transition hover:bg-primary-700 hover:text-white cursor-pointer">
                                Romance
                            </span>
                            <span className="flex text-md bg-secondary-600/50 border border-secondary-700 px-6 py-1 rounded-lg text-secondary-700 transition hover:bg-secondary-700 hover:text-white cursor-pointer">
                                Terror
                            </span>
                            <span className="flex text-md bg-[#7CD39A]/50 border border-[#7EC581] px-6 py-1 rounded-lg text-[#6fb672] transition hover:bg-[#7CD39A] hover:text-white cursor-pointer">
                                Aventura
                            </span>
                        </div>
                        {/* bio */}
                        <div className="flex mt-6">
                            <p className="text-gray-600">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quas molestiae id non aut eius magni unde laboriosam libero rerum culpa expedita, sequi iure sapiente
                                modi quam. Est, culpa, odio voluptate perferendis mollitia illo nobis nemo in optio molestiae temporibus excepturi. Ab expedita mollitia eos doloribus amet? Earum, ipsa
                                quod odio cumque blanditiis illo aut. Vel dolor esse facere praesentium adipisci dicta deserunt ex ipsum quibusdam! Provident nulla, error, dicta odit officiis incidunt
                                ducimus eius est molestias eaque illum! Sit sed aperiam nemo aliquam eos natus ducimus eaque officiis soluta! Quidem sint veritatis iusto at blanditiis vitae ad odit
                                temporibus?
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col bg-white rounded-lg py-3">
                        {/* another filter bar */}
                        <div className="flex border-b-2 border-b-[#D5D8DB]">
                            <div
                                className={`flex px-8 py-4 text-lg cursor-pointer border-b-4 border-transparent ${feedStatus === "bookmarks" ? "border-b-primary-700" : ""} transition`}
                                onClick={() => handleFeedStatus("bookmarks")}
                            >
                                <span className="ml-2 font-medium text-gray-500 text-lg">Meus Bookmarks (6)</span>
                            </div>
                            <div
                                className={`flex px-4 py-4 text-lg cursor-pointer border-b-4 border-transparent ${feedStatus === "books" ? "border-b-primary-700" : ""} transition`}
                                onClick={() => handleFeedStatus("books")}
                            >
                                <span className="ml-2 font-medium text-gray-500 text-lg">Livros favoritos (3)</span>
                            </div>
                            <div
                                className={`flex px-4 py-4 text-lg cursor-pointer border-b-4 border-transparent ${feedStatus === "comments" ? "border-b-primary-700" : ""} transition`}
                                onClick={() => handleFeedStatus("comments")}
                            >
                                <span className="ml-2 font-medium text-gray-500 text-lg">Comentários (12)</span>
                            </div>
                            <div
                                className={`flex px-4 py-4 text-lg cursor-pointer border-b-4 border-transparent ${feedStatus === "discussions" ? "border-b-primary-700" : ""} transition`}
                                onClick={() => handleFeedStatus("discussions")}
                            >
                                <span className="ml-2 font-medium text-gray-500 text-lg">Minhas discussões (0)</span>
                            </div>
                        </div>
                        {/* books */}
                        <div className="grid grid-cols-5 px-8 mt-8 gap-8">
                            <div className="flex flex-col w-48">
                                <div className="h-72 bg-secondary-700 rounded-lg cursor-pointer transition hover:brightness-110 text-white text-2xl px-7 items-center justify-center flex">
                                    Percy Jackson and the Olympians: The Lightning Thief
                                </div>
                            </div>
                            <div className="flex flex-col w-48">
                                <div className="h-72 bg-secondary-700 rounded-lg cursor-pointer transition hover:brightness-110 text-white text-2xl px-7 items-center justify-center flex">
                                    Oyasumi Punpun
                                </div>
                            </div>
                            <div className="flex flex-col w-48">
                                <div className="h-72 bg-secondary-700 rounded-lg cursor-pointer transition hover:brightness-110 text-white text-2xl px-7 items-center justify-center flex">
                                    Star Wars: The High Republic: Light of the Jedi
                                </div>
                            </div>
                            <div className="flex flex-col w-48">
                                <div className="h-72 bg-secondary-700 rounded-lg cursor-pointer transition hover:brightness-110 text-white text-2xl px-7 items-center justify-center flex">
                                    The Hunger Games
                                </div>
                            </div>
                            <div className="flex flex-col w-48">
                                <div className="h-72 bg-secondary-700 rounded-lg cursor-pointer transition hover:brightness-110 text-white text-2xl px-7 items-center justify-center flex">
                                    Harry Potter and the Sorcerer&apos;s Stone
                                </div>
                            </div>
                            <div className="flex flex-col w-48">
                                <div className="h-72 bg-secondary-700 rounded-lg cursor-pointer transition hover:brightness-110 text-white text-2xl px-7 items-center justify-center flex">
                                    Percy Jackson and the Olympians: The Lightning Thief
                                </div>
                            </div>
                            <div className="flex flex-col w-48">
                                <div className="h-72 bg-secondary-700 rounded-lg cursor-pointer transition hover:brightness-110 text-white text-2xl px-7 items-center justify-center flex">
                                    Star Wars: The High Republic: Light of the Jedi
                                </div>
                            </div>
                            <div className="flex flex-col w-48">
                                <div className="h-72 bg-secondary-700 rounded-lg cursor-pointer transition hover:brightness-110 text-white text-2xl px-7 items-center justify-center flex">
                                    Oyasumi Punpun
                                </div>
                            </div>
                            <div className="flex flex-col w-48">
                                <div className="h-72 bg-secondary-700 rounded-lg cursor-pointer transition hover:brightness-110 text-white text-2xl px-7 items-center justify-center flex">
                                    Harry Potter and the Sorcerer&apos;s Stone
                                </div>
                            </div>
                            <div className="flex flex-col w-48">
                                <div className="h-72 bg-secondary-700 rounded-lg cursor-pointer transition hover:brightness-110 text-white text-2xl px-7 items-center justify-center flex">
                                    The Hunger Games
                                </div>
                            </div>
                        </div>
                        <button className="flex items-center self-center text-lg py-2 px-10 mt-10 mb-2 rounded-lg bg-primary-600 text-white transition hover:brightness-105 font-semibold">
                            Mostrar mais
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

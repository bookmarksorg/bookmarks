"use client";

import { useState } from "react";

import { FaComments, FaBookmark, FaSquarePlus } from "react-icons/fa6";

import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar/Sidebar";
import { GenresModal } from "@/components/Home/GenresModal";
import Leaderboard from "@/components/Home/Leaderboard";

export default function Home() {
    const [genresModal, setGenresModal] = useState(false);
    const [feedStatus, setFeedStatus] = useState<"discussions" | "bookmarks">("discussions");

    function handleFeedStatus() {
        if (feedStatus === "discussions") setFeedStatus("bookmarks");
        else setFeedStatus("discussions");
    }

    async function handleSaveGenres() {
        // TODO: save favorite genres from user

        setGenresModal(false);
    }

    return (
        <div className="flex flex-col overflow-y-hidden">
            <GenresModal isOpen={genresModal} onConfirm={() => handleSaveGenres()} setModalIsOpen={setGenresModal} />
            <Header />
            <div className="flex h-screen-header">
                <Sidebar />
                <div className="flex flex-grow p-8 pl-12 gap-8 bg-[#C4CCD8] overflow-y-auto">
                    {/* content */}
                    <div className="flex flex-col pt-2 pb-8 flex-[2] bg-[#F1F5FA] rounded-lg h-fit">
                        {/* bar */}
                        <div className="flex border-b-2 border-b-[#D5D8DB]">
                            <div
                                className={`flex px-8 py-4 text-lg cursor-pointer border-b-4 border-transparent ${feedStatus === "discussions" ? "border-b-primary-700" : ""} transition`}
                                onClick={() => handleFeedStatus()}
                            >
                                <FaComments className="w-8 h-8 text-[#00A79D]" />
                                <span className="ml-2 font-medium text-gray-500 text-lg">Minhas discussões</span>
                            </div>
                            <div
                                className={`flex px-4 py-4 text-lg cursor-pointer border-b-4 border-transparent ${feedStatus === "bookmarks" ? "border-b-primary-700" : ""} transition`}
                                onClick={() => handleFeedStatus()}
                            >
                                <FaBookmark className="w-6 h-6 text-[#F44336]" />
                                <span className="ml-2 font-medium text-gray-500 text-lg">Minhas marcações</span>
                            </div>
                        </div>
                        {/* content */}
                        <div className="flex justify-between px-8 pt-10 pb-2">
                            <h3 className="text-xl text-gray-600 font-bold">Atualizados recentemente</h3>
                            <div className="flex gap-2 px-5 py-3 -mt-3 transition hover:bg-[#7AD4A9] hover:text-white rounded-xl text-md font-medium text-gray-500 cursor-pointer group">
                                <FaSquarePlus className="w-6 h-6 text-[#7AD4A9] transition group-hover:text-white" />
                                Nova discussão
                            </div>
                        </div>
                        <div className="flex flex-col px-6">
                            <PostCard
                                author="Vitor_perei"
                                book="Harry Potter and the Sorcerer's Stone"
                                bookId="m53ynos09g"
                                title="Snape is Harry's father"
                                description="This is a serious description to know if Snape is Harry's father"
                                date="02/09/2023"
                            />
                        </div>
                        {/* content */}
                        <div className="flex justify-between px-8 pt-10 pb-2">
                            <h3 className="text-xl text-gray-600 font-bold">Sem atualizações</h3>
                        </div>
                        <div className="flex flex-col px-6">
                            <PostCard
                                author="Iasminborbita"
                                book="Oyasumi Punpun"
                                bookId="z7b8w0fkh0"
                                title="Is Punpun actually a bird?"
                                description="I'm not sure if Punpun is a bird or not, does anyone know?"
                                date="15/11/2022"
                            />
                            <PostCard
                                author="thegreat_alex"
                                book="The Hunger Games"
                                bookId="c3x5jiogs9"
                                title="Katniss and Peeta should have died"
                                description="I think Katniss and Peeta should have died in the end of the book, what do you think?"
                                date="28/02/2023"
                            />
                        </div>
                    </div>
                    <Leaderboard />
                </div>
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";

import { FaComments, FaBookmark, FaSquarePlus } from "react-icons/fa6";
import { FaCrown } from "react-icons/fa";
import { BiSolidCrown } from "react-icons/bi";

import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar/Sidebar";
import { CustomModal } from "@/components/CustomModal";

export default function Home() {
    const [genresModal, setGenresModal] = useState(false);
    const [feedStatus, setFeedStatus] = useState("discussions");

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
            <CustomModal isOpen={genresModal} onConfirm={() => handleSaveGenres()} setModalIsOpen={setGenresModal} />
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
                        <PostCard
                            author="Vitor_perei"
                            book="Dom Casmurro"
                            title="Capitu é mais corno que o joão?"
                            description="Essa é uma descrição séria pra saber qual dos personagens literários levou mais gaia"
                            date="25/04/2023"
                        />
                        {/* content */}
                        <div className="flex justify-between px-8 pt-10 pb-2">
                            <h3 className="text-xl text-gray-600 font-bold">Sem atualizações</h3>
                        </div>
                        <PostCard
                            author="Vitor_perei"
                            book="Dom Casmurro"
                            title="Capitu é mais corno que o joão?"
                            description="Essa é uma descrição séria pra saber qual dos personagens literários levou mais gaia"
                            date="25/04/2023"
                        />
                        <PostCard
                            author="Vitor_perei"
                            book="Dom Casmurro"
                            title="Capitu é mais corno que o joão?"
                            description="Essa é uma descrição séria pra saber qual dos personagens literários levou mais gaia"
                            date="25/04/2023"
                        />
                    </div>
                    {/* leaderboard */}
                    <div className="flex flex-col flex-1 h-fit bg-[#F1F5FA] rounded-md px-6 pb-5">
                        {/* title */}
                        <div className="flex flex-col items-center justify-center gap-2 text-2xl font-medium text-gray-600">
                            <FaCrown className="w-10 h-10 text-[#FFB743] self-center mt-4" />
                            Leaderboard
                        </div>
                        <div className="flex flex-col gap-3 mt-6">
                            <div className="flex flex-col bg-gray-200 w-full rounded-lg h-max">
                                <div className="flex items-center justify-between gap-2 font-medium text-gray-600 py-3 px-4">
                                    <div className="flex items-center">
                                        <BiSolidCrown size={22} className="text-[#FFB743]" />
                                        <span className="ml-3">Vitor_perei</span>
                                    </div>
                                    <span className="text-[#9D6B3C]">1000 pts</span>
                                </div>
                            </div>
                            <div className="flex flex-col bg-gray-200 w-full rounded-lg h-max">
                                <div className="flex items-center justify-between gap-2 font-medium text-gray-600 py-3 px-4">
                                    <div className="flex items-center">
                                        <BiSolidCrown size={22} className="text-[#48C8FF]" />
                                        <span className="ml-3">Vitor_perei</span>
                                    </div>
                                    <span className="text-[#9D6B3C]">1000 pts</span>
                                </div>
                            </div>
                            <div className="flex flex-col bg-gray-200 w-full rounded-lg h-max">
                                <div className="flex items-center justify-between gap-2 font-medium text-gray-600 py-3 px-4">
                                    <div className="flex items-center">
                                        <BiSolidCrown size={22} className="text-[#FF7A00]" />
                                        <span className="ml-3">Vitor_perei</span>
                                    </div>
                                    <span className="text-[#9D6B3C]">1000 pts</span>
                                </div>
                            </div>
                            <div className="flex flex-col bg-gray-200 w-full rounded-lg h-max">
                                <div className="flex items-center justify-between gap-2 font-medium text-gray-600 py-3 px-4">
                                    <div className="flex items-center">
                                        <span className="ml-1.5 font-bold text-gray-600">4</span>
                                        <span className="ml-3">Vitor_perei</span>
                                    </div>
                                    <span className="text-[#9D6B3C]">1000 pts</span>
                                </div>
                            </div>
                            <div className="flex flex-col bg-gray-200 w-full rounded-lg h-max">
                                <div className="flex items-center justify-between gap-2 font-medium text-gray-600 py-3 px-4">
                                    <div className="flex items-center">
                                        <span className="ml-1.5 font-bold text-gray-600">5</span>
                                        <span className="ml-3">Vitor_perei</span>
                                    </div>
                                    <span className="text-[#9D6B3C]">1000 pts</span>
                                </div>
                            </div>
                            <div className="flex flex-col bg-gray-200 w-full rounded-lg h-max">
                                <div className="flex items-center justify-between gap-2 font-medium text-gray-600 py-3 px-4">
                                    <div className="flex items-center">
                                        <span className="ml-1.5 font-bold text-gray-600">6</span>
                                        <span className="ml-3">Vitor_perei</span>
                                    </div>
                                    <span className="text-[#9D6B3C]">1000 pts</span>
                                </div>
                            </div>
                            <div className="flex flex-col bg-gray-200 w-full rounded-lg h-max">
                                <div className="flex items-center justify-between gap-2 font-medium text-gray-600 py-3 px-4">
                                    <div className="flex items-center">
                                        <span className="ml-1.5 font-bold text-gray-600">7</span>
                                        <span className="ml-3">Vitor_perei</span>
                                    </div>
                                    <span className="text-[#9D6B3C]">1000 pts</span>
                                </div>
                            </div>
                            <div className="flex flex-col bg-gray-200 w-full rounded-lg h-max">
                                <div className="flex items-center justify-between gap-2 font-medium text-gray-600 py-3 px-4">
                                    <div className="flex items-center">
                                        <span className="ml-1.5 font-bold text-gray-600">8</span>
                                        <span className="ml-3">Vitor_perei</span>
                                    </div>
                                    <span className="text-[#9D6B3C]">1000 pts</span>
                                </div>
                            </div>
                            <div className="flex flex-col bg-gray-200 w-full rounded-lg h-max">
                                <div className="flex items-center justify-between gap-2 font-medium text-gray-600 py-3 px-4">
                                    <div className="flex items-center">
                                        <span className="ml-1.5 font-bold text-gray-600">9</span>
                                        <span className="ml-3">Vitor_perei</span>
                                    </div>
                                    <span className="text-[#9D6B3C]">1000 pts</span>
                                </div>
                            </div>
                            <div className="flex flex-col bg-primary-600/30 w-full rounded-lg h-max">
                                <div className="flex items-center justify-between gap-2 font-medium text-gray-600 py-3 px-4">
                                    <div className="flex items-center">
                                        <span className="ml-1.5 font-bold text-primary-700">1002</span>
                                        <span className="ml-3">Vitor_perei</span>
                                    </div>
                                    <span className="text-[#9D6B3C]">1000 pts</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";

import { FaComment, FaBookmark, FaSquarePlus } from "react-icons/fa6";

import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar/Sidebar";
import { CustomModal } from "@/components/CustomModal";

export default function Home() {
    const [genresModal, setGenresModal] = useState(true);

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
                <div className="flex flex-grow p-8 gap-12 bg-[#C4CCD8] overflow-y-auto">
                    {/* content */}
                    <div className="flex flex-col flex-[2] py-4 pb-8 bg-[#F1F5FA] rounded-md h-fit">
                        {/* bar */}
                        <div className="flex border-b-2 px-4 border-b-[#D5D8DB] gap-8">
                            <div className="flex px-4 py-2 text-lg cursor-pointer border-b-4 border-transparent border-b-primary-700 transition">
                                <FaComment className="w-8 h-8 text-[#00A79D]" />
                                <span className="ml-2 font-medium text-gray-500 text-lg">Minhas discussões</span>
                            </div>
                            <div className="flex px-4 py-2 text-lg cursor-pointer border-b-4 border-transparent hover:border-b-primary-700 transition">
                                <FaBookmark className="w-7 h-7 text-[#F44336]" />
                                <span className="ml-2 font-medium text-gray-500 text-lg">Minhas marcações</span>
                            </div>
                        </div>
                        {/* content */}
                        <div className="flex justify-between px-8 pt-10 pb-2">
                            <h3 className="text-xl text-gray-600 font-bold">Atualizados recentemente</h3>
                            <div className="flex gap-2 px-8 py-3 -mt-3 transition hover:bg-[#d2ffe9] rounded-xl text-md font-medium text-gray-500 cursor-pointer">
                                <FaSquarePlus className="w-6 h-6 text-[#7AD4A9]" />
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
                    <div className="flex flex-col flex-1 bg-[#F1F5FA] rounded-md"></div>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";

import { FaComments, FaBookmark, FaSquarePlus } from "react-icons/fa6";

import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar/Sidebar";
import { GenresModal } from "@/components/Home/GenresModal";
import Leaderboard from "@/components/Home/Leaderboard";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Home() {
    const [genresModal, setGenresModal] = useState(false);
    const [feedStatus, setFeedStatus] = useState<"discussions" | "bookmarks">("discussions");
    const [genresSelected, setGenresSelected] = useState<string[]>([]);
    const [user, setUser] = useState<any>(null);
    const { data } = useSession();

    useEffect(() => {
        async function getUserGenres() {
            const { data: user } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
                headers: {
                    Authorization: `Bearer ${data?.user?.image}`,
                },
            });
            setUser(user);

            if (user.genres.length === 0 && localStorage.getItem("genres") !== "skipped") {
                setGenresModal(true);
            }
        }

        if (data?.user?.image) getUserGenres();
    }, [data]);

    function handleFeedStatus() {
        if (feedStatus === "discussions") setFeedStatus("bookmarks");
        else setFeedStatus("discussions");
    }

    async function handleSaveGenres() {
        await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/${user?.id_user}/`,
            {
                genres: genresSelected,
            },
            {
                headers: {
                    Authorization: `Bearer ${data?.user?.image}`,
                },
            }
        );

        if (genresSelected.length === 0) {
            toast.success("Você pode alterar seus gêneros a qualquer momento na página de perfil", { duration: 10000 });
            localStorage.setItem("genres", "skipped");
        } else toast.success("Gêneros salvos com sucesso!");
        setGenresModal(false);
    }

    return (
        <>
            <GenresModal genresSelected={genresSelected} setGenresSelected={setGenresSelected} isOpen={genresModal} onConfirm={() => handleSaveGenres()} setModalIsOpen={setGenresModal} />
            <div id="body" className="flex flex-grow p-8 pl-12 gap-8 bg-[#C4CCD8] dark:bg-[#1C2635] dark:text-white overflow-y-auto">
                {/* content */}
                <div className="flex flex-col pt-2 pb-8 flex-[2] bg-[#F1F5FA] dark:bg-[#253449] rounded-lg h-fit">
                    {/* bar */}
                    <div className="flex border-b-2 border-b-[#D5D8DB] dark:border-b-[#4B5B73] text-gray-500 dark:text-white">
                        <div
                            className={`flex px-8 py-4 text-lg cursor-pointer border-b-4 border-transparent ${feedStatus === "discussions" ? "border-b-primary-700" : ""} transition`}
                            onClick={() => handleFeedStatus()}
                        >
                            <FaComments className="w-8 h-8 text-[#00A79D]" />
                            <span className="ml-2 font-medium text-lg">Minhas discussões</span>
                        </div>
                        <div
                            className={`flex px-4 py-4 text-lg cursor-pointer border-b-4 border-transparent ${feedStatus === "bookmarks" ? "border-b-primary-700" : ""} transition`}
                            onClick={() => handleFeedStatus()}
                        >
                            <FaBookmark className="w-6 h-6 text-[#F44336]" />
                            <span className="ml-2 font-mediumtext-lg">Minhas marcações</span>
                        </div>
                    </div>
                    {/* content */}
                    <div className="flex justify-between px-8 pt-10 pb-2">
                        <h3 className="text-xl text-gray-600 dark:text-white/90 font-bold">Atualizados recentemente</h3>
                        <Link
                            href="/new"
                            className="flex gap-2 px-5 py-3 -mt-3 transition hover:bg-[#7AD4A9] hover:text-white dark:hover:bg-[#7ad4a8da] rounded-xl text-md font-medium text-gray-500 dark:text-white cursor-pointer group"
                        >
                            <FaSquarePlus className="w-6 h-6 text-[#7AD4A9] transition group-hover:text-white" />
                            Nova discussão
                        </Link>
                    </div>
                    <div className="flex flex-col px-6">
                        <PostCard
                            author="Jorge_pat"
                            book="Harry Potter and the Sorcerer's Stone"
                            bookId="m53ynos09g"
                            title="Snape is Harry's father"
                            description="This is a serious description to know if Snape is Harry's father"
                            date="02/09/2023"
                            discussionId="b8f9k3l1c5"
                        />
                    </div>
                    {/* content */}
                    <div className="flex justify-between px-8 pt-10 pb-2">
                        <h3 className="text-xl text-gray-600 dark:text-white/90 font-bold">Sem atualizações</h3>
                    </div>
                    <div className="flex flex-col px-6">
                        <PostCard
                            author="Iasminborbita"
                            book="Oyasumi Punpun"
                            bookId="z7b8w0fkh0"
                            title="Is Punpun actually a bird?"
                            description="I'm not sure if Punpun is a bird or not, does anyone know?"
                            date="15/11/2022"
                            discussionId="h6s8h0d8b9"
                        />
                        <PostCard
                            author="thegreat_alex"
                            book="The Hunger Games"
                            bookId="c3x5jiogs9"
                            title="Katniss and Peeta should have died"
                            description="I think Katniss and Peeta should have died in the end of the book, what do you think?"
                            date="28/02/2023"
                            discussionId="x7v6a9g3j1"
                        />
                    </div>
                </div>
                <Leaderboard />
            </div>
        </>
    );
}

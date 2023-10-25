"use client";

import { useEffect, useState } from "react";

import { FaComments, FaBookmark, FaSquarePlus } from "react-icons/fa6";

import PostCard from "@/components/PostCard";
import { GenresModal } from "@/components/Home/GenresModal";
import Leaderboard from "@/components/Home/Leaderboard";
import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import Lottie from "lottie-react";
import Empty from "@/assets/empty.json";

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [genresModal, setGenresModal] = useState(false);
    const [feedStatus, setFeedStatus] = useState<"discussions" | "bookmarks">("discussions");
    const [genresSelected, setGenresSelected] = useState<string[]>([]);
    const [user, setUser] = useState<any>(null);
    const { data } = useSession();

    useEffect(() => {
        setIsLoading(true);
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
        setIsLoading(false);
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
            toast.success("Você pode alterar seus gêneros a qualquer momento na página de perfil", { duration: 10000, className: "text-center" });
            localStorage.setItem("genres", "skipped");
        } else toast.success("Gêneros salvos com sucesso!");
        setGenresModal(false);
    }

    async function refresh() {
        const { data: user } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
            headers: {
                Authorization: `Bearer ${data?.user?.image}`,
            },
        });
        setUser(user);
    }

    return (
        <>
            {isLoading && <Loading />}
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
                        {feedStatus === "discussions"
                            ? user?.discussions?.map((discussion: any) => (
                                  <PostCard
                                      key={discussion.id_discussion}
                                      author={user?.username}
                                      bookId={discussion.cod_ISBN}
                                      title={discussion.title}
                                      description={discussion.description}
                                      date={new Date(discussion.date).toLocaleDateString("pt-BR")}
                                      discussionId={discussion.id_discussion}
                                      isAdult={discussion.is_adult}
                                      isSpoiler={discussion.is_spoiler}
                                      likes={discussion.qty_likes}
                                      comments={discussion.qty_comments}
                                      bookmarks={discussion.qty_tags}
                                      isBookMarked={discussion.is_tagged}
                                      isLiked={discussion.is_liked}
                                      isAuthor={discussion.is_author}
                                  />
                              ))
                            : user?.bookmarks.map((bookmark: any) => (
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
                        {((user?.discussions?.length === 0 && feedStatus === "discussions") || (user?.bookmarks?.length === 0 && feedStatus === "bookmarks")) && (
                            <div className="flex flex-col items-center justify-center pt-14 pb-4 text-gray-600 dark:text-white">
                                <h2 className="text-3xl font-bold pb-2">{feedStatus === "discussions" ? "Nenhuma discussão" : "Nenhuma marcação"}</h2>
                                <p className="text-lg text-center">Você ainda não {feedStatus === "discussions" ? "criou" : "marcou"} nenhuma discussão</p>
                                <Lottie animationData={Empty} />
                            </div>
                        )}
                    </div>
                </div>
                <Leaderboard />
            </div>
        </>
    );
}

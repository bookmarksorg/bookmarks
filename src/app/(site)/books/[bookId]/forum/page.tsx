"use client";

import MuiThemeProvider from "@/components/MuiThemeProvider";
import PostCard from "@/components/PostCard";
import { MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaBook, FaComments, FaFloppyDisk, FaRegStar, FaRegStarHalfStroke, FaStar } from "react-icons/fa6";

export default function Discussions() {
    const router = useRouter();
    const { bookId } = useParams();
    const id = bookId as string;
    const status = useSearchParams().get("status") === "discussions" ? "discussions" : "reviews";
    const [forumStatus, setForumStatus] = useState<"reviews" | "discussions">(status);
    const { data } = useSession();
    const [reviews, setReviews] = useState<any[]>();
    const [discussions, setDiscussions] = useState<any[]>();
    const [user, setUser] = useState<any>({});
    const [discussionsSort, setDiscussionsSort] = useState<string>("");

    const handleDiscussionSort = (event: any) => {
        setDiscussionsSort(event.target.value);
        console.log(event.target.value);
    };

    const [book, setBook] = useState<any>({
        title: "",
        cover: "",
        rating: 0,
        fullStars: [],
        emptyStars: [],
        hasHalfStar: false,
    });

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

        async function getBook() {
            if (!bookId) return;
            const { data: book } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${data?.user?.image}`,
                },
            });
            console.log(book);
            book.floatStars = book.rating - Math.floor(book.rating) >= 0.5;
            book.emptyStars = book.floatStars ? Array(5 - Math.ceil(book.rating)).fill(0) : Array(5 - Math.floor(book.rating)).fill(0);
            book.fullStars = Array(Math.floor(book.rating)).fill(0);
            book.hasHalfStar = book.floatStars;
            setBook(book);
        }

        async function getReviews() {
            if (!bookId) return;
            const { data: reviews } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}/reviews`, {
                headers: {
                    Authorization: `Bearer ${data?.user?.image}`,
                },
            });
            console.log(reviews);
            setReviews(reviews);
        }

        async function getDiscussions() {
            if (!bookId) return;
            const { data: discussions } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}/discussions`, {
                headers: {
                    Authorization: `Bearer ${data?.user?.image}`,
                },
            });
            console.log(discussions);
            setDiscussions(discussions);
        }

        if (data?.user?.image) getUser();
        if (data?.user?.image) getBook();
        if (data?.user?.image && bookId) getReviews();
        if (data?.user?.image && bookId) getDiscussions();
    }, [data, bookId]);

    const handleForumStatus = () => {
        if (forumStatus === "reviews") setForumStatus("discussions");
        else setForumStatus("reviews");
    };

    return (
        <div className="flex flex-col flex-grow p-8 pl-12 gap-8 bg-[#C4CCD8] dark:bg-[#1C2635] dark:text-white overflow-y-auto">
            <button onClick={router.back} className="flex gap-3 items-center hover:underline">
                <FaArrowLeft className="w-5 h-5" />
                <h2 className="text-xl font-semibold">Voltar</h2>
            </button>
            <div className="flex flex-col bg-[#F1F5FA] dark:bg-[#253449] text-gray-600 dark:text-white py-12 w-full rounded-lg px-12 justify-center gap-4">
                <div className="flex gap-12">
                    <Link href={`/books/${bookId}`}>
                        <Image src={book.cover} width={200} height={400} alt={`${book.title}'s cover`} className="rounded-lg cursor-pointer transition hover:brightness-110" />
                    </Link>
                    <div className="flex flex-col gap-2 font-semibold justify-between w-full">
                        <h2 className="flex flex-col gap-2 text-2xl">
                            <span className="text-4xl">Fórum sobre:</span>
                            <span className="text-primary-600 text-3xl">{book.title}</span>
                            <div className="flex gap-3 text-lg">
                                <div className="flex mt-2">
                                    <div className="flex gap-2 text-[#F59E0B] items-center">
                                        <span className="font-bold mt-0.5">{book.rating.toFixed(1)}</span>
                                        <div className="flex gap-1">
                                            {book.fullStars.map((_: any, index: any) => (
                                                <FaStar key={index} className="w-7 h-7 text-[#F59E0B]" />
                                            ))}
                                            {book.hasHalfStar && <FaRegStarHalfStroke className="w-8 h-8 -mt-0.5 text-[#F59E0B]" />}
                                            {book.emptyStars.map((_: any, index: any) => (
                                                <FaRegStar key={index} className="w-7 h-7 text-[#F59E0B]" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </h2>
                        <div className="flex w-full items-center justify-between">
                            <div className="flex text-2xl gap-6">
                                <span>
                                    <span className="text-primary-600">{book.qty_reviews} </span>
                                    review{book.qty_reviews === 1 ? "" : "s"}
                                </span>
                                <span>
                                    <span className="text-primary-600">{book.qty_discussions} </span>discuss{book.qty_discussions === 1 ? "ão" : "ões"}
                                </span>
                            </div>
                            {forumStatus === "discussions" && (
                                <Link href={`/new?book=${bookId}`} className="bg-primary-600 rounded-lg px-8 py-2 text-white flex justify-center items-center hover:brightness-110 transition">
                                    <h2 className="text-md font-bold flex gap-3 items-center">
                                        <FaFloppyDisk className="w-5 h-5" />
                                        Criar nova discussão
                                    </h2>
                                </Link>
                            )}
                            {forumStatus === "reviews" && (
                                <Link
                                    href={`/new?book=${bookId}&type=review`}
                                    className="bg-primary-600 rounded-lg px-8 py-2 text-white flex justify-center items-center hover:brightness-110 transition"
                                >
                                    <h2 className="text-md font-bold flex gap-3 items-center">
                                        <FaFloppyDisk className="w-5 h-5" />
                                        Criar nova review
                                    </h2>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mt-16 border-b-2 border-b-[#D5D8DB] dark:border-b-[#4B5B73] text-gray-500 dark:text-white">
                    <div className="flex">
                        <div
                            className={`flex px-12 py-3 -mr-3 cursor-pointer rounded-t-xl bg-[#293fbb] text-white ${forumStatus === "reviews" ? "z-10 shadow-xl" : "brightness-75 z-0"} transition`}
                            onClick={() => handleForumStatus()}
                        >
                            <span className="flex gap-2 items-center font-medium text-xl">
                                <FaBook className="w-5 h-5" />
                                Reviews
                            </span>
                        </div>
                        <div
                            className={`flex px-9 py-3 cursor-pointer rounded-t-xl bg-[#6d29bb] text-white ${forumStatus === "discussions" ? "z-10 shadow-xl" : "brightness-75 z-0"} transition`}
                            onClick={() => handleForumStatus()}
                        >
                            <span className="flex gap-2 items-center font-medium text-xl">
                                <FaComments className="w-5 h-5" />
                                Discussões
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <span className="font-semibold">Filtrar:</span>
                        <MuiThemeProvider>
                            <Select
                                value={discussionsSort}
                                onChange={handleDiscussionSort}
                                displayEmpty
                                componentsProps={{
                                    input: {
                                        sx: { padding: "8px 14px" },
                                    } as any,
                                }}
                            >
                                <MenuItem value="">
                                    <em>Filtre por...</em>
                                </MenuItem>
                                <MenuItem value="date=date">Recentes</MenuItem>
                                <MenuItem value="date=-date">Antigos</MenuItem>
                                <MenuItem value="rating=asc">Melhores</MenuItem>
                            </Select>
                        </MuiThemeProvider>
                    </div>
                </div>
                {forumStatus === "reviews" ? (
                    <div className="flex flex-col">
                        {reviews &&
                            reviews?.map((review: any) => (
                                <PostCard
                                    key={review.id}
                                    title={review.title}
                                    author={review.author}
                                    bookId={id}
                                    description={review.description}
                                    date={new Date(review.date).toLocaleDateString("pt-BR")}
                                    isReview
                                    rating={review.rating}
                                    isAdult={review.is_adult}
                                    isSpoiler={review.is_spoiler}
                                />
                            ))}
                        {reviews?.length === 0 && (
                            <div className="flex flex-col items-center justify-center pt-4 pb-4">
                                <h2 className="text-2xl font-bold mt-7">Nenhuma review encontrada...</h2>
                                <Link
                                    href={`/new?book=${bookId}&type=review`}
                                    className="flex items-center self-center text-lg py-3 px-9 mt-6 rounded-lg bg-primary-600 text-white transition hover:brightness-105 font-semibold"
                                >
                                    <FaBook className="w-5 h-5 mr-4" />
                                    Criar uma review
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col">
                        {discussions &&
                            discussions?.map((discussion: any) => (
                                <PostCard
                                    key={discussion.id_discussion}
                                    author={discussion.author}
                                    bookId={id}
                                    title={discussion.title}
                                    description={discussion.description}
                                    date={new Date(discussion.date).toLocaleDateString("pt-BR")}
                                    discussionId={discussion.id_discussion}
                                    likes={discussion.qty_likes}
                                    comments={discussion.qty_comments}
                                    bookmarks={discussion.qty_tags}
                                    isAdult={discussion.is_adult}
                                    isSpoiler={discussion.is_spoiler}
                                    isBookMarked={discussion.is_tagged}
                                    isLiked={discussion.is_liked}
                                    isAuthor={discussion.is_author}
                                />
                            ))}
                        {discussions?.length === 0 && (
                            <div className="flex flex-col items-center justify-center pt-4 pb-4">
                                <h2 className="text-2xl font-bold mt-7">Nenhuma discussão encontrada...</h2>
                                <Link
                                    href={`/new?book=${bookId}`}
                                    className="flex items-center self-center text-lg py-3 px-9 mt-6 rounded-lg bg-primary-600 text-white transition hover:brightness-105 font-semibold"
                                >
                                    <FaBook className="w-5 h-5 mr-4" />
                                    Criar uma discussão
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import BookDetail from "@/components/Books/BookDetail";
import PostCard from "@/components/PostCard";

import { FaArrowLeft, FaBook } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Books() {
    const router = useRouter();
    const { bookId } = useParams();
    const { data } = useSession();
    const [book, setBook] = useState<any>({ cod_ISBN: "" });
    const [reviews, setReviews] = useState<any[]>();

    useEffect(() => {
        async function getBook() {
            if (!bookId) return;
            const { data: book } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${data?.user?.image}`,
                },
            });
            console.log(book);
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

        if (data?.user?.image && bookId) getBook();
        if (data?.user?.image && bookId) getReviews();
    }, [data, bookId]);

    return (
        <div className="flex flex-col flex-grow p-8 pl-12 gap-8 bg-[#C4CCD8] dark:bg-[#1C2635] text-gray-600 dark:text-white overflow-y-auto">
            <button onClick={router.back} className="flex gap-3 items-center hover:underline">
                <FaArrowLeft className="w-5 h-5" />
                <h2 className="text-xl font-semibold">Voltar</h2>
            </button>
            <div className="flex flex-col bg-[#F1F5FA] dark:bg-[#253449] py-12 w-full rounded-lg px-12 justify-center gap-4">
                <BookDetail id={book.cod_ISBN} />
            </div>
            <div className="flex flex-col bg-[#F1F5FA] dark:bg-[#253449] pt-3 pb-12 w-full rounded-lg px-12 justify-center gap-4">
                <div className="flex flex-col mt-8">
                    <div className="flex justify-between px-1 items-center relative mb-4">
                        <h2 className="text-2xl font-bold">Reviews recentes</h2>
                        <Link href={`/books/${book.cod_ISBN}/forum`}>
                            <span className="text-md font-semibold text-primary-600 hover:underline">Ver todos</span>
                        </Link>
                    </div>
                    {reviews &&
                        reviews?.map((review) => (
                            <PostCard
                                key={review.id}
                                title={review.title}
                                author={review.author}
                                bookId={bookId as string}
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
                            <h2 className="text-2xl font-bold mt-5">Nenhuma review encontrada...</h2>
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
            </div>
        </div>
    );
}

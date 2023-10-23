"use client";

import Book from "@/components/Library/Book";
import FilterBar from "@/components/Library/FilterBar";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaBookOpen } from "react-icons/fa6";
import Loading from "../../../components/Loading";

type Book = {
    cod_ISBN: string;
    title: string;
    author: string;
    cover: string;
    rating: string;
    qty_reviews: string;
};

export default function Library() {
    const [books, setBooks] = useState<Book[]>([]);
    const [shownBooks, setShownBooks] = useState<Book[]>([]);
    const [ratingSort, setRatingSort] = useState<string>("");
    const [popularitySort, setPopularitySort] = useState<string>("");
    const [dateSort, setDateSort] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { data } = useSession();

    useEffect(() => {
        setIsLoading(true);
        async function getBooks() {
            setShownBooks([]);
            const { data: books } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books/?popularity=${popularitySort}&rating=${ratingSort}&order_by=${dateSort}`, {
                headers: {
                    Authorization: `Bearer ${data?.user?.image}`,
                },
            });
            setBooks(books);
            setShownBooks(books.slice(0, 10));
            setIsLoading(false);
        }

        if (data?.user?.image) getBooks();
    }, [data, ratingSort, dateSort, popularitySort]);

    const showMoreBooks = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setShownBooks(books.slice(0, shownBooks.length + 10));
        }, 600);
    };

    return (
        <div className="flex flex-col flex-grow p-8 pl-12 gap-8 bg-[#C4CCD8] dark:bg-[#1C2635] dark:text-white overflow-y-auto">
            {isLoading && <Loading />}
            <div className="flex gap-4">
                <div className="text-2xl font-bold bg-primary-600 rounded-xl px-8 py-4 text-white w-fit flex justify-center items-center">
                    <FaBookOpen className="w-8 h-8 mr-4" />
                    <h2>Biblioteca</h2>
                </div>
                <FilterBar setRatingSort={setRatingSort} setDateSort={setDateSort} setPopularitySort={setPopularitySort} setIsLoading={setIsLoading} />
            </div>
            <div className="flex flex-col bg-white dark:bg-[#253449] text-gray-600 dark:text-white/90 pt-6 pb-8 w-full rounded-lg px-8 justify-center">
                <div className="grid grid-cols-5 gap-12 mt-4">{shownBooks.length > 0 && shownBooks.map((book) => <Book key={book.cod_ISBN} book={book} />)}</div>
                {books.length !== shownBooks.length && shownBooks.length > 0 && (
                    <button
                        className="flex items-center self-center text-lg py-2 px-10 mt-12 rounded-lg bg-primary-600 text-white transition hover:brightness-105 font-semibold"
                        onClick={showMoreBooks}
                    >
                        Mostrar mais
                    </button>
                )}
            </div>
        </div>
    );
}

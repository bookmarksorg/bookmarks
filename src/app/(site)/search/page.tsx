"use client";

import { useSearchParams } from "next/navigation";

import Header from "@/components/Header";
import Book from "@/components/Library/Book";
import FilterBar from "@/components/Library/FilterBar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Lottie from "lottie-react";
import Empty from "@/assets/empty.json";

import { FaMagnifyingGlass } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../loading";

export default function Search() {
    const term = useSearchParams().get("q");
    const [books, setBooks] = useState<any>([]);
    const [shownBooks, setShownBooks] = useState<any>([]);
    const [orderRating, setOrderRating] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { data } = useSession();

    useEffect(() => {
        async function getBooks() {
            setIsLoading(true);
            const { data: books } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books/?title=${term}&rating=${orderRating}`, {
                headers: {
                    Authorization: `Bearer ${data?.user?.image}`,
                },
            });
            setBooks(books);
            setShownBooks(books.slice(0, 10));
            setIsLoading(false);
        }

        if (data?.user?.image) getBooks();
    }, [data, orderRating, term]);

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
                    <FaMagnifyingGlass className="w-7 h-7 mr-4" />
                    <h2>Resultados</h2>
                </div>
                <FilterBar setOrderRating={setOrderRating} />
            </div>
            <div className="flex flex-col bg-white dark:bg-[#253449] text-gray-600 dark:text-white/90 pt-8 pb-8 w-full rounded-lg px-8 justify-center">
                <div className="flex justify-between pb-8">
                    <h2 className="text-2xl font-bold">
                        Resultados para o termo:
                        <span className="text-primary-600"> {term}</span>
                    </h2>
                    {books.length !== 0 && (
                        <span className="text-md font-medium text-gray-500 dark:text-white/90  hover:text-primary-600 hover:underline cursor-pointer transition pr-2.5">Ver todos</span>
                    )}
                </div>
                {data && shownBooks.length === 0 && (
                    <div className="flex flex-col items-center justify-center pt-6 pb-4">
                        <h2 className="text-3xl font-bold mb-5">Nenhum resultado encontrado</h2>
                        <Lottie animationData={Empty} />
                    </div>
                )}
                <div className="grid grid-cols-5 gap-12 mt-4">
                    {shownBooks.map((book: any) => (
                        <Book key={book.cod_ISBN} book={book} />
                    ))}
                </div>
                {books.length !== shownBooks.length && (
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

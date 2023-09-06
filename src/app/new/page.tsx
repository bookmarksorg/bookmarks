"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { books } from "@/constants/books";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import Image from "next/image";
import { useState } from "react";
import { FaArrowLeft, FaCircleXmark, FaRegStar, FaStar, FaX } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function New() {
    const bookId = useSearchParams().get("book");
    const id = bookId as string;
    const router = useRouter();

    const [book, setBook] = useState(id || "");
    const [type, setType] = useState<"discussion" | "review">("discussion");
    const [rating, setRating] = useState(0);

    const handleNew = () => {
        toast.success("Criado com sucesso!");
        router.push(`/books/${book}/forum?status=${type}s`);
    };

    return (
        <div className="flex flex-col overflow-y-hidden">
            <Header />
            <div className="flex h-screen-header">
                <Sidebar />
                <div className="flex flex-col flex-grow p-8 pl-12 gap-8 bg-[#C4CCD8] dark:bg-[#1C2635] dark:text-white overflow-y-auto">
                    <div className="flex flex-col bg-[#F1F5FA] dark:bg-[#253449] py-12 w-full rounded-lg px-12 justify-center gap-4">
                        {!id && !book && (
                            <div className="flex flex-col gap-4">
                                <h1 className="text-2xl font-bold">Escolha um livro</h1>
                                <div className="flex flex-wrap gap-4">
                                    <select className="px-4 py-2 rounded-lg bg-white dark:bg-[#1C2635] dark:text-white" onChange={(e) => setBook(e.target.value)}>
                                        {Object.keys(books).map((book) => (
                                            <option key={book} value={book}>
                                                {books[book].title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}
                        {book && (
                            <div className="flex gap-20">
                                <div className="flex flex-col gap-4">
                                    <Image
                                        src={books[book].image}
                                        width={450}
                                        height={300}
                                        alt={`${books[book].title}'s cover`}
                                        className="rounded-lg cursor-pointer transition hover:brightness-110"
                                    />
                                </div>
                                <div className="flex flex-col w-full text-gray-600 dark:text-white pr-40">
                                    <h2 className="font-semibold text-4xl">Criar {type === "discussion" ? "discussão" : "review"}</h2>
                                    <span className="mt-2 mb-8 font-semibold text-lg text-primary-600">{books[book].title}</span>
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col gap-2 text-lg font-semibold">
                                            Tipo de discussão:
                                            <div className="flex gap-6 font-normal">
                                                <div className="flex gap-2">
                                                    <input type="radio" name="discussion" id="discussion" value="discussion" checked={type === "discussion"} onChange={() => setType("discussion")} />
                                                    <label htmlFor="discussion" className="text-lg">
                                                        Discussão
                                                    </label>
                                                </div>
                                                <div className="flex gap-2">
                                                    <input type="radio" name="review" id="review" value="review" checked={type === "review"} onChange={() => setType("review")} />
                                                    <label htmlFor="review" className="text-lg">
                                                        Review
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="title" className="text-lg font-semibold">
                                                Título
                                            </label>
                                            <input
                                                type="text"
                                                name="title"
                                                id="title"
                                                className="dark:bg-transparent px-4 py-2 text-lg rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition w-full"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="description" className="text-lg font-semibold">
                                                Descrição
                                            </label>
                                            <textarea
                                                name="description"
                                                id="description"
                                                className="dark:bg-transparent px-4 py-2 text-lg rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition w-full"
                                                rows={4}
                                            />
                                        </div>
                                        <div className="flex justify-between w-full">
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="content" className="text-lg font-semibold">
                                                    Contém conteúdo adulto? (+18)
                                                </label>
                                                <div className="flex gap-4">
                                                    <div className="flex gap-2">
                                                        <input type="radio" name="adult" id="adult" value="adult" />
                                                        <label htmlFor="adult" className="text-lg">
                                                            Sim
                                                        </label>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <input type="radio" name="adult" id="noadult" value="adult" />
                                                        <label htmlFor="noadult" className="text-lg">
                                                            Não
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="content" className="text-lg font-semibold">
                                                    Contém spoiler?
                                                </label>
                                                <div className="flex gap-4">
                                                    <div className="flex gap-2">
                                                        <input type="radio" name="spoiler" id="spoiler" value="spoiler" />
                                                        <label htmlFor="spoiler" className="text-lg">
                                                            Sim
                                                        </label>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <input type="radio" name="spoiler" id="nospoiler" value="spoiler" />
                                                        <label htmlFor="nospoiler" className="text-lg">
                                                            Não
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {type === "review" && (
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="rating" className="text-lg font-semibold">
                                                    Nota
                                                </label>
                                                <div className="flex gap-8 items-center">
                                                    <div className="flex">
                                                        <select
                                                            name="rating"
                                                            id="rating"
                                                            className="dark:bg-[#253449] px-8 py-2 text-lg rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition"
                                                            onChange={(e) => setRating(parseInt(e.target.value))}
                                                        >
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                        </select>
                                                    </div>
                                                    <div className="flex gap-2 -mt-1">
                                                        {/* draw the rating of stars with FaStar */}
                                                        {rating > 0 && Array.from({ length: rating }, (_, i) => <FaStar key={i} className="text-primary-600 w-8 h-8" />)}
                                                        {rating < 5 && Array.from({ length: 5 - rating }, (_, i) => <FaRegStar key={i} className="text-primary-600 w-8 h-8" />)}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-12 mt-12 text-xl">
                                        <span className="flex cursor-pointer py-3 rounded-lg bg-secondary-700 dark:bg-[#121922] text-white transition hover:bg-secondary-600 dark:hover:brightness-110 w-full justify-center items-center gap-4">
                                            <FaCircleXmark className="w-6 h-6" />
                                            Cancelar
                                        </span>
                                        <span
                                            className="flex cursor-pointer py-3 rounded-lg bg-primary-600 text-white transition hover:bg-primary-700 w-full justify-center items-center gap-4"
                                            onClick={handleNew}
                                        >
                                            <FaCheckCircle className="w-6 h-6" />
                                            Confirmar
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
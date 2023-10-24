"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaBook, FaComments, FaRegStar, FaRegStarHalfStroke, FaStar } from "react-icons/fa6";

export default function BookDetail({ id }: { id: string }) {
    const [book, setBook] = useState<any>({
        title: "",
        author: "",
        number_pages: "",
        language: "",
        year: "",
        rating: 0,
        qty_reviews: 0,
        cover: "",
        blurb: "",
        floatStars: false,
        emptyStars: [],
        fullStars: [],
        hasHalfStar: false,
    });
    const [isFavorite, setIsFavorite] = useState(false);
    const [user, setUser] = useState<any>({});
    const { data } = useSession();

    useEffect(() => {
        async function getBook() {
            if (!id) return;
            const { data: book } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`, {
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

        async function getUser() {
            const { data: user } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
                headers: {
                    Authorization: `Bearer ${data?.user?.image}`,
                },
            });
            setUser(user);
            console.log(user);
            user.favorite_books.forEach((book: any) => {
                if (book.cod_ISBN === id) setIsFavorite(true);
            });
        }

        if (data?.user?.image && id) getBook();
        if (data?.user?.image) getUser();
    }, [data, id]);

    async function handleFavorite() {
        if (!data?.user?.image || !id) return;
        await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/${user?.id_user}/`,
            {
                favorite_book: id,
            },
            {
                headers: {
                    Authorization: `Bearer ${data?.user?.image}`,
                },
            }
        );
        if (isFavorite) {
            toast.success("Livro removido dos favoritos!");
            setIsFavorite(false);
        } else {
            setIsFavorite(true);
            toast.success("Livro adicionado aos favoritos!");
        }
    }

    return (
        <div className="flex  dark:text-white/90">
            <div className="flex flex-col w-76">
                <Image src={book.cover} alt={book.title} height={446} width={300} className="rounded-lg cursor-pointer transition hover:brightness-110"></Image>
                <button
                    className={`border-[3px] border-primary-600 rounded-lg w-full py-2 flex justify-center items-center mt-4 ${
                        !isFavorite ? "bg-transparent text-primary-600 hover:bg-primary-600 hover:text-white" : "bg-primary-600 text-white"
                    } transition`}
                    onClick={handleFavorite}
                >
                    <h2 className="text-lg font-bold flex gap-3 items-center">
                        <FaStar className="w-5 h-5" />
                        {isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                    </h2>
                </button>
                <div className="flex gap-2">
                    <Link href={`/books/${id}/forum?status=reviews`} className="bg-[#293fbbd0] rounded-lg w-full py-2 text-white flex justify-center items-center mt-4 hover:brightness-110 transition">
                        <h2 className="text-md font-bold flex gap-3 items-center">
                            <FaBook className="w-4 h-4" />
                            Reviews
                        </h2>
                    </Link>
                    <Link
                        href={`/books/${id}/forum?status=discussions`}
                        className="bg-[#6d29bbd0] rounded-lg w-full py-2 text-white flex justify-center items-center mt-4 hover:brightness-110 transition"
                    >
                        <h2 className="text-md font-bold flex gap-3 items-center">
                            <FaComments className="w-4 h-4" />
                            Discussões
                        </h2>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col flex-[7] pl-8 pr-16">
                <h1 className="text-4xl font-bold">{book.title}</h1>
                <p className="mt-4 text-md line-clamp-[10]">{book.blurb} </p>
                <div className="flex gap-3 text-lg mt-6">
                    <div>
                        <span className="font-bold">Autor: </span>
                        <span>{book.author} |</span>
                    </div>
                    <div>
                        <span className="font-bold">Nº de páginas: </span>
                        <span>{book.number_pages} |</span>
                    </div>
                    <div>
                        <span className="font-bold">Idioma: </span>
                        <span>{book.language}</span>
                    </div>
                </div>
                <div className="flex gap-3 text-lg mt-3">
                    <div>
                        <span className="font-bold">Ano de lançamento: </span>
                        <span>{book.published}</span>
                    </div>
                </div>
                <hr className="my-6 bg-gray-300 h-[2px]" />
                {/* rating */}
                <div className="flex gap-3 text-lg">
                    <div className="flex flex-col gap-2 ">
                        <span className="font-bold">Nota dos usuários ({book.qty_reviews}): </span>
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
            </div>
        </div>
    );
}

"use client";

import { books } from "@/constants/books";

import Image from "next/image";
import Link from "next/link";
import { FaBook, FaComments, FaRegStar, FaRegStarHalfStroke, FaStar } from "react-icons/fa6";

export default function BookDetail({ id }: { id: string }) {
    const { image, title, sinopses, author, pages, language, year, genres, rating, ratingUsers } = books[id];

    const floatStars = rating - Math.floor(rating) >= 0.5;

    const emptyStars = floatStars ? Array(5 - Math.ceil(rating)).fill(0) : Array(5 - Math.floor(rating)).fill(0);
    const fullStars = Array(Math.floor(rating)).fill(0);
    const hasHalfStar = floatStars;

    return (
        <div className="flex  dark:text-white/90">
            <div className="flex flex-col w-76">
                <Image src={image} alt={title} height={446} width={300} className="rounded-lg cursor-pointer transition hover:brightness-110"></Image>
                <button className="bg-primary-600 rounded-lg w-full py-2 text-white flex justify-center items-center mt-4 hover:brightness-110 transition">
                    <h2 className="text-lg font-bold flex gap-3 items-center">
                        <FaStar className="w-5 h-5" />
                        Adicionar aos favoritos
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
                {/* title */}
                <h1 className="text-4xl font-bold">{title}</h1>
                {/* sinopses */}
                <p className="mt-4 text-md">
                    {sinopses || (
                        <>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet temporibus commodi aliquid saepe pariatur animi asperiores excepturi quisquam rerum. Corrupti illum id velit
                            accusamus quia, at sint ullam alias. Cumque sequi assumenda praesentium dignissimos, iure illo eum distinctio eos voluptas, quidem facilis id. Aperiam saepe, obcaecati
                            blanditiis tempore odit id?
                        </>
                    )}
                </p>
                {/* details */}
                <div className="flex gap-3 text-lg mt-6">
                    {/* author | pages | language */}
                    <div>
                        <span className="font-bold">Autor: </span>
                        <span>{author} |</span>
                    </div>
                    <div>
                        <span className="font-bold">Nº de páginas: </span>
                        <span>{pages} |</span>
                    </div>
                    <div>
                        <span className="font-bold">Idioma: </span>
                        <span>{language}</span>
                    </div>
                </div>
                {/* date */}
                <div className="flex gap-3 text-lg mt-3">
                    <div>
                        <span className="font-bold">Ano de lançamento: </span>
                        <span>{year}</span>
                    </div>
                </div>
                {/* genres */}
                <div className="flex gap-3 text-lg mt-3">
                    <div className="flex flex-col gap-2 ">
                        <span className="font-bold">Gêneros: </span>
                        <div className="flex gap-3">
                            {genres.map((genre) => (
                                <span key={genre.name} className={`${genre.color} text-white rounded-lg px-3 py-1 cursor-pointer hover:brightness-110`}>
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <hr className="my-6 bg-gray-300 h-[2px]" />
                {/* rating */}
                <div className="flex gap-3 text-lg">
                    <div className="flex flex-col gap-2 ">
                        <span className="font-bold">Nota dos usuários ({ratingUsers}): </span>
                        <div className="flex gap-2 text-[#F59E0B] items-center">
                            <span className="font-bold">{rating.toFixed(1)}</span>
                            <div className="flex gap-1">
                                {fullStars.map((_, index) => (
                                    <FaStar key={index} className="w-7 h-7 text-[#F59E0B]" />
                                ))}
                                {hasHalfStar && <FaRegStarHalfStroke className="w-8 h-8 -mt-0.5 text-[#F59E0B]" />}
                                {emptyStars.map((_, index) => (
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
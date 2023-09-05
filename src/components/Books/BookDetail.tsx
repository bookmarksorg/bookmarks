"use client";

import Image from "next/image";
import Link from "next/link";
import { FaBook, FaComments, FaRegStar, FaRegStarHalfStroke, FaStar } from "react-icons/fa6";

type BookInfo = {
    image: string;
    title: string;
    sinopses?: string;
    author: string;
    pages: number;
    language: string;
    year: number;
    genres: Record<string, string>[];
    rating: number;
    ratingUsers: string;
};

export default function BookDetail({ id }: { id: string }) {
    const books: Record<string, BookInfo> = {
        n3ui4tn3tm: {
            image: "https://m.media-amazon.com/images/I/91LptBSFxQL._AC_UF1000,1000_QL80_.jpg",
            title: "Percy Jackson and the Olympians: The Lightning Thief",
            author: "Rick Riordan",
            pages: 237,
            language: "English",
            year: 2005,
            genres: [
                { name: "Fantasy", color: "bg-green-500/90" },
                { name: "Young Adult", color: "bg-yellow-500/90" },
                { name: "Adventure", color: "bg-teal-500/90" },
            ],
            rating: 3.4,
            ratingUsers: "3.288",
        },
        g6h34ui3w4: {
            image: "https://m.media-amazon.com/images/I/81tM68Xn66L._AC_UF1000,1000_QL80_.jpg",
            title: "Star Wars: The High Republic: Light of the Jedi",
            author: "Charles Soule",
            pages: 427,
            language: "English",
            year: 2021,
            genres: [
                { name: "Science Fiction", color: "bg-blue-500/90" },
                { name: "Fantasy", color: "bg-green-500/90" },
            ],
            rating: 4.8,
            ratingUsers: "631",
        },
        m53ynos09g: {
            image: "https://m.media-amazon.com/images/I/71HbYElfY0L._AC_UF1000,1000_QL80_.jpg",
            title: "Harry Potter and the Sorcerer's Stone",
            author: "J. K. Rowling",
            pages: 309,
            language: "English",
            year: 1997,
            genres: [
                { name: "Fantasy", color: "bg-green-500/90" },
                { name: "Magic", color: "bg-yellow-500/90" },
            ],
            rating: 2.3,
            ratingUsers: "5.231",
        },
        z7b8w0fkh0: {
            image: "https://m.media-amazon.com/images/I/91k68MKPbNL._AC_UF1000,1000_QL80_.jpg",
            title: "Oyasumi Punpun",
            author: "Inio Asano",
            pages: 164,
            language: "Japanese",
            year: 2007,
            genres: [
                { name: "Drama", color: "bg-red-500/90" },
                { name: "Slice of Life", color: "bg-yellow-500/90" },
                { name: "Psychological", color: "bg-purple-500/90" },
                { name: "Seinen", color: "bg-blue-500/90" },
            ],
            rating: 5.0,
            ratingUsers: "666.666",
        },
        c3x5jiogs9: {
            image: "https://m.media-amazon.com/images/I/614SwlZNtJL._AC_UF1000,1000_QL80_.jpg",
            title: "The Hunger Games",
            author: "Suzanne Collins",
            pages: 526,
            language: "English",
            year: 2008,
            genres: [
                { name: "Science Fiction", color: "bg-blue-500/90" },
                { name: "Young Adult", color: "bg-yellow-500/90" },
                { name: "Adventure", color: "bg-teal-500/90" },
            ],
            rating: 4.2,
            ratingUsers: "923",
        },
    };

    const { image, title, sinopses, author, pages, language, year, genres, rating, ratingUsers } = books[id];

    const floatStars = rating - Math.floor(rating) >= 0.5;

    const emptyStars = floatStars ? Array(5 - Math.ceil(rating)).fill(0) : Array(5 - Math.floor(rating)).fill(0);
    const fullStars = Array(Math.floor(rating)).fill(0);
    const hasHalfStar = floatStars;

    return (
        <div className="flex">
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
                    <div className="text-gray-500">
                        <span className="font-bold">Autor: </span>
                        <span>{author} |</span>
                    </div>
                    <div className="text-gray-500">
                        <span className="font-bold">Nº de páginas: </span>
                        <span>{pages} |</span>
                    </div>
                    <div className="text-gray-500">
                        <span className="font-bold">Idioma: </span>
                        <span>{language}</span>
                    </div>
                </div>
                {/* date */}
                <div className="flex gap-3 text-lg mt-3">
                    <div className="text-gray-500">
                        <span className="font-bold">Ano de lançamento: </span>
                        <span>{year}</span>
                    </div>
                </div>
                {/* genres */}
                <div className="flex gap-3 text-lg mt-3">
                    <div className="flex flex-col gap-2 text-gray-500">
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
                    <div className="flex flex-col gap-2 text-gray-500">
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

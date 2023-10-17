"use client";

import { useRouter, useSearchParams } from "next/navigation";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaCircleXmark, FaRegStar, FaStar, FaX } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MuiThemeProvider from "@/components/MuiThemeProvider";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

type Book = {
    title: string;
    cover: string;
};

export default function New() {
    const bookId = useSearchParams().get("book");
    const id = bookId as string;
    const router = useRouter();
    const [books, setBooks] = useState<Book[]>([]);
    const [book, setBook] = useState<any>(null);
    const [type, setType] = useState<"discussion" | "review">("discussion");
    const [is_adult, setIsAdult] = useState(false);
    const [is_spoiler, setIsSpoiler] = useState(false);
    const { data } = useSession();

    const [rating, setRating] = useState(0);
    const [definitive, setDefinitive] = useState(false);

    const handleStarHover = (hoveredRating: number) => {
        if (!definitive) setRating(hoveredRating);
    };

    const setRatingDefinitive = (rating: number) => {
        setRating(rating);
        setDefinitive(true);
    };

    const handleType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setType((event.target as HTMLInputElement).value as "discussion" | "review");
    };

    useEffect(() => {
        async function getBooks() {
            const { data: books } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books/`, {
                headers: {
                    Authorization: `Bearer ${data?.user?.image}`,
                },
            });
            console.log(books);
            setBooks(books);
        }

        if (data?.user?.image) getBooks();
    }, [data]);

    async function handleNew() {
        if (!data?.user?.image) return;
        const title = (document.getElementById("title") as HTMLInputElement).value;
        const description = (document.getElementById("description") as HTMLInputElement).value;

        if (type === "review") {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/reviews/`,
                {
                    title,
                    description,
                    is_adult,
                    is_spoiler,
                    rating,
                    cod_ISBN: book.cod_ISBN,
                },
                {
                    headers: {
                        Authorization: `Bearer ${data?.user?.image}`,
                    },
                }
            );

            toast.success("Review criado com sucesso!");
            toast.success("Você ganhou 10 pontos!");

            router.push(`/books/${book.cod_ISBN}/forum?status=${type}s`);
        } else {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/discussions/`,
                {
                    title,
                    description,
                    is_adult,
                    is_spoiler,
                    cod_ISBN: book.cod_ISBN,
                },
                {
                    headers: {
                        Authorization: `Bearer ${data?.user?.image}`,
                    },
                }
            );

            toast.success("Discussão criada com sucesso!");
            toast.success("Você ganhou 5 pontos!");

            router.push(`/books/${book.cod_ISBN}/forum?status=${type}s`);
        }
    }

    return (
        <div className="flex flex-col flex-grow p-8 pl-12 gap-8 bg-[#C4CCD8] dark:bg-[#1C2635] dark:text-white overflow-y-auto">
            <div className="flex flex-col bg-[#F1F5FA] dark:bg-[#253449] py-12 w-full rounded-lg px-12 justify-center gap-4">
                {!id && !book && (
                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl font-bold">Escolha um livro</h1>
                        <div className="flex flex-wrap gap-4">
                            {books && (
                                <MuiThemeProvider>
                                    <Autocomplete
                                        id="country-select-demo"
                                        sx={{ width: 500 }}
                                        options={books}
                                        autoHighlight
                                        getOptionLabel={(book) => book.title}
                                        onChange={(e, value) => setBook(value)}
                                        renderOption={(props, book) => (
                                            <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
                                                <Image loading="lazy" width="40" height="30" src={`${book.cover || "https://via.placeholder.com/20x30"}`} alt={`${book.title}'s cover`} />
                                                {book.title}
                                            </Box>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Escolha um livro"
                                                inputProps={{
                                                    ...params.inputProps,
                                                    autoComplete: "new-password", // disable autocomplete and autofill
                                                }}
                                            />
                                        )}
                                    />
                                </MuiThemeProvider>
                            )}
                        </div>
                    </div>
                )}
                {book && (
                    <div className="flex gap-20">
                        <div className="flex flex-col gap-4">
                            <Image src={book.cover} width={450} height={300} alt={`${book.title}'s cover`} className="rounded-lg cursor-pointer transition hover:brightness-110" />
                        </div>
                        <div className="flex flex-col w-full text-gray-600 dark:text-white pr-40">
                            <h2 className="font-semibold text-4xl">Criar {type === "discussion" ? "discussão" : "review"}</h2>
                            <span className="mt-2 mb-8 font-semibold text-lg text-primary-600">{book.title}</span>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-2 text-lg font-semibold">
                                    Tipo de publicação
                                    <MuiThemeProvider>
                                        <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={type} onChange={handleType}>
                                            <FormControlLabel value="discussion" control={<Radio />} label="Discussão" />
                                            <FormControlLabel value="review" control={<Radio />} label="Review" />
                                        </RadioGroup>
                                    </MuiThemeProvider>
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
                                        <MuiThemeProvider>
                                            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={is_adult} onChange={() => setIsAdult(!is_adult)}>
                                                <FormControlLabel value={true} control={<Radio />} label="Sim" />
                                                <FormControlLabel value={false} control={<Radio />} label="Não" />
                                            </RadioGroup>
                                        </MuiThemeProvider>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="content" className="text-lg font-semibold">
                                            Contém spoiler?
                                        </label>
                                        <MuiThemeProvider>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                value={is_spoiler}
                                                onChange={() => setIsSpoiler(!is_spoiler)}
                                            >
                                                <FormControlLabel value={true} control={<Radio />} label="Sim" />
                                                <FormControlLabel value={false} control={<Radio />} label="Não" />
                                            </RadioGroup>
                                        </MuiThemeProvider>
                                    </div>
                                </div>
                                {type === "review" && (
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="rating" className="text-lg font-semibold">
                                            Nota
                                        </label>
                                        <div className="flex gap-8 items-center">
                                            <div className="flex gap-2 -mt-1" onMouseLeave={() => handleStarHover(0)}>
                                                {[1, 2, 3, 4, 5].map((value) => (
                                                    <div
                                                        key={value}
                                                        onMouseEnter={() => handleStarHover(value)}
                                                        onMouseLeave={() => handleStarHover(rating)}
                                                        onClick={() => setRatingDefinitive(value)}
                                                    >
                                                        {value <= (rating || 0) ? (
                                                            <FaStar className="cursor-pointer text-primary-600 w-8 h-8" />
                                                        ) : (
                                                            <FaRegStar className="cursor-pointer text-primary-600 w-8 h-8" />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-12 mt-12 text-xl">
                                <span
                                    className="flex cursor-pointer py-3 rounded-lg bg-secondary-700 dark:bg-[#121922] text-white transition hover:bg-secondary-600 dark:hover:brightness-110 w-full justify-center items-center gap-4"
                                    onClick={() => router.back()}
                                >
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
    );
}

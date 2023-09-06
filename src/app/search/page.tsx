"use client";

import { useSearchParams } from "next/navigation";

import Header from "@/components/Header";
import Book from "@/components/Library/Book";
import FilterBar from "@/components/Library/FilterBar";
import Sidebar from "@/components/Sidebar/Sidebar";

import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Search() {
    const term = useSearchParams().get("q");

    return (
        <div className="flex flex-col overflow-y-hidden">
            <Header />
            <div className="flex h-screen-header">
                <Sidebar />
                <div className="flex flex-col flex-grow p-8 pl-12 gap-8 bg-[#C4CCD8] dark:bg-[#1C2635] dark:text-white overflow-y-auto">
                    <div className="flex gap-4">
                        <div className="text-2xl font-bold bg-primary-600 rounded-xl px-8 py-4 text-white w-fit flex justify-center items-center">
                            <FaMagnifyingGlass className="w-7 h-7 mr-4" />
                            <h2>Resultados</h2>
                        </div>
                        <FilterBar />
                    </div>
                    <div className="flex flex-col bg-white dark:bg-[#253449] text-gray-600 dark:text-white/90 pt-8 pb-12 w-full rounded-lg px-8 justify-center">
                        <div className="flex justify-between pb-8">
                            <h2 className="text-2xl font-bold">
                                Resultados para o termo:
                                <span className="text-primary-600"> {term}</span>
                            </h2>
                            <span className="text-md font-medium text-gray-500 dark:text-white/90  hover:text-primary-600 hover:underline cursor-pointer transition pr-2.5">Ver todos</span>
                        </div>
                        <div className="grid grid-cols-5 gap-12 mt-4">
                            <Book
                                id="z7b8w0fkh0"
                                image="https://m.media-amazon.com/images/I/91k68MKPbNL._AC_UF1000,1000_QL80_.jpg"
                                title="Oyasumi Punpun"
                                author="Inio Asano"
                                rating="5.0 (666.666) "
                            />
                            <Book
                                id="m53ynos09g"
                                image="https://m.media-amazon.com/images/I/71HbYElfY0L._AC_UF1000,1000_QL80_.jpg"
                                title="Harry Potter and the Sorcerer's Stone"
                                author="J. K. Rowling"
                                rating="2.3 (5.231)"
                            />
                            <Book
                                id="g6h34ui3w4"
                                image="https://m.media-amazon.com/images/I/81tM68Xn66L._AC_UF1000,1000_QL80_.jpg"
                                title="Star Wars: The High Republic: Light of the Jedi"
                                author="Charles Soule"
                                rating="4.8 (631)"
                            />
                            <Book
                                id="n3ui4tn3tm"
                                image="https://m.media-amazon.com/images/I/91LptBSFxQL._AC_UF1000,1000_QL80_.jpg"
                                title="Percy Jackson and the Olympians: The Lightning Thief"
                                author="Rick Riordan"
                                rating="3.4 (3.288)"
                            />
                            <Book
                                id="c3x5jiogs9"
                                image="https://m.media-amazon.com/images/I/614SwlZNtJL._AC_UF1000,1000_QL80_.jpg"
                                title="The Hunger Games"
                                author="Suzanne Collins"
                                rating="5.0 (923)"
                            />
                            <Book
                                id="z7b8w0fkh0"
                                image="https://m.media-amazon.com/images/I/91k68MKPbNL._AC_UF1000,1000_QL80_.jpg"
                                title="Oyasumi Punpun"
                                author="Inio Asano"
                                rating="5.0 (666.666) "
                            />
                            <Book
                                id="m53ynos09g"
                                image="https://m.media-amazon.com/images/I/71HbYElfY0L._AC_UF1000,1000_QL80_.jpg"
                                title="Harry Potter and the Sorcerer's Stone"
                                author="J. K. Rowling"
                                rating="2.3 (5.231)"
                            />
                            <Book
                                id="g6h34ui3w4"
                                image="https://m.media-amazon.com/images/I/81tM68Xn66L._AC_UF1000,1000_QL80_.jpg"
                                title="Star Wars: The High Republic: Light of the Jedi"
                                author="Charles Soule"
                                rating="4.8 (631)"
                            />
                            <Book
                                id="n3ui4tn3tm"
                                image="https://m.media-amazon.com/images/I/91LptBSFxQL._AC_UF1000,1000_QL80_.jpg"
                                title="Percy Jackson and the Olympians: The Lightning Thief"
                                author="Rick Riordan"
                                rating="3.4 (3.288)"
                            />
                            <Book
                                id="c3x5jiogs9"
                                image="https://m.media-amazon.com/images/I/614SwlZNtJL._AC_UF1000,1000_QL80_.jpg"
                                title="The Hunger Games"
                                author="Suzanne Collins"
                                rating="5.0 (923)"
                            />
                            <Book
                                id="z7b8w0fkh0"
                                image="https://m.media-amazon.com/images/I/91k68MKPbNL._AC_UF1000,1000_QL80_.jpg"
                                title="Oyasumi Punpun"
                                author="Inio Asano"
                                rating="5.0 (666.666) "
                            />
                            <Book
                                id="m53ynos09g"
                                image="https://m.media-amazon.com/images/I/71HbYElfY0L._AC_UF1000,1000_QL80_.jpg"
                                title="Harry Potter and the Sorcerer's Stone"
                                author="J. K. Rowling"
                                rating="2.3 (5.231)"
                            />
                            <Book
                                id="g6h34ui3w4"
                                image="https://m.media-amazon.com/images/I/81tM68Xn66L._AC_UF1000,1000_QL80_.jpg"
                                title="Star Wars: The High Republic: Light of the Jedi"
                                author="Charles Soule"
                                rating="4.8 (631)"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

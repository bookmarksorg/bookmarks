import Header from "@/components/Header";
import Book from "@/components/Library/Book";
import FilterBar from "@/components/Library/FilterBar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Image from "next/image";
import { FaBookOpen, FaStar } from "react-icons/fa6";

export default function Library() {
    return (
        <div className="flex flex-col overflow-y-hidden">
            <Header />
            <div className="flex h-screen-header">
                <Sidebar />
                <div className="flex flex-col flex-grow p-8 pl-12 gap-8 bg-[#C4CCD8] overflow-y-auto">
                    <div className="flex gap-4">
                        <div className="text-2xl font-bold bg-primary-600 rounded-xl px-8 py-4 text-white w-fit flex justify-center items-center">
                            <FaBookOpen className="w-8 h-8 mr-4" />
                            <h2>Biblioteca</h2>
                        </div>
                        <FilterBar />
                    </div>
                    <div className="flex flex-col bg-white text-gray-600 pt-6 pb-12 w-full rounded-lg px-8 justify-center">
                        <div className="flex justify-between pb-8">
                            <h2 className="text-xl font-bold">Novidades</h2>
                            <span className="text-md font-medium text-gray-500 hover:text-primary-600 hover:underline cursor-pointer transition pr-2.5">Ver todos</span>
                        </div>
                        <div className="grid grid-cols-5 gap-12 mt-4">
                            <Book id="gf5g6re61" image="https://m.media-amazon.com/images/I/91k68MKPbNL._AC_UF1000,1000_QL80_.jpg" title="Oyasumi Punpun" author="Inio Asano" rating="5.0 (1.231)" />
                            <Book
                                id="gf5g6re61"
                                image="https://m.media-amazon.com/images/I/71HbYElfY0L._AC_UF1000,1000_QL80_.jpg"
                                title="Harry Potter and the Sorcerer's Stone"
                                author="J. K. Rowling"
                                rating="2.3 (5.231)"
                            />
                            <Book
                                id="gf5g6re61"
                                image="https://m.media-amazon.com/images/I/81tM68Xn66L._AC_UF1000,1000_QL80_.jpg"
                                title="Star Wars: The High Republic: Light of the Jedi"
                                author="Charles Soule"
                                rating="4.8 (631)"
                            />
                            <Book
                                id="gf5g6re61"
                                image="https://m.media-amazon.com/images/I/91LptBSFxQL._AC_UF1000,1000_QL80_.jpg"
                                title="Percy Jackson and the Olympians: The Lightning Thief"
                                author="Rick Riordan"
                                rating="3.4 (3.288)"
                            />
                            <Book
                                id="gf5g6re61"
                                image="https://m.media-amazon.com/images/I/614SwlZNtJL._AC_UF1000,1000_QL80_.jpg"
                                title="The Hunger Games"
                                author="Suzanne Collins"
                                rating="5.0 (923)"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col bg-white text-gray-600 pt-8 pb-12 w-full rounded-lg px-8 justify-center">
                        <div className="flex justify-between pb-8">
                            <h2 className="text-2xl font-bold">Mais curtidos</h2>
                            <span className="text-md font-medium text-gray-500 hover:text-primary-600 hover:underline cursor-pointer transition pr-2.5">Ver todos</span>
                        </div>
                        <div className="grid grid-cols-5 gap-12 mt-4">
                            <Book id="gf5g6re61" image="https://m.media-amazon.com/images/I/91k68MKPbNL._AC_UF1000,1000_QL80_.jpg" title="Oyasumi Punpun" author="Inio Asano" rating="5.0 (1.231)" />
                            <Book
                                id="gf5g6re61"
                                image="https://m.media-amazon.com/images/I/71HbYElfY0L._AC_UF1000,1000_QL80_.jpg"
                                title="Harry Potter and the Sorcerer's Stone"
                                author="J. K. Rowling"
                                rating="2.3 (5.231)"
                            />
                            <Book
                                id="gf5g6re61"
                                image="https://m.media-amazon.com/images/I/81tM68Xn66L._AC_UF1000,1000_QL80_.jpg"
                                title="Star Wars: The High Republic: Light of the Jedi"
                                author="Charles Soule"
                                rating="4.8 (631)"
                            />
                            <Book
                                id="gf5g6re61"
                                image="https://m.media-amazon.com/images/I/91LptBSFxQL._AC_UF1000,1000_QL80_.jpg"
                                title="Percy Jackson and the Olympians: The Lightning Thief"
                                author="Rick Riordan"
                                rating="3.4 (3.288)"
                            />
                            <Book
                                id="gf5g6re61"
                                image="https://m.media-amazon.com/images/I/614SwlZNtJL._AC_UF1000,1000_QL80_.jpg"
                                title="The Hunger Games"
                                author="Suzanne Collins"
                                rating="5.0 (923)"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

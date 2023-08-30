import Header from "@/components/Header";
import FilterBar from "@/components/Library/FilterBar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { FaBookOpen, FaStar } from "react-icons/fa6";

export default function Library() {
    return (
        <div className="flex flex-col overflow-y-hidden">
            <Header />
            <div className="flex h-screen-header">
                <Sidebar />
                <div className="flex flex-col flex-grow p-8 pl-12 gap-8 bg-[#C4CCD8] overflow-y-auto">
                    <div className="text-2xl font-bold bg-primary-600 rounded-xl px-8 py-4 text-white w-fit flex justify-center items-center">
                        <FaBookOpen className="w-8 h-8 mr-4" />
                        <h2>Biblioteca</h2>
                    </div>
                    <FilterBar />
                    <div className="flex flex-col bg-white text-gray-600 pt-6 pb-12 w-full rounded-lg px-8 justify-center">
                        <div className="flex justify-between pb-8">
                            <h2 className="text-xl font-bold">Novidades</h2>
                            <span className="text-md font-medium text-gray-500 hover:text-primary-600 hover:underline cursor-pointer transition pr-2.5">Ver todos</span>
                        </div>
                        <div className="grid grid-cols-5 gap-12 mt-4">
                            {/* book */}
                            <div className="flex flex-col w-48">
                                <div className="h-72 bg-primary-600 rounded-lg cursor-pointer transition hover:brightness-110"></div>
                                <span className="text-md font-medium text-gray-500 mt-2 hover:underline cursor-pointer line-clamp-2">Boa noite Punpun</span>
                                <div className="flex justify-between text-sm mt-3">
                                    <span className="text-gray-500 hover:underline cursor-pointer">Inio Asano</span>
                                    <span className="text-orange-400">
                                        <FaStar className="w-4 h-4 inline-block mr-1" />
                                        5.0 (1.231)
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col w-48">
                                <div className="h-72 bg-primary-600 rounded-lg cursor-pointer transition hover:brightness-110"></div>
                                <span className="text-md font-medium text-gray-500 mt-2 hover:underline cursor-pointer line-clamp-2">Harry Potter and the Sorcerer's Stone</span>
                                <div className="flex justify-between text-sm mt-3">
                                    <span className="text-gray-500 hover:underline cursor-pointer">J. K. Rowling</span>
                                    <span className="text-orange-400">
                                        <FaStar className="w-4 h-4 inline-block mr-1" />
                                        2.3 (5.231)
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col w-48">
                                <div className="h-72 bg-primary-600 rounded-lg cursor-pointer transition hover:brightness-110"></div>
                                <span className="text-md font-medium text-gray-500 mt-2 hover:underline cursor-pointer line-clamp-2" title="Star Wars: The High Republic: Light of the Jedi">
                                    Star Wars: The High Republic: Light of the Jedi
                                </span>
                                <div className="flex justify-between text-sm mt-3">
                                    <span className="text-gray-500 hover:underline cursor-pointer">Charles Soule</span>
                                    <span className="text-orange-400">
                                        <FaStar className="w-4 h-4 inline-block mr-1" />
                                        4.8 (631)
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col w-48">
                                <div className="h-72 bg-primary-600 rounded-lg cursor-pointer transition hover:brightness-110"></div>
                                <span className="text-md font-medium text-gray-500 mt-2 hover:underline cursor-pointer line-clamp-2">Percy Jackson and the Olympians: The Lightning Thief</span>
                                <div className="flex justify-between text-sm mt-3">
                                    <span className="text-gray-500 hover:underline cursor-pointer">Rick Riordan</span>
                                    <span className="text-orange-400">
                                        <FaStar className="w-4 h-4 inline-block mr-1" />
                                        3.4 (3.288)
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col w-48">
                                <div className="h-72 bg-primary-600 rounded-lg cursor-pointer transition hover:brightness-110"></div>
                                <span className="text-md font-medium text-gray-500 mt-2 hover:underline cursor-pointer line-clamp-2">The Hunger Games</span>
                                <div className="flex justify-between text-sm mt-3">
                                    <span className="text-gray-500 hover:underline cursor-pointer">Suzanne Collins</span>
                                    <span className="text-orange-400">
                                        <FaStar className="w-4 h-4 inline-block mr-1" />
                                        5.0 (923)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-white text-gray-600 pt-8 pb-12 w-full rounded-lg px-8 justify-center">
                        <div className="flex justify-between pb-8">
                            <h2 className="text-2xl font-bold">Mais curtidos</h2>
                            <span className="text-md font-medium text-gray-500 hover:text-primary-600 hover:underline cursor-pointer transition pr-2.5">Ver todos</span>
                        </div>
                        <div className="grid grid-cols-5 gap-12 mt-4">
                            {/* book */}
                            <div className="flex flex-col w-48">
                                <div className="h-72 bg-primary-600 rounded-lg cursor-pointer transition hover:brightness-110"></div>
                                <span className="text-md font-medium text-gray-500 mt-2 hover:underline cursor-pointer line-clamp-2">Boa noite Punpun</span>
                                <div className="flex justify-between text-sm mt-3">
                                    <span className="text-gray-500 hover:underline cursor-pointer">Inio Asano</span>
                                    <span className="text-orange-400">
                                        <FaStar className="w-4 h-4 inline-block mr-1" />
                                        5.0 (1.231)
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col w-48">
                                <div className="h-72 bg-primary-600 rounded-lg cursor-pointer transition hover:brightness-110"></div>
                                <span className="text-md font-medium text-gray-500 mt-2 hover:underline cursor-pointer line-clamp-2">Harry Potter and the Sorcerer's Stone</span>
                                <div className="flex justify-between text-sm mt-3">
                                    <span className="text-gray-500 hover:underline cursor-pointer">J. K. Rowling</span>
                                    <span className="text-orange-400">
                                        <FaStar className="w-4 h-4 inline-block mr-1" />
                                        2.3 (5.231)
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col w-48">
                                <div className="h-72 bg-primary-600 rounded-lg cursor-pointer transition hover:brightness-110"></div>
                                <span className="text-md font-medium text-gray-500 mt-2 hover:underline cursor-pointer line-clamp-2" title="Star Wars: The High Republic: Light of the Jedi">
                                    Star Wars: The High Republic: Light of the Jedi
                                </span>
                                <div className="flex justify-between text-sm mt-3">
                                    <span className="text-gray-500 hover:underline cursor-pointer">Charles Soule</span>
                                    <span className="text-orange-400">
                                        <FaStar className="w-4 h-4 inline-block mr-1" />
                                        4.8 (631)
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col w-48">
                                <div className="h-72 bg-primary-600 rounded-lg cursor-pointer transition hover:brightness-110"></div>
                                <span className="text-md font-medium text-gray-500 mt-2 hover:underline cursor-pointer line-clamp-2">Percy Jackson and the Olympians: The Lightning Thief</span>
                                <div className="flex justify-between text-sm mt-3">
                                    <span className="text-gray-500 hover:underline cursor-pointer">Rick Riordan</span>
                                    <span className="text-orange-400">
                                        <FaStar className="w-4 h-4 inline-block mr-1" />
                                        3.4 (3.288)
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col w-48">
                                <div className="h-72 bg-primary-600 rounded-lg cursor-pointer transition hover:brightness-110"></div>
                                <span className="text-md font-medium text-gray-500 mt-2 hover:underline cursor-pointer line-clamp-2">The Hunger Games</span>
                                <div className="flex justify-between text-sm mt-3">
                                    <span className="text-gray-500 hover:underline cursor-pointer">Suzanne Collins</span>
                                    <span className="text-orange-400">
                                        <FaStar className="w-4 h-4 inline-block mr-1" />
                                        5.0 (923)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

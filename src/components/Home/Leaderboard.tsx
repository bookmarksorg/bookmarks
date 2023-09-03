import { FaCrown } from "react-icons/fa";
import { BiSolidCrown } from "react-icons/bi";

export default function Leaderboard() {
    return (
        <div className="flex flex-col flex-1 h-fit bg-[#F1F5FA] rounded-md px-6 pb-5">
            {/* title */}
            <div className="flex flex-col items-center justify-center gap-2 text-2xl font-medium text-gray-600">
                <FaCrown className="w-10 h-10 text-[#FFB743] self-center mt-4" />
                Leaderboard
            </div>
            <div className="flex flex-col gap-3 mt-6">
                <div className="flex flex-col bg-gray-200 w-full rounded-lg h-max">
                    <div className="flex items-center justify-between gap-2 font-medium text-gray-600 py-3 px-4">
                        <div className="flex items-center">
                            <BiSolidCrown size={22} className="text-[#FFB743]" />
                            <span className="ml-3">Vitor_perei</span>
                        </div>
                        <span className="text-[#9D6B3C]">1000 pts</span>
                    </div>
                </div>
                <div className="flex flex-col bg-gray-200 w-full rounded-lg h-max">
                    <div className="flex items-center justify-between gap-2 font-medium text-gray-600 py-3 px-4">
                        <div className="flex items-center">
                            <BiSolidCrown size={22} className="text-[#48C8FF]" />
                            <span className="ml-3">Vitor_perei</span>
                        </div>
                        <span className="text-[#9D6B3C]">1000 pts</span>
                    </div>
                </div>
                <div className="flex flex-col bg-gray-200 w-full rounded-lg h-max">
                    <div className="flex items-center justify-between gap-2 font-medium text-gray-600 py-3 px-4">
                        <div className="flex items-center">
                            <BiSolidCrown size={22} className="text-[#FF7A00]" />
                            <span className="ml-3">Vitor_perei</span>
                        </div>
                        <span className="text-[#9D6B3C]">1000 pts</span>
                    </div>
                </div>
                <div className="flex flex-col bg-gray-200 w-full rounded-lg h-max">
                    <div className="flex items-center justify-between gap-2 font-medium text-gray-600 py-3 px-4">
                        <div className="flex items-center">
                            <span className="ml-1.5 font-bold text-gray-600">4</span>
                            <span className="ml-3">Vitor_perei</span>
                        </div>
                        <span className="text-[#9D6B3C]">1000 pts</span>
                    </div>
                </div>
                <div className="flex flex-col bg-gray-200 w-full rounded-lg h-max">
                    <div className="flex items-center justify-between gap-2 font-medium text-gray-600 py-3 px-4">
                        <div className="flex items-center">
                            <span className="ml-1.5 font-bold text-gray-600">5</span>
                            <span className="ml-3">Vitor_perei</span>
                        </div>
                        <span className="text-[#9D6B3C]">1000 pts</span>
                    </div>
                </div>
                <div className="flex flex-col bg-gray-200 w-full rounded-lg h-max">
                    <div className="flex items-center justify-between gap-2 font-medium text-gray-600 py-3 px-4">
                        <div className="flex items-center">
                            <span className="ml-1.5 font-bold text-gray-600">6</span>
                            <span className="ml-3">Vitor_perei</span>
                        </div>
                        <span className="text-[#9D6B3C]">1000 pts</span>
                    </div>
                </div>
                <div className="flex flex-col bg-gray-200 w-full rounded-lg h-max">
                    <div className="flex items-center justify-between gap-2 font-medium text-gray-600 py-3 px-4">
                        <div className="flex items-center">
                            <span className="ml-1.5 font-bold text-gray-600">7</span>
                            <span className="ml-3">Vitor_perei</span>
                        </div>
                        <span className="text-[#9D6B3C]">1000 pts</span>
                    </div>
                </div>
                <div className="flex flex-col bg-gray-200 w-full rounded-lg h-max">
                    <div className="flex items-center justify-between gap-2 font-medium text-gray-600 py-3 px-4">
                        <div className="flex items-center">
                            <span className="ml-1.5 font-bold text-gray-600">8</span>
                            <span className="ml-3">Vitor_perei</span>
                        </div>
                        <span className="text-[#9D6B3C]">1000 pts</span>
                    </div>
                </div>
                <div className="flex flex-col bg-gray-200 w-full rounded-lg h-max">
                    <div className="flex items-center justify-between gap-2 font-medium text-gray-600 py-3 px-4">
                        <div className="flex items-center">
                            <span className="ml-1.5 font-bold text-gray-600">9</span>
                            <span className="ml-3">Vitor_perei</span>
                        </div>
                        <span className="text-[#9D6B3C]">1000 pts</span>
                    </div>
                </div>
                <div className="flex flex-col bg-primary-600/30 w-full rounded-lg h-max">
                    <div className="flex items-center justify-between gap-2 font-medium text-gray-600 py-3 px-4">
                        <div className="flex items-center">
                            <span className="ml-1.5 font-bold text-primary-700">1002</span>
                            <span className="ml-3">Vitor_perei</span>
                        </div>
                        <span className="text-[#9D6B3C]">1000 pts</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

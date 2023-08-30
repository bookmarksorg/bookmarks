import Image from "next/image";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Link from "next/link";

export default function Header() {
    return (
        <div className="flex items-center px-20 py-3 border-2 gap-96 border-[#EEEEEE]">
            <Link href="/home">
                <Image src="/logo.svg" width={120} height={120} alt="BookMarks's logo" />
            </Link>
            <div className="flex relative w-full">
                <input
                    className="pr-4 pl-12 py-2 text-lg h-fit rounded-full border text-gray-600 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition w-6/12 peer"
                    type="text"
                    id="search"
                />
                <FaMagnifyingGlass className="h-5 w-5 text-black/40 absolute top-3 left-4 peer-focus:text-primary-600" />
            </div>
        </div>
    );
}

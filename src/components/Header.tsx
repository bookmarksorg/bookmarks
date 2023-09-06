import Image from "next/image";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import AccessibilityBar from "./AccessibilityBar";

export default function Header() {
    return (
        <>
            <AccessibilityBar />
            <div className="flex items-center px-20 py-3 border-b gap-96 border-b-[#EEEEEE] dark:border-b-[#4B5B73] dark:bg-[#1C2635]">
                <Link href="/home">
                    <Image src="/logo.svg" width={120} height={120} alt="BookMarks's logo" className="dark:hidden" />
                    <Image src="/white-logo.svg" width={120} height={120} alt="BookMarks's logo" className="hidden dark:block" />
                </Link>
                <div className="flex w-full justify-between">
                    <form action="/search" className="flex w-full relative">
                        <input
                            className="pr-4 pl-12 py-2 text-lg h-fit rounded-full border text-gray-600 border-gray-300 dark:border-none dark:bg-[#4B5B73] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-white focus:border-transparent transition w-6/12 peer"
                            type="text"
                            id="search"
                            name="q"
                        />
                        <FaMagnifyingGlass className="h-5 w-5 text-black/40 dark:text-white/40 absolute top-3 left-4 peer-focus:text-primary-600 dark:peer-focus:text-white" />
                    </form>
                    <ThemeSwitcher />
                </div>
            </div>
        </>
    );
}

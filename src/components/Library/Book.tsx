import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";

interface BookProps {
    id: string;
    image: string;
    noDetails?: boolean;
    title?: string;
    author?: string;
    rating?: string;
}

export default function Book({ id, noDetails, image, title, author, rating }: BookProps) {
    return (
        <div className="flex flex-col w-48">
            <Link href={`/books/${id}`}>
                <Image src={image} alt={`Cover of ${title}`} height={288} width={192} className="bg-secondary-700 rounded-lg cursor-pointer transition hover:brightness-110 w-48 h-72"></Image>
            </Link>
            {!noDetails && (
                <div className="text-gray-500 dark:text-white/90">
                    <Link href={`/books/${id}`} className="text-md font-medium mt-2 hover:underline cursor-pointer line-clamp-2">
                        {title}
                    </Link>
                    <div className="flex justify-between text-sm mt-3">
                        <span className="hover:underline cursor-pointer">{author}</span>
                        <span className="text-orange-400">
                            <FaStar className="w-4 h-4 inline-block mr-1" />
                            {rating}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

import Image from "next/image";
import { FaStar } from "react-icons/fa6";

interface BookProps {
    image: string;
    title: string;
    author: string;
    rating: string;
}

export default function Book({ image, title, author, rating }: BookProps) {
    return (
        <div className="flex flex-col w-48">
            <Image src={image} alt={`Cover of ${title}`} height={288} width={192} className="h-72 bg-secondary-700 rounded-lg cursor-pointer transition hover:brightness-110"></Image>
            <span className="text-md font-medium text-gray-500 mt-2 hover:underline cursor-pointer line-clamp-2">{title}</span>
            <div className="flex justify-between text-sm mt-3">
                <span className="text-gray-500 hover:underline cursor-pointer">{author}</span>
                <span className="text-orange-400">
                    <FaStar className="w-4 h-4 inline-block mr-1" />
                    {rating}
                </span>
            </div>
        </div>
    );
}

import Link from "next/link";
import { FaRegCommentDots, FaRegThumbsUp, FaRegBookmark } from "react-icons/fa6";

interface PostCardProps {
    title: string;
    description: string;
    author: string;
    book: string;
    bookId: string;
    date: string;
}

export default function PostCard({ title, description, author, book, bookId, date }: PostCardProps) {
    return (
        <div className="flex flex-col mx-6 mt-4 bg-white rounded-md px-8 py-6">
            <div className="flex justify-between mb-4">
                <Link href={`/profile/${author}`} className="text-sm font-bold text-gray-600 hover:underline cursor-pointer">
                    {author}
                </Link>
                <span className="text-sm font-semibold text-gray-600">{date}</span>
            </div>
            <Link href={`/books/${bookId}`} className="text-sm font-bold text-primary-600 hover:underline cursor-pointer">
                {book}
            </Link>
            <span className="text-lg font-bold text-gray-600 cursor-pointer">{title}</span>
            <span className="text-sm font-medium text-gray-600 mt-3">{description}</span>
            <div className="flex justify-end mt-8 gap-6">
                <div className="flex gap-1 items-center cursor-pointer transition text-gray-600 hover:text-primary-600">
                    <FaRegCommentDots className="w-5 h-5" />
                    <span className="text-sm font-medium">2k Comentários</span>
                </div>
                <div className="flex gap-1 items-center cursor-pointer transition text-gray-600 hover:text-primary-600">
                    <FaRegThumbsUp className="w-5 h-5" />
                    <span className="text-sm font-mediu">3k Curtidas</span>
                </div>
                <div className="flex gap-1 items-center cursor-pointer transition text-gray-600 hover:text-primary-600">
                    <FaRegBookmark className="w-5 h-5" />
                    <span className="text-sm font-medium">14k Marcações</span>
                </div>
            </div>
        </div>
    );
}

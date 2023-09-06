import Link from "next/link";
import { FaRegCommentDots, FaRegThumbsUp, FaRegBookmark, FaStar } from "react-icons/fa6";

interface PostCardProps {
    title: string;
    description: string;
    author: string;
    book?: string;
    bookId?: string;
    date: string;
    isReview?: boolean;
    rating?: number;
    discussionId?: string;
}

export default function PostCard({ title, description, author, book, bookId, date, isReview, rating, discussionId }: PostCardProps) {
    return (
        <div className={`flex flex-col mt-4 bg-white dark:bg-[#2D3F59] text-gray-600 dark:text-white/90 rounded-md px-8 ${isReview ? "py-8" : "py-6"} w-full`}>
            <div className="flex justify-between mb-4">
                <div className="flex gap-2 items-center">
                    <Link href={`/profile/${author}`} className="text-sm font-bold hover:underline cursor-pointer">
                        {author}
                    </Link>
                    {rating && (
                        <span className="text-orange-400">
                            {Array.from({ length: rating }).map((_, index) => (
                                <FaStar key={index} className="w-4 h-4 inline-block mr-1 -mt-1" />
                            ))}
                            {Array.from({ length: 5 - rating }).map((_, index) => (
                                <FaStar key={index} className="w-4 h-4 inline-block mr-1 -mt-1 text-gray-300" />
                            ))}
                        </span>
                    )}
                </div>
                <span className="text-sm font-semibold">{date}</span>
            </div>
            {book && (
                <Link href={`/books/${bookId}`} className="text-sm font-bold text-primary-600 hover:underline cursor-pointer">
                    {book}
                </Link>
            )}
            {isReview ? (
                <h1 className="text-2xl font-bold mt-2">{title}</h1>
            ) : (
                <Link href={`/books/${bookId}/discussions/${discussionId}`} className="text-lg font-bold">
                    {title}
                </Link>
            )}
            <span className="text-sm font-medium mt-3">{description}</span>
            {!isReview && (
                <div className="flex justify-end mt-8 gap-6">
                    <div className="flex gap-1 items-center cursor-pointer transition hover:text-primary-600">
                        <FaRegCommentDots className="w-5 h-5" />
                        <span className="text-sm font-medium">2k Comentários</span>
                    </div>
                    <div className="flex gap-1 items-center cursor-pointer transition hover:text-primary-600">
                        <FaRegThumbsUp className="w-5 h-5" />
                        <span className="text-sm font-mediu">3k Curtidas</span>
                    </div>
                    <div className="flex gap-1 items-center cursor-pointer transition hover:text-primary-600">
                        <FaRegBookmark className="w-5 h-5" />
                        <span className="text-sm font-medium">14k Marcações</span>
                    </div>
                </div>
            )}
        </div>
    );
}

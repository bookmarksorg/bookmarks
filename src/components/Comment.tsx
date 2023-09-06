import Link from "next/link";
import { FaRegCommentDots, FaRegThumbsUp } from "react-icons/fa6";

interface CommentProps {
    author: string;
    comment: string;
    date: string;
    answers: string;
    likes: string;
}

export default function Comment({ author, comment, date, answers, likes }: CommentProps) {
    return (
        <div className={`flex flex-col mt-4 bg-white dark:bg-[#2D3F59] text-gray-600 dark:text-white/90 rounded-md px-8 py-6 w-full`}>
            <div className="flex justify-between mb-4">
                <div className="flex gap-2 items-center">
                    <Link href={`/profile/${author}`} className="text-sm font-bold hover:underline cursor-pointer">
                        {author}
                    </Link>
                </div>
                <span className="text-sm font-semibold">{date}</span>
            </div>
            <span className="text-sm font-medium mt-3">{comment}</span>
            <div className="flex justify-end mt-8 gap-6">
                <div className="flex gap-1 items-center cursor-pointer transition hover:text-primary-600">
                    <FaRegCommentDots className="w-5 h-5" />
                    <span className="text-sm font-medium">{answers} Respostas</span>
                </div>
                <div className="flex gap-1 items-center cursor-pointer transition hover:text-primary-600">
                    <FaRegThumbsUp className="w-5 h-5" />
                    <span className="text-sm font-mediu">{likes} Curtidas</span>
                </div>
            </div>
        </div>
    );
}

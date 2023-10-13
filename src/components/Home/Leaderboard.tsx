import { FaCrown } from "react-icons/fa";
import { BiSolidCrown } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

type LeaderboardUsers = {
    username: string;
    points: number;
    position: number;
    isCurrentUser: boolean;
};

export default function Leaderboard() {
    const [users, setUsers] = useState<LeaderboardUsers[]>([]);
    const { data } = useSession();

    useEffect(() => {
        async function getLeaderboard() {
            const { data: users } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/leaderboard/`, {
                headers: {
                    Authorization: `Bearer ${data?.user?.image}`,
                },
            });
            setUsers(users);
        }

        if (data?.user?.image) getLeaderboard();
    }, [data]);

    return (
        <div className="flex flex-col flex-1 h-fit bg-[#F1F5FA] dark:bg-[#253449] rounded-md px-6 pb-5 text-gray-600 dark:text-white">
            {/* title */}
            <div className="flex flex-col items-center justify-center gap-2 text-2xl font-medium ">
                <FaCrown className="w-10 h-10 text-[#FFB743] self-center mt-4" />
                Leaderboard
            </div>
            <div className="flex flex-col gap-3 mt-6">
                {users.map((user) => (
                    <div key={user.username} className={`flex flex-col bg-gray-200 dark:bg-[#4B5B73] w-full rounded-lg h-max ${user.isCurrentUser ? "bg-primary-600/30 dark:bg-primary-700" : ""}`}>
                        <div className="flex items-center justify-between gap-2 font-medium py-3 px-4">
                            <div className="flex items-center">
                                {user.position <= 3 ? (
                                    <BiSolidCrown size={22} className={user.position === 1 ? "text-[#FFB743]" : user.position === 2 ? "text-[#48C8FF]" : "text-[#FF7A00]"} />
                                ) : (
                                    <span className="ml-1.5 font-bold ">{user.position}</span>
                                )}
                                <span className="ml-3">{user.username}</span>
                            </div>
                            <span className="text-[#9D6B3C] dark:text-[#FFB743]">{user.points} pts</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

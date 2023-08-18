"use client";

import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    router.push("/register");

    return <div className="home">home</div>;
}

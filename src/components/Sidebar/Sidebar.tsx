"use client";

import { FaHouse, FaLayerGroup, FaUser, FaGear, FaRightFromBracket } from "react-icons/fa6";

import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { getSession, signOut, useSession } from "next-auth/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Sidebar() {
    const url = usePathname().toLowerCase();
    const { data } = useSession();
    const [username, setUsername] = useState("");

    useEffect(() => {
        if (data && data.user && data.user.name) setUsername(data.user.name);
    }, [data]);

    return (
        <div className="flex bg-secondary-700 dark:bg-[#253449]">
            <div className="flex flex-col w-64 items-center py-6 px-3 justify-between">
                <div id="menu" className="flex flex-col gap-3 w-full">
                    <Link href="/">
                        <SidebarItem active={url === "/"} name="Início" icon={<FaHouse className="h-5 w-5" />} />
                    </Link>
                    <Link href="/library">
                        <SidebarItem active={url === "/library"} name="Biblioteca" icon={<FaLayerGroup className="h-5 w-5" />} />
                    </Link>
                    <Link href={`/profile/${username}`}>
                        <SidebarItem active={url === `/profile/${username}`} name="Perfil" icon={<FaUser className="h-5 w-5" />} />
                    </Link>
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <SidebarItem name="Configurações" icon={<FaGear className="h-5 w-5" />} />
                    <Link href="#" onClick={() => signOut()}>
                        <SidebarItem name="Sair" icon={<FaRightFromBracket className="h-5 w-5" />} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

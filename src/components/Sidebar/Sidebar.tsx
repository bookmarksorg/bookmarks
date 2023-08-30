"use client";

import { FaHouse, FaLayerGroup, FaUser, FaGear, FaRightFromBracket } from "react-icons/fa6";

import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
    const url = usePathname().toLowerCase();

    return (
        <div className="flex bg-secondary-700">
            <div className="flex flex-col w-64 items-center py-6 px-3 justify-between">
                <div className="flex flex-col gap-3 w-full">
                    <Link href="/home">
                        <SidebarItem active={url === "/home"} name="Início" icon={<FaHouse className="h-5 w-5" />} />
                    </Link>
                    <Link href="/library">
                        <SidebarItem active={url === "/library"} name="Biblioteca" icon={<FaLayerGroup className="h-5 w-5" />} />
                    </Link>
                    <Link href="/profile/Jorge_pat">
                        <SidebarItem active={url === "/profile/jorge_pat"} name="Perfil" icon={<FaUser className="h-5 w-5" />} />
                    </Link>
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <SidebarItem name="Configurações" icon={<FaGear className="h-5 w-5" />} />
                    <SidebarItem name="Sair" icon={<FaRightFromBracket className="h-5 w-5" />} />
                </div>
            </div>
        </div>
    );
}

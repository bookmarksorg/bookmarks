import { FaHouse, FaLayerGroup, FaUser, FaGear, FaRightFromBracket } from "react-icons/fa6";

import SidebarItem from "./SidebarItem";

export default function Sidebar() {
    return (
        <div className="flex bg-secondary-700">
            <div className="flex flex-col w-64 items-center py-6 px-3 justify-between">
                <div className="flex flex-col gap-3 w-full">
                    <SidebarItem active={true} name="Início" icon={<FaHouse className="h-5 w-5 text-white" />} />
                    <SidebarItem name="Biblioteca" icon={<FaLayerGroup className="h-5 w-5 text-white/60 group-hover:text-white" />} />
                    <SidebarItem name="Perfil" icon={<FaUser className="h-5 w-5 text-white/60 group-hover:text-white" />} />
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <SidebarItem name="Configurações" icon={<FaGear className="h-5 w-5 text-white/60 group-hover:text-white" />} />
                    <SidebarItem name="Sair" icon={<FaRightFromBracket className="h-5 w-5 text-white/60 group-hover:text-white" />} />
                </div>
            </div>
        </div>
    );
}

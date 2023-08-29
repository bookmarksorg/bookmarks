interface SidebarItemProps {
    name: string;
    icon: React.ReactNode;
    active?: boolean;
}

export default function SidebarItem({ icon, name, active }: SidebarItemProps) {
    return (
        <div
            className={`flex border cursor-pointer rounded-full px-4 py-3 w-full ${
                active ? "border-primary-600 bg-primary-600" : "hover:border-primary-600 hover:bg-primary-600 border-white/60"
            } transition group`}
        >
            {icon}
            <span className={`ml-2 text-md pl-0.5 ${active ? "text-white" : "group-hover:text-white text-white/60"}`}>{name}</span>
        </div>
    );
}

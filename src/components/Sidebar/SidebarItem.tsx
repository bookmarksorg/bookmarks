interface SidebarItemProps {
    name: string;
    icon: React.ReactNode;
    active?: boolean;
}

export default function SidebarItem({ icon, name, active }: SidebarItemProps) {
    return (
        <div
            className={`flex items-center border cursor-pointer rounded-full px-5 py-3 w-full ${
                active ? "border-primary-600 bg-primary-600 text-white" : "hover:border-primary-600 hover:bg-primary-600 border-white/60 text-white/60 hover:text-white"
            } transition group`}
        >
            {icon}
            <span className={"text-md pl-3"}>{name}</span>
        </div>
    );
}

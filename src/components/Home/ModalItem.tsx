"use client";

import { useState } from "react";

interface ModalItemProps {
    icon: any;
    name: string;
}

export default function ModalItem({ icon, name }: ModalItemProps) {
    const [active, setActive] = useState(true);

    return (
        <div
            className={`flex rounded-xl gap-2 flex-col items-center justify-center py-3 border-2 transition cursor-pointer text-sm ${
                active
                    ? "border-primary-600/5 dark:border-white/5 bg-primary-600/5 dark:bg-white/5 hover:bg-primary-600/30 dark:hover:bg-primary-600/30 hover:border-primary-600/30 dark:hover:border-primary-600/30 dark:hover:text-primary-600 hover:text-primary-600"
                    : "bg-primary-600/30 border-primary-600/30 text-primary-600"
            }`}
            onClick={() => setActive(!active)}
        >
            {icon}
            {name}
        </div>
    );
}

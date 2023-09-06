// import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
    id: string;
    type?: string;
    label: string;
    // register: UseFormRegister<FieldValues>;
}

export default function Input({ id, label, type = "text" }: InputProps) {
    return (
        <div className="flex flex-col">
            <label className="text-md text-gray-500 pl-0.5" htmlFor={id}>
                {label}
            </label>
            <input
                className="dark:bg-white px-4 py-2 text-lg rounded-full border text-gray-600 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition w-full"
                type={type}
                id={id}
                required
                // {...register(id, { required: true })}
            />
        </div>
    );
}

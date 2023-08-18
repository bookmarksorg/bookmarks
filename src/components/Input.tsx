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
            <label className="text-lg text-gray-500" htmlFor={id}>
                {label}
            </label>
            <input
                className="px-4 py-2 text-xl rounded-full border text-gray-600 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ED766F] focus:border-transparent transition w-full"
                type={type}
                id={id}
                required
                // {...register(id, { required: true })}
            />
        </div>
    );
}

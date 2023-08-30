import { FaFilter } from "react-icons/fa6";

export default function FilterBar() {
    return (
        <div className="flex bg-white text-gray-600 py-4 w-full rounded-lg px-8 items-center gap-16">
            <div className="flex flex-grow gap-12">
                <div className="flex gap-4 items-center">
                    <span className="font-semibold">Gênero:</span>
                    <select className="border border-gray-300 rounded-lg px-4 py-2">
                        <option value="1">Terror</option>
                        <option value="2">Drama</option>
                        <option value="3">Comédia</option>
                    </select>
                </div>
                <div className="flex gap-4 items-center">
                    <span className="font-semibold">Data:</span>
                    <select className="border border-gray-300 rounded-lg px-4 py-2">
                        <option value="1">Atualizado recentemente</option>
                        <option value="2">Data de criação</option>
                    </select>
                </div>
                <div className="flex gap-4 items-center">
                    <span className="font-semibold">Popularidade:</span>
                    <select className="border border-gray-300 rounded-lg px-4 py-2">
                        <option value="1">Melhor avaliados</option>
                        <option value="2">Pior avaliados</option>
                    </select>
                </div>
            </div>
            <div className="flex gap-4 items-center">
                <span className="flex items-center gap-3 cursor-pointer px-6 py-3 rounded-lg bg-primary-600 text-white transition hover:brightness-105 font-semibold">
                    Filtrar
                    <FaFilter />
                </span>
            </div>
        </div>
    );
}

import { FaFilter } from "react-icons/fa6";
import MuiThemeProvider from "../MuiThemeProvider";
import { FormHelperText, MenuItem, Select } from "@mui/material";
import { useState } from "react";

interface FilterBarProps {
    setOrderRating: (value: string) => void;
}

export default function FilterBar({ setOrderRating }: FilterBarProps) {
    const [localOrder, setLocalOrder] = useState<string>("");

    const handleChangeRating = (event: React.ChangeEvent<{ value: unknown }>) => {
        setLocalOrder(event.target.value as string);
    };

    return (
        <div className="flex bg-white dark:bg-[#2D3F59] text-gray-600 dark:text-white/90 py-4 w-full rounded-lg px-8 items-center">
            <div className="flex flex-grow gap-12">
                <div className="flex gap-2 items-center">
                    <span className="font-semibold">Gênero:</span>
                    <MuiThemeProvider>
                        <Select value="" displayEmpty>
                            <MenuItem value="">
                                <em>Filtre por gênero</em>
                            </MenuItem>
                            <MenuItem value={10}>Terror</MenuItem>
                            <MenuItem value={10}>Drama</MenuItem>
                            <MenuItem value={10}>Thriller</MenuItem>
                            <MenuItem value={10}>Musical</MenuItem>
                            <MenuItem value={10}>Romance</MenuItem>
                            <MenuItem value={10}>Fantasy</MenuItem>
                            <MenuItem value={10}>Western</MenuItem>
                            <MenuItem value={10}>War</MenuItem>
                            <MenuItem value={10}>Action</MenuItem>
                            <MenuItem value={10}>Sport</MenuItem>
                            <MenuItem value={10}>Medicine</MenuItem>
                            <MenuItem value={10}>Sci-Fi</MenuItem>
                            <MenuItem value={10}>Documentary</MenuItem>
                            <MenuItem value={10}>Comedy</MenuItem>
                            <MenuItem value={10}>Family</MenuItem>
                        </Select>
                    </MuiThemeProvider>
                </div>
                <div className="flex gap-2 items-center">
                    <span className="font-semibold">Data:</span>
                    <MuiThemeProvider>
                        <Select value="" displayEmpty>
                            <MenuItem value="">
                                <em>Filtre por data</em>
                            </MenuItem>
                            <MenuItem value={10}>Recentes</MenuItem>
                            <MenuItem value={10}>Antigos</MenuItem>
                        </Select>
                    </MuiThemeProvider>
                </div>
                <div className="flex gap-2 items-center">
                    <span className="font-semibold">Popularidade:</span>
                    <MuiThemeProvider>
                        <Select value={localOrder} onChange={handleChangeRating} displayEmpty>
                            <MenuItem value="">
                                <em>Filtre por popularidade</em>
                            </MenuItem>
                            <MenuItem value="desc">Melhor avaliados</MenuItem>
                            <MenuItem value="asc">Pior avaliados</MenuItem>
                        </Select>
                    </MuiThemeProvider>
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <button className="flex items-center gap-3 px-5 py-2 rounded-lg bg-primary-600 text-white transition hover:brightness-105 font-semibold" onClick={() => setOrderRating(localOrder)}>
                    Filtrar
                    <FaFilter />
                </button>
            </div>
        </div>
    );
}

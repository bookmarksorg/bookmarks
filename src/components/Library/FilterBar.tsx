import { FaFilter } from "react-icons/fa6";
import MuiThemeProvider from "../MuiThemeProvider";
import { FormHelperText, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

interface FilterBarProps {
    setRatingSort: (value: string) => void;
    setDateSort: (value: string) => void;
    setPopularitySort: (value: string) => void;
    setIsLoading: (value: boolean) => void;
}

export default function FilterBar({ setRatingSort, setDateSort, setPopularitySort, setIsLoading }: FilterBarProps) {
    const [localRatingSort, setLocalRatingSort] = useState<string>("");
    const [localDateSort, setLocalDateSort] = useState<string>("");
    const [localPopularitySort, setLocalPopularitySort] = useState<string>("");

    const handleChangeDate = (event: SelectChangeEvent<string>) => {
        setLocalDateSort(event.target.value as string);
    };

    const handleChangeRating = (event: SelectChangeEvent<string>) => {
        setLocalRatingSort(event.target.value as string);
    };

    const handleChangePopularity = (event: SelectChangeEvent<string>) => {
        setLocalPopularitySort(event.target.value as string);
    };

    const filterBooks = () => {
        setIsLoading(true);
        setRatingSort(localRatingSort);
        setDateSort(localDateSort);
        setPopularitySort(localPopularitySort);
    };

    return (
        <div className="flex bg-white dark:bg-[#2D3F59] text-gray-600 dark:text-white/90 py-4 w-full rounded-lg px-8 items-center">
            <div className="flex flex-grow gap-8">
                <div className="flex gap-2 items-center">
                    <span className="font-semibold">Popularidade:</span>
                    <MuiThemeProvider>
                        <Select value={localPopularitySort} onChange={handleChangePopularity} displayEmpty inputProps={{ style: { paddingTop: "8px", paddingBottom: "8px" } }}>
                            <MenuItem value="">
                                <em>Filtre por...</em>
                            </MenuItem>
                            <MenuItem value="desc">Mais popular</MenuItem>
                            <MenuItem value="asc">Menos popular</MenuItem>
                        </Select>
                    </MuiThemeProvider>
                </div>
                <div className="flex gap-2 items-center">
                    <span className="font-semibold">Avaliação:</span>
                    <MuiThemeProvider>
                        <Select value={localRatingSort} onChange={handleChangeRating} displayEmpty inputProps={{ style: { paddingTop: "8px", paddingBottom: "8px" } }}>
                            <MenuItem value="">
                                <em>Filtre por...</em>
                            </MenuItem>
                            <MenuItem value="desc">Melhor avaliados</MenuItem>
                            <MenuItem value="asc">Pior avaliados</MenuItem>
                        </Select>
                    </MuiThemeProvider>
                </div>
                <div className="flex gap-2 items-center">
                    <span className="font-semibold">Data:</span>
                    <MuiThemeProvider>
                        <Select value={localDateSort} onChange={handleChangeDate} displayEmpty inputProps={{ style: { paddingTop: "8px", paddingBottom: "8px" } }}>
                            <MenuItem value="">
                                <em>Filtre por...</em>
                            </MenuItem>
                            <MenuItem value="-published">Recentes</MenuItem>
                            <MenuItem value="published">Antigos</MenuItem>
                        </Select>
                    </MuiThemeProvider>
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <button className="flex items-center gap-3 px-5 py-2 rounded-lg bg-primary-600 text-white transition hover:brightness-105 font-semibold" onClick={() => filterBooks()}>
                    Filtrar
                    <FaFilter />
                </button>
            </div>
        </div>
    );
}

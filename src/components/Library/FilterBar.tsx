import { FaFilter } from "react-icons/fa6";
import MuiThemeProvider from "../MuiThemeProvider";
import { FormHelperText, MenuItem, Select } from "@mui/material";
import { useState } from "react";

interface FilterBarProps {
    setRatingSort: (value: string) => void;
}

export default function FilterBar({ setRatingSort }: FilterBarProps) {
    const [localRatingSort, setLocalRatingSort] = useState<string>("");
    const [dateSort, setDateSort] = useState<string>("");
    const [genreSort, setGenreSort] = useState<string>("");

    const handleChangeRating = (event: React.ChangeEvent<{ value: unknown }>) => {
        setLocalRatingSort(event.target.value as string);
    };

    const handleChangeDate = (event: React.ChangeEvent<{ value: unknown }>) => {
        setDateSort(event.target.value as string);
    };

    const handleChangeGenre = (event: React.ChangeEvent<{ value: unknown }>) => {
        setGenreSort(event.target.value as string);
    };

    return (
        <div className="flex bg-white dark:bg-[#2D3F59] text-gray-600 dark:text-white/90 py-4 w-full rounded-lg px-8 items-center">
            <div className="flex flex-grow gap-8">
                <div className="flex gap-2 items-center">
                    <span className="font-semibold">Gênero:</span>
                    <MuiThemeProvider>
                        <Select value={genreSort} onChange={handleChangeGenre} displayEmpty>
                            <MenuItem value="">
                                <em>Filtre por...</em>
                            </MenuItem>
                            <MenuItem value={1}>Terror</MenuItem>
                            <MenuItem value={2}>Drama</MenuItem>
                            <MenuItem value={3}>Thriller</MenuItem>
                            <MenuItem value={4}>Musical</MenuItem>
                            <MenuItem value={5}>Romance</MenuItem>
                            <MenuItem value={6}>Fantasy</MenuItem>
                            <MenuItem value={7}>Western</MenuItem>
                            <MenuItem value={8}>War</MenuItem>
                            <MenuItem value={9}>Action</MenuItem>
                            <MenuItem value={10}>Sport</MenuItem>
                            <MenuItem value={11}>Medicine</MenuItem>
                            <MenuItem value={12}>Sci-Fi</MenuItem>
                            <MenuItem value={13}>Documentary</MenuItem>
                            <MenuItem value={14}>Comedy</MenuItem>
                            <MenuItem value={15}>Family</MenuItem>
                        </Select>
                    </MuiThemeProvider>
                </div>
                <div className="flex gap-2 items-center">
                    <span className="font-semibold">Data:</span>
                    <MuiThemeProvider>
                        <Select value={dateSort} onChange={handleChangeDate} displayEmpty>
                            <MenuItem value="">
                                <em>Filtre por...</em>
                            </MenuItem>
                            <MenuItem value="recentes">Recentes</MenuItem>
                            <MenuItem value="antigos">Antigos</MenuItem>
                        </Select>
                    </MuiThemeProvider>
                </div>
                <div className="flex gap-2 items-center">
                    <span className="font-semibold">Popularidade:</span>
                    <MuiThemeProvider>
                        <Select value={localRatingSort} onChange={handleChangeRating} displayEmpty>
                            <MenuItem value="">
                                <em>Filtre por...</em>
                            </MenuItem>
                            <MenuItem value="desc">Melhor avaliados</MenuItem>
                            <MenuItem value="asc">Pior avaliados</MenuItem>
                        </Select>
                    </MuiThemeProvider>
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <button className="flex items-center gap-3 px-5 py-2 rounded-lg bg-primary-600 text-white transition hover:brightness-105 font-semibold" onClick={() => setRatingSort(localRatingSort)}>
                    Filtrar
                    <FaFilter />
                </button>
            </div>
        </div>
    );
}

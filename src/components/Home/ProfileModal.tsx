"use client";

import { useEffect, useState } from "react";
import Modal from "react-modal";
import ModalItem from "./ModalItem";
import toast from "react-hot-toast";
import {
    FaFaceGrinHearts,
    FaFaceGrinSquintTears,
    FaFilm,
    FaFortAwesome,
    FaGun,
    FaHandcuffs,
    FaHatCowboy,
    FaHelmetUn,
    FaMasksTheater,
    FaMicrophone,
    FaPeopleRoof,
    FaPersonMilitaryRifle,
    FaRedditAlien,
    FaSkull,
    FaStethoscope,
} from "react-icons/fa6";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Input } from "@mui/material";
import MuiThemeProvider from "../MuiThemeProvider";
import { FaEdit } from "react-icons/fa";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

type ProfileModalProps = {
    isOpen: boolean;
    setModalIsOpen: (value: boolean) => void;
    refresh?: () => void;
};

export function ProfileModal({ isOpen, setModalIsOpen, refresh }: ProfileModalProps) {
    const { data } = useSession();

    useEffect(() => {
        Modal.setAppElement("#root");
    }, []);

    const [modalIsOpen, setIsOpen] = useState(isOpen);
    const [genresSelected, setGenresSelected] = useState<string[]>([]);
    const [genres, setGenres] = useState<string[]>([]);
    const [user, setUser] = useState<any>({});
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        setIsOpen(isOpen);
    }, [isOpen]);

    function closeModal() {
        setIsOpen(false);
        setModalIsOpen(false);
    }

    useEffect(() => {
        async function getUser() {
            const { data: user } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
                headers: {
                    Authorization: `Bearer ${data?.user?.image}`,
                },
            });
            console.log(user);
            setUsername(user.username);
            setEmail(user.email);
            setDescription(user.description);
            setGenresSelected(user.genres.map((item: any) => item.name));
        }

        if (data?.user?.image) getUser();
    }, [data]);

    const handleGenre = (genre: string) => {
        if (genresSelected.includes(genre)) {
            setGenresSelected(genresSelected.filter((item) => item !== genre));
        } else {
            if (genresSelected.length >= 5) {
                return toast.error("Até no máximo 5 gêneros!");
            }
            setGenresSelected([...genresSelected, genre]);
        }
    };

    async function onConfirm() {
        if (!data?.user?.image) return;
        if (!email) return toast.error("Insira um e-mail!");
        await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/${user?.id_user}/`,
            {
                genres: genresSelected,
                email,
                description,
            },
            {
                headers: {
                    Authorization: `Bearer ${data?.user?.image}`,
                },
            }
        );

        toast.success("Perfil atualizado com sucesso!");
        closeModal();
        if (refresh) refresh();
    }
    return (
        <Modal
            className="outline-none absolute w-3/5 h-[90%] overflow-y-scroll bg-white dark:bg-[#253449] rounded-xl flex flex-col"
            overlayClassName="overlay"
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={true}
            isOpen={modalIsOpen}
            style={customStyles}
            contentLabel="Select Modal"
        >
            <div className="flex flex-col text-center text-secondary-700 dark:text-white h-full">
                <div className="flex flex-col flex-[1]">
                    <h2 className="flex self-start px-40 text-4xl font-semibold mt-12">Configurações:</h2>
                    <div className="flex gap-10 mt-14 px-40 w-full">
                        <div className="flex-none flex bg-primary-700 h-44 w-44 border-[3px] border-white dark:border-[#253449] text-white rounded-full items-center justify-center text-6xl self-center">
                            {username && username[0].toUpperCase()}
                        </div>
                        <div className="flex flex-col gap-6 w-full">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="flex self-start text-lg font-semibold">
                                    E-mail
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    className="dark:bg-transparent px-4 py-2 text-lg rounded-2xl dark:border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition w-full"
                                    placeholder="E-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="description" className="flex self-start text-lg font-semibold">
                                    Descrição
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    className="flex-grow border border-gray-300 dark:bg-transparent dark:border-2 rounded-lg px-4 py-2 min-h-[100px] max-h-[100px]"
                                    placeholder="Escreva sua bio..."
                                    rows={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-[3] h-full justify-between mt-12 px-40">
                    <h2 className="flex text-2xl font-semibold">Gêneros favoritos: </h2>
                    <div className="grid grid-cols-5 gap-4 mt-4">
                        <ModalItem icon={<FaSkull className="h-8 w-8" />} name="Terror" active={genresSelected.includes("Terror")} onClick={() => handleGenre("Terror")} />
                        <ModalItem icon={<FaMasksTheater className="h-8 w-8" />} name="Drama" active={genresSelected.includes("Drama")} onClick={() => handleGenre("Drama")} />
                        <ModalItem icon={<FaHandcuffs className="h-8 w-8" />} name="Thriller" active={genresSelected.includes("Thriller")} onClick={() => handleGenre("Thriller")} />
                        <ModalItem icon={<FaMicrophone className="h-8 w-8" />} name="Musical" active={genresSelected.includes("Musical")} onClick={() => handleGenre("Musical")} />
                        <ModalItem icon={<FaFaceGrinHearts className="h-8 w-8" />} name="Romance" active={genresSelected.includes("Romance")} onClick={() => handleGenre("Romance")} />
                        <ModalItem icon={<FaFortAwesome className="h-8 w-8" />} name="Fantasy" active={genresSelected.includes("Fantasy")} onClick={() => handleGenre("Fantasy")} />
                        <ModalItem icon={<FaHatCowboy className="h-8 w-8" />} name="Western" active={genresSelected.includes("Western")} onClick={() => handleGenre("Western")} />
                        <ModalItem icon={<FaPersonMilitaryRifle className="h-8 w-8" />} name="War" active={genresSelected.includes("War")} onClick={() => handleGenre("War")} />
                        <ModalItem icon={<FaGun className="h-8 w-8" />} name="Action" active={genresSelected.includes("Action")} onClick={() => handleGenre("Action")} />
                        <ModalItem icon={<FaHelmetUn className="h-8 w-8" />} name="Sport" active={genresSelected.includes("Sport")} onClick={() => handleGenre("Sport")} />
                        <ModalItem icon={<FaStethoscope className="h-8 w-8" />} name="Medicine" active={genresSelected.includes("Medicine")} onClick={() => handleGenre("Medicine")} />
                        <ModalItem icon={<FaRedditAlien className="h-8 w-8" />} name="Sci-Fi" active={genresSelected.includes("Sci-Fi")} onClick={() => handleGenre("Sci-Fi")} />
                        <ModalItem icon={<FaFilm className="h-8 w-8" />} name="Documentary" active={genresSelected.includes("Documentary")} onClick={() => handleGenre("Documentary")} />
                        <ModalItem icon={<FaFaceGrinSquintTears className="h-8 w-8" />} name="Comedy" active={genresSelected.includes("Comedy")} onClick={() => handleGenre("Comedy")} />
                        <ModalItem icon={<FaPeopleRoof className="h-8 w-8" />} name="Family" active={genresSelected.includes("Family")} onClick={() => handleGenre("Family")} />
                    </div>
                    <div className="flex w-full align-bottom mt-8 pb-10 gap-4">
                        <span
                            className="flex cursor-pointer place-content-center w-full px-6 py-3 rounded-lg bg-secondary-600 brightness-125 text-white text-xl font-medium text-center transition hover:brightness-110"
                            onClick={closeModal}
                        >
                            Cancelar
                        </span>
                        <span
                            className="flex cursor-pointer place-content-center w-full px-6 py-3 rounded-lg bg-primary-600 text-white text-xl font-medium text-center transition hover:bg-primary-700"
                            onClick={onConfirm}
                        >
                            Confirmar
                        </span>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

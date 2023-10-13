"use client";

import { useEffect, useState } from "react";
import Modal from "react-modal";
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
import ModalItem from "./ModalItem";
import toast from "react-hot-toast";

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

type GenresModalProps = {
    isOpen: boolean;
    onConfirm: () => void;
    setModalIsOpen: (value: boolean) => void;
    genresSelected: string[];
    setGenresSelected: (value: string[]) => void;
};

export function GenresModal({ isOpen, onConfirm, setModalIsOpen, genresSelected, setGenresSelected }: GenresModalProps) {
    Modal.setAppElement("#root");

    const [modalIsOpen, setIsOpen] = useState(isOpen);

    useEffect(() => {
        setIsOpen(isOpen);
    }, [isOpen]);

    function closeModal() {
        setIsOpen(false);
        setModalIsOpen(false);
    }

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

    return (
        <Modal
            className="outline-none absolute w-3/5 h-5/6 bg-white dark:bg-[#253449] rounded-xl flex flex-col items-center"
            overlayClassName="overlay"
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={true}
            isOpen={modalIsOpen}
            style={customStyles}
            contentLabel="Select Modal"
        >
            <div className="flex flex-col text-center text-secondary-700 dark:text-white h-full">
                <div className="flex flex-col flex-[1] items-center">
                    <h2 className="text-4xl font-semibold mt-12">Selecione seus gêneros favoritos</h2>

                    <p className="mt-4 w-4/5 text-lg">Isso criará uma experiência personalizada pra você e ficará destacado em seu perfil!</p>
                </div>
                <div className="flex flex-col flex-[3] h-full justify-between">
                    <div className="grid grid-cols-5 gap-4 mt-8">
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
                    <div className="flex w-full align-bottom justify-between pb-10">
                        <span className="flex cursor-pointer px-1 py-3 underline" onClick={onConfirm}>
                            Pular por enquanto
                        </span>
                        <span className="flex cursor-pointer px-6 py-3 rounded-lg bg-primary-600 text-white transition hover:bg-primary-700" onClick={onConfirm}>
                            Confirmar
                        </span>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

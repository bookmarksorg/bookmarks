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
};

export function GenresModal({ isOpen, onConfirm, setModalIsOpen }: GenresModalProps) {
    Modal.setAppElement("#root");

    const [modalIsOpen, setIsOpen] = useState(isOpen);

    useEffect(() => {
        setIsOpen(isOpen);
    }, [isOpen]);

    function closeModal() {
        setIsOpen(false);
        setModalIsOpen(false);
    }

    const [active, setActive] = useState(false);

    function handleActive() {
        setActive(!active);
    }

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
                        <ModalItem icon={<FaSkull className="h-8 w-8" />} name="Terror" />
                        <ModalItem icon={<FaMasksTheater className="h-8 w-8" />} name="Drama" />
                        <ModalItem icon={<FaHandcuffs className="h-8 w-8" />} name="Thriller" />
                        <ModalItem icon={<FaMicrophone className="h-8 w-8" />} name="Musical" />
                        <ModalItem icon={<FaFaceGrinHearts className="h-8 w-8" />} name="Romance" />
                        <ModalItem icon={<FaFortAwesome className="h-8 w-8" />} name="Fantasy" />
                        <ModalItem icon={<FaHatCowboy className="h-8 w-8" />} name="Western" />
                        <ModalItem icon={<FaPersonMilitaryRifle className="h-8 w-8" />} name="War" />
                        <ModalItem icon={<FaGun className="h-8 w-8" />} name="Action" />
                        <ModalItem icon={<FaHelmetUn className="h-8 w-8" />} name="Sport" />
                        <ModalItem icon={<FaStethoscope className="h-8 w-8" />} name="Medicine" />
                        <ModalItem icon={<FaRedditAlien className="h-8 w-8" />} name="Sci-Fi" />
                        <ModalItem icon={<FaFilm className="h-8 w-8" />} name="Documentary" />
                        <ModalItem icon={<FaFaceGrinSquintTears className="h-8 w-8" />} name="Comedy" />
                        <ModalItem icon={<FaPeopleRoof className="h-8 w-8" />} name="Family" />
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

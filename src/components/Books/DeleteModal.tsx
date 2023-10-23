"use client";

import { useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import Modal from "react-modal";

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

type DeleteModalProps = {
    isOpen: boolean;
    onConfirm: () => void;
    setModalIsOpen: (value: boolean) => void;
};

export function DeleteModal({ isOpen, onConfirm, setModalIsOpen }: DeleteModalProps) {
    Modal.setAppElement("#root");

    const [modalIsOpen, setIsOpen] = useState(isOpen);

    useEffect(() => {
        setIsOpen(isOpen);
    }, [isOpen]);

    function closeModal() {
        setIsOpen(false);
        setModalIsOpen(false);
    }

    return (
        <Modal
            className="outline-none absolute w-3/6 h-[-webkit-fill-available] bg-white dark:bg-[#253449] rounded-xl flex flex-col items-center"
            overlayClassName="overlay"
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={true}
            isOpen={modalIsOpen}
            style={customStyles}
            contentLabel="Select Modal"
        >
            <div className="flex flex-col text-center text-secondary-700 dark:text-white">
                <div className="flex flex-col items-center">
                    <FaExclamationTriangle className="w-16 h-16 mt-8 text-primary-600" />
                    <h2 className="text-2xl font-semibold mt-12">Tem certeza que deseja excluir essa discussão?</h2>

                    <p className="mt-4 w-4/5 text-lg">Essa ação não pode ser desfeita.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex gap-8 mt-12 text-xl w-full px-16">
                        <span
                            className="flex cursor-pointer py-3 rounded-lg bg-secondary-700 dark:bg-[#121922] text-white transition hover:bg-secondary-600 dark:hover:brightness-110 w-full justify-center items-center gap-4"
                            onClick={() => setModalIsOpen(false)}
                        >
                            Cancelar
                        </span>
                        <span className="flex cursor-pointer py-3 rounded-lg bg-primary-600 text-white transition hover:bg-primary-700 w-full justify-center items-center gap-4" onClick={onConfirm}>
                            Confirmar
                        </span>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

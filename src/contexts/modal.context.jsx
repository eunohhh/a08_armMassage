/* eslint-disable react/prop-types */
import { createContext, useContext, useMemo, useState } from 'react';
import Modal from '../components/Modal';

const initialValue = {
    open: () => {},
    close: () => {}
};

const ModalContext = createContext(initialValue);

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [modal, setModal] = useState(null);

    const value = useMemo(
        () => ({
            open: (options) => {
                setModal(options);
            },
            close: () => {
                setModal(null);
            }
        }),
        []
    );

    return (
        <ModalContext.Provider value={value}>
            {children}
            {modal && <Modal options={modal} />}
        </ModalContext.Provider>
    );
};

export default ModalContext;

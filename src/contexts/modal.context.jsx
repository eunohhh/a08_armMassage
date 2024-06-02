/* eslint-disable react/prop-types */
import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import LogInModal from '../components/Auth/LogInModal';
// import Modal from '../components/Modal';

const initialValue = {
    open: () => {},
    close: () => {}
};

const ModalContext = createContext(initialValue);

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [modal, setModal] = useState(null);

    useEffect(() => {
        if (modal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [modal]);

    const value = useMemo(
        () => ({
            // 요기 options 는 모달이 열릴때
            // 모달로 가는 데이터입니다
            // 로그인 모달만 쓰니까 options 는 없애도 될듯 합니다 추후에
            open: (options = 'asdf') => {
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
            {/* {modal && <Modal options={modal} />} */}
            {modal && <LogInModal />}
        </ModalContext.Provider>
    );
};

export default ModalContext;

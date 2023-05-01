import React, {FC} from "react";

interface PopupWithFormProps {
    name: string;
    isOpen: boolean;
    onSubmit: (onSubmit: React.FormEvent<HTMLFormElement>) => void;
    onClose: () => void;
    children: React.ReactChild | React.ReactNode;
    title: string;
}

const PopupWithForm: FC<PopupWithFormProps> = ({name, isOpen, onClose, title, onSubmit, children}) => {

    return(
        <section className={`popup popup__${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__background"></div>
            <div className="popup__block">
                <div className={`popup__close-button popup__close-button-${name}`} onClick={onClose}></div>
                <div className="popup__container">
                    <p className="popup__text">{title}</p>
                    <form onSubmit={onSubmit} name="popup-form" className={`popup__form popup__form-${name} form`} noValidate> 
                    {children}
                    </form> 
                </div>
            </div>
        </section>
    );
}

export default PopupWithForm;
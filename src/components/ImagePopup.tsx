import {FC} from 'react';

interface ImagePopupProps {
    card: string;
    onClose: () => void;
}

const ImagePopup:FC<ImagePopupProps> = ({card, onClose}) => {
    return(
        <section className={card === '' ? "popup popup__image" : "popup popup__image popup_opened"}>
            <div className="popup__background"></div>
            <div className="popup__image-block">
            <div className="popup__close-button popup__close-button_image" onClick={onClose}></div>
                <img className="popup__image-item" src={card} />
                <p className="popup__image-name"></p>
            </div>
        </section>
    );
}

export default ImagePopup;
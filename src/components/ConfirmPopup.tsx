import React, {FC} from "react";
import PopupWithForm from "./PopupWithForm";
import { InterfaceCard } from "../types/types";

interface ConfirmPopupProps {
    onDeleteCard: (data?: InterfaceCard) => void;
    chosenCard?: InterfaceCard;
    isOpen: boolean;
    onClose: () => void;
}

const ConfirmPopup:FC<ConfirmPopupProps> = ({onDeleteCard, chosenCard, isOpen, onClose}) => {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    onDeleteCard(chosenCard)
  }
    
    return(
        <PopupWithForm onSubmit={handleSubmit} name={'delete'} title={'Вы уверены?'} isOpen={isOpen} onClose={onClose}
        children={
        <>
          <button className="popup__submit-button popup__submit-button_delete" type='submit'>Да</button>
        </>
        } />
    );
}

export default ConfirmPopup;
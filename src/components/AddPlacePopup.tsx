import React, {FC} from "react";
import PopupWithForm from "./PopupWithForm";

interface AddPlacePopupProps {
    onAddCard: (data: {name: string, link: string}) =>  void;
    isOpen: boolean;
    onClose: () => void;
}

const AddPlacePopup:FC<AddPlacePopupProps> = ({onAddCard, isOpen, onClose}) => {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function nameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
    }

    function linkChange(e: React.ChangeEvent<HTMLInputElement>) {
        setLink(e.target.value);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        onAddCard({
            name,
            link,
        });
    }

    return(
        <PopupWithForm onSubmit={handleSubmit} name={'card'} title={'Новое место'} isOpen={isOpen} onClose={onClose}
        children={
        <>
          <input className="popup__input popup__card-name" id="card-name-input" name="cardName" onChange={nameChange} required minLength={2} maxLength={30} />
          <p className="popup__input-error card-name-input-error"></p>
          <input className="popup__input popup__card-link" id="card-link-input" name="link" onChange={linkChange} required  type="url" />
          <p className="popup__input-error card-link-input-error"></p>
          <button className="popup__submit-button popup__submit-button_cardAdd" type='submit'>Сохранить</button>
        </>
        } />
    );
}

export default AddPlacePopup;
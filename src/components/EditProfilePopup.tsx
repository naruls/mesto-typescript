import React, {FC} from "react";
import PopupWithForm from "./PopupWithForm"

interface EditProfilePopupProps {
    onUpdateUser: (data: {name: string, about: string}) =>  void;
    isOpen: boolean;
    onClose: () => void;
}

const EditProfilePopup:FC<EditProfilePopupProps> = ({onUpdateUser, isOpen, onClose}) => {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const descriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    return(
        <PopupWithForm onSubmit={handleSubmit} name={'info'} title={'Редактировать профиль'} isOpen={isOpen} onClose={onClose}
        children={
        <>
          <input value={name ? name : ""} className="popup__input popup__name" id="name-input" name="name" onChange={nameChange} required minLength={2} maxLength={40} />
          <p className="popup__input-error name-input-error"></p>
          <input value={description ? description : ""} className="popup__input popup__description" id="description-input" name="about" onChange={descriptionChange} required minLength={2} maxLength={200} />
          <p className="popup__input-error description-input-error"></p>
          <button className="popup__submit-button" type='submit'>Сохранить</button>
        </>
        } />
    );
}

export default EditProfilePopup;
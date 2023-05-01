import React, {FC} from "react";
import PopupWithForm from "./PopupWithForm";

interface EditAvatarPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdateAvatar: (data: {avatar?: string}) =>  void;
}

function EditAvatarPopup(props: EditAvatarPopupProps) {

  const inputAvatar = React.useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: inputAvatar.current?.value,
    });
  } 

    return(
        <PopupWithForm onSubmit={handleSubmit} name={'avatar'} title={'Обновить аватар'} isOpen={props.isOpen} onClose={props.onClose}
        children={
        <>
          <input ref={inputAvatar} className="popup__input popup__avatarLink" id="avatar-input" name="avatar" required minLength={2} maxLength={400} type="url" />
          <p className="popup__input-error avatar-input-error"></p>
          <button className="popup__submit-button" type='submit'>Сохранить</button>       
        </>
        } />
    );
}

export default EditAvatarPopup;
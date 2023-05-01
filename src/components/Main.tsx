import React, {FC} from 'react'; 
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import Card from './Card';

import { CurrentUserContext } from '../contexst/CurrentUserContext';

import { InterfaceCard } from '../types/types';

interface MainProps {
    onEditAvatar:() => void;
    onEditProfile:() => void;
    onAddPlace:() => void;
    onCardClick:(event: any) => void;
    onCardLike:(card: InterfaceCard) => void;
    onCardDelete:(card: InterfaceCard) => void;
    onClose:() => void;
    handleUnLogin:() => void;
    cards: InterfaceCard[];
    card: string;
}

const Main:FC<MainProps> = ({onAddPlace, onEditAvatar, onEditProfile, onCardClick, onCardDelete, onCardLike, onClose, handleUnLogin, cards, card}) => {

  const currentUserValue = React.useContext(CurrentUserContext);
  const navigate = useNavigate();

  function signOut() {
    handleUnLogin();
    localStorage.removeItem('jwt');
    navigate("/", {replace: true})
  }


    return(
        <>
        <Header children={
        <div className='header__right-panel'>
          <p className='header__email'>какой-то email</p>
          <button className='header__button' onClick={signOut}>Выйти</button>
        </div>
        }/>
        <main className="main">

        <section className="profile">
            <div className="profile__avatar"><img className="profile__image" onClick={onEditAvatar} src={currentUserValue?.avatar} alt='аватар'/></div>
            <div className="profile__info">
                <div className="profile__top-info"> 
                    <h1 className="profile__name">{currentUserValue?.name}</h1> 
                    <button className="profile__change-button" onClick={onEditProfile} type="button"></button> 
                  </div> 
                  <p className="profile__description">{currentUserValue?.about}</p>
            </div>
            <div className="profile__add-button" onClick={onAddPlace}></div>
        </section>

        <section className="elements">
          {cards.map((cardItem) => (
            // Сдесь была id у карты id="card"
            <Card card={cardItem} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} key={cardItem._id} />
          ))}
        </section>

      </main>
      <Footer />
    <ImagePopup card={card} onClose={onClose} />

      </>
    );
};

export default Main;
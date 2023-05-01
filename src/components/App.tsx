import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import Main from './Main';
import Login from './Login';
import Register from './Register';

import ProtectedRoute from './ProtectedRoute';

import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexst/CurrentUserContext';

import * as auth from '../utils/authMesto';

import {InterfaceUser, InterfaceCard} from '../types/types'

const App = () => {
const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState<boolean>(false);
const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState<boolean>(false);
const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState<boolean>(false);
const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = React.useState<boolean>(false);
const [selectedCard, setSelectedCard] = React.useState<string>('');
const [currentUser, setCurrentUser] = React.useState<InterfaceUser>();
const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

const [cards, setCards] = React.useState<InterfaceCard[]>([]);
const [chosenCard, setChosenCard] = React.useState<InterfaceCard>();

const navigate = useNavigate();

React.useEffect(() =>{
  api.getUserInfo()
  .then((items:InterfaceUser) => {
    setCurrentUser(items);
  })
  .catch(err => console.log(err));

  api.getCard()
  .then((items:InterfaceCard[]) => {
   setCards([...items])
  })
  .catch(err => console.log(err));

  tokenCheck();

}, []);

function tokenCheck() {
  if (localStorage.getItem('jwt')) {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      auth.getContent(jwt).then((res) => {
        if (res){
          handleLogin();
          navigate("/", {replace: true})
        }
      });
  }
}
} 

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);  
  };

  function handleLogin() { 
    setLoggedIn(true); 
  }  

  function handleUnLogin() { 
    setLoggedIn(false); 
  }  

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false); 
    setIsDeleteConfirmPopupOpen(false);
    setSelectedCard('');
  };

  //посмотреть, что здесь вместо any
  function handleCardClick(event: any) {
    setSelectedCard(event.target.src);
  };

  const handelUpdateUser = (data: {name: string, about: string}) => {
    api.changeUserInfo(data)
    .then(data => setCurrentUser(data))
    .catch(err => console.log(err))
    .finally(() => closeAllPopups())
  }

  const handleUpdateAvatar = (data: {avatar?: string}) => {
    api.changeUserAvatar(data)
    .then(data => setCurrentUser(data))
    .catch(err => console.log(err))
    .finally(() => closeAllPopups())
  }

  function handleAddPlaceSubmit(data: {name: string, link: string}) {
    api.postCard(data)
    .then((newCard: InterfaceCard) => {
      setCards([newCard, ...cards])})
    .catch(err => console.log(err))
    .finally(() => closeAllPopups())
  }

  // Проверить работоспособность удаления нужно, возможно ошибка в вариации ?(underfind)
  function handelCardDelete(card?: InterfaceCard) {
    api.deleteCard(card)
    .then((newCard) => {
      setCards((state) => state.filter((c) => c !== card));
    })
    .catch(err => console.log(err))
    .finally(() => closeAllPopups())
  }

  function handelCardLike(card: InterfaceCard) {
    const isLiked = card.likes.some(i => i._id === currentUser?._id);
      api.changeLikeCardStatus(card, !isLiked)
      .then((newCard: InterfaceCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err: string) => console.log(err))
  }

  function handelCardDeleteClick(card: InterfaceCard) {
    setIsDeleteConfirmPopupOpen(true);
    setChosenCard(card);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
      <Route path='/main' element={
        <ProtectedRoute
          loggedIn={loggedIn}>
          <Main 
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick}
            onClose={closeAllPopups}
            onCardClick={handleCardClick}
            onCardLike={handelCardLike}
            onCardDelete={handelCardDeleteClick}
            handleUnLogin={handleUnLogin}
            cards={cards}
            card={selectedCard}
            /> 
          </ProtectedRoute>} 
          />
        <Route path='/sign-in' element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path='/sign-up' element={<Register />} />
        <Route path='/' element={loggedIn ? <Navigate to='/main' replace /> : <Navigate to="/sign-in" replace />} />
      </Routes>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handelUpdateUser}
      /> 
      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups} 
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups} 
        onAddCard={handleAddPlaceSubmit}
      />
      <ConfirmPopup 
        isOpen={isDeleteConfirmPopupOpen}
        chosenCard={chosenCard}
        onClose={closeAllPopups}
        onDeleteCard={handelCardDelete}
      />
    </CurrentUserContext.Provider>
  );
};

export default App;
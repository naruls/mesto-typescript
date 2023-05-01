import React, {FC} from 'react';
import { CurrentUserContext } from '../contexst/CurrentUserContext';
import { InterfaceCard } from '../types/types';

interface CardProps {
    card: InterfaceCard;
    onCardLike: (card: InterfaceCard) => void;
    onCardDelete: (data: InterfaceCard) => void;
    onCardClick: (event: any) => void;
}

const Card:FC<CardProps> = ({card, onCardClick, onCardDelete, onCardLike}) => {
    const currentUserValue = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUserValue?._id;
    const isLiked = card.likes.some(i => i._id === currentUserValue?._id);
    const cardLikeButtonClassName = ( 
        `element__like ${isLiked && 'element__like_active'}` 
      );; 

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return(
        <div className="element">
        {isOwn && <div className="element__delete-button" onClick={handleDeleteClick}></div>}
        <img className="element__image" src={card.link} alt={card.name} onClick={onCardClick} />
        <div className="element__info">
            <p className="element__name">{card.name}</p>
            <div className="element__like-panel">
                <div className={cardLikeButtonClassName} onClick={handleLikeClick}></div>
                <p className="element__like-count">{card.likes.length}</p>
            </div>
        </div>
    </div>
    );
}

export default Card;
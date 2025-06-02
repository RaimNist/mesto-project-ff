import {deleteCard, addLike, removeLike} from './api';
import {closeModal} from './modal';
// import {removeCardPopup, cardToDelete, cardIdToDelete} from '../index';

//Темплейт карточки
const cardTemplate = document.querySelector(`#card-template`).content;

//Функция создания карточки
function createCard(cardData, handleDelete, likeCard, openImage, currentUserId) {
    const card = cardTemplate.querySelector(`.card`).cloneNode(true);
    const cardImage = card.querySelector(`.card__image`);
    const likesCounter = card.querySelector(`.card__like-counter`);

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    card.querySelector(`.card__title`).textContent = cardData.name;
    
    if(cardData.likes) {
        likesCounter.textContent = cardData.likes.length;

        cardData.likes.forEach((item) => {
            if(item._id === currentUserId) {
                card.querySelector(`.card__like-button`).classList.add(`card__like-button_is-active`);
            }
        })
    }

    if(cardData.owner && currentUserId != cardData.owner._id) {
        card.querySelector(`.card__delete-button`).remove();
    } else {
        card.querySelector(".card__delete-button").addEventListener('click', () => {
            handleDelete(card, cardData._id);
        });
    }

    likeCard(card, cardData, likesCounter);
    openImage(card, cardImage);
    

    return card;
}

//Функция удаления карточки
function removeCard(element, cardId) {
    deleteCard(cardId)
        .catch((err) => {
            console.log(err);
        })
    element.remove();
}

//Функция лайка карточки
function likeCard(element, cardData, likesCounter) {
    element.addEventListener('click', evt => {  
        if(evt.target.classList.contains(`card__like-button`)) {
            if(!evt.target.classList.contains(`card__like-button_is-active`)) {
                addLike(cardData._id)
                    .then((result) => {
                        likesCounter.textContent = result.likes.length;
                    })
                    .catch((err) => {
                        console.log(err);
                    }); 
            } else {
                removeLike(cardData._id)
                    .then((result) => {
                        likesCounter.textContent = result.likes.length;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }

            evt.target.classList.toggle(`card__like-button_is-active`);
        }
    })
}

export {createCard, removeCard, likeCard};

import {deleteCard, addLike, removeLike} from './api';

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

        cardData.likes.some((likeOwner) => {
            if(likeOwner._id === currentUserId) {
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
    return deleteCard(cardId)
        .then(() => {
            element.remove();
        })
        .catch((err) => {
            console.log(err);
        });
}

//Функция лайка карточки
function likeCard(element, cardData, likesCounter) {
    const likeButton = `card__like-button_is-active`;
    element.addEventListener('click', evt => {  
        if(evt.target.classList.contains(`card__like-button`)) {
            if(!evt.target.classList.contains(likeButton)) {
                addLike(cardData._id)
                    .then((result) => {
                        likesCounter.textContent = result.likes.length;
                    })
                    .then(() => {toggleLikeButton(evt, likeButton)})
                    .catch((err) => {
                        console.log(err);
                    }); 
            } else {
                removeLike(cardData._id)
                    .then((result) => {
                        likesCounter.textContent = result.likes.length;
                    })
                    .then(() => {toggleLikeButton(evt, likeButton)})
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
    })
}

function toggleLikeButton(evt, btn) {
    evt.target.classList.toggle(btn);    
}

export {createCard, removeCard, likeCard};

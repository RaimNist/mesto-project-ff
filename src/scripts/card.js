import initialCards from "./cards";
import {likeCard, openImage} from "./modal.js"
//Темплейт карточки
const cardTemplate = document.querySelector(`#card-template`).content;

//DOM узлы
const container = document.querySelector(`.page`);
const content = container.querySelector(`.content`);
const places = content.querySelector(`.places`);
const placesList = places.querySelector(`.places__list`);

//Функция создания карточки
function createCard(cardData, removeCard, likeCard, openImage) {
    const card = cardTemplate.querySelector(`.card`).cloneNode(true);

    card.querySelector(`.card__image`).src = cardData.link;
    card.querySelector(`.card__image`).alt = cardData.name;
    card.querySelector(`.card__title`).textContent = cardData.name;

    likeCard(card);
    openImage(card);
    card.querySelector(".card__delete-button").addEventListener('click', () => {
        removeCard(card);
    });

    return card;
}

//Функция удаления карточки
function deleteCard(element) {
    element.remove();
}

//Вывести карточки на страницу
initialCards.forEach(item => {
    placesList.append(createCard(item, deleteCard, likeCard, openImage));
});

export {createCard, deleteCard};

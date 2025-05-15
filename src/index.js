import './pages/index.css';
import initialCards from './scripts/cards.js';
import {createCard, deleteCard, likeCard} from './scripts/card.js';
import {openModal, openImage, editPopup, addPopup} from './scripts/modal.js';

//DOM узлы
const container = document.querySelector(`.page`);
const content = container.querySelector(`.content`);
const places = content.querySelector(`.places`);
const placesList = places.querySelector(`.places__list`);

const profileEditBtn = content.querySelector(`.profile__edit-button`);
const profileAddBtn = content.querySelector(`.profile__add-button`);

//Вывести карточки на страницу
initialCards.forEach(item => {
    placesList.append(createCard(item, deleteCard, likeCard, openImage));
});


//Слушатели для кнопок открытия модальных окон
profileEditBtn.addEventListener('click', () => {
    openModal(editPopup);     
});
profileAddBtn.addEventListener('click', () => {
    openModal(addPopup);
});

import './pages/index.css';
import initialCards from './scripts/cards.js';
import {createCard, deleteCard, likeCard} from './scripts/card.js';
import {openModal, closeModal} from './scripts/modal.js';

//DOM узлы
const container = document.querySelector(`.page`);
const content = container.querySelector(`.content`);
const places = content.querySelector(`.places`);
const placesList = places.querySelector(`.places__list`);

const profileEditBtn = content.querySelector(`.profile__edit-button`);
const profileAddBtn = content.querySelector(`.profile__add-button`);

const popups = container.querySelectorAll(`.popup`);
const editPopup = container.querySelector(`.popup_type_edit`);
const addPopup = container.querySelector(`.popup_type_new-card`);
const imagePopup = container.querySelector(`.popup_type_image`);

const formProfile = editPopup.querySelector(`.popup__form`);
const nameInput = formProfile.querySelector(`.popup__input_type_name`);
const jobInput = formProfile.querySelector(`.popup__input_type_description`);

const formNewCard = addPopup.querySelector(`.popup__form`);
const cardNameInput = formNewCard.querySelector(`.popup__input_type_card-name`);
const cardLinkInput = formNewCard.querySelector(`.popup__input_type_url`);

//Вывести карточки на страницу
initialCards.forEach(item => {
    placesList.append(createCard(item, deleteCard, likeCard, openImage));
});

//Слушатели для кнопок открытия модальных окон
profileEditBtn.addEventListener('click', () => {
    nameInput.value = container.querySelector(`.profile__title`).textContent;
    jobInput.value = container.querySelector(`.profile__description`).textContent;  
    openModal(editPopup);
});
profileAddBtn.addEventListener('click', () => {
    openModal(addPopup);
});

//Добавление слушателей для каждого модального окна, которые будут их закрывать
popups.forEach(popup => {
    popup.querySelector(`.popup__close`).addEventListener('click', () => closeModal(popup)); //при нажатии на крестик
    popup.addEventListener('click', evt => {    //при клике на оверлей
        if(evt.target === popup) {
                closeModal(popup);
            }
    });
})

//Добавление слушателей на кнопки в формах
formProfile.addEventListener('submit', handleFormSubmitEdit);
formNewCard.addEventListener('submit', handleFormSubmitNewCard);

//Функция для кнопки Сохранить в форме редактирования профиля
function handleFormSubmitEdit(evt) {
    evt.preventDefault(); 

    const nameVal = nameInput.value;
    const jobVal = jobInput.value;

    const profileName = container.querySelector(`.profile__title`);
    const profileDesc = container.querySelector(`.profile__description`);

    profileName.textContent = nameVal;
    profileDesc.textContent = jobVal;
}

//Функция для кнопки Сохранить в форме добавления карточки
function handleFormSubmitNewCard(evt) {
    evt.preventDefault(); 

    const place = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    };
    
    placesList.prepend(createCard(place, deleteCard, likeCard, openImage));

    formNewCard.reset();
    closeModal(addPopup);
}

//Функция открытия модального окна при клике на картинку карточки
function openImage(element, image) {
    element.addEventListener('click', evt => {
        if(evt.target.contains(image)) {
            imagePopup.querySelector(`.popup__image`).src = image.src;
            imagePopup.querySelector(`.popup__image`).alt = image.alt;
            imagePopup.querySelector(`.popup__caption`).textContent = element.querySelector(`.card__title`).textContent;
            openModal(imagePopup);
        };
    });
};
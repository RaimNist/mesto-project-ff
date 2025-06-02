import './pages/index.css';
// import initialCards from './scripts/cards.js';
import {createCard, removeCard, likeCard} from './scripts/card.js';
import {openModal, closeModal} from './scripts/modal.js';
import {enableValidation, clearValidation} from './scripts/validation.js';
import {getUserInfo, getCards, updateUserInfo, addNewCard, editAvatar} from './scripts/api.js';

//DOM узлы
const container = document.querySelector(`.page`);
const content = container.querySelector(`.content`);
const places = content.querySelector(`.places`);
const placesList = places.querySelector(`.places__list`);

const profileEditBtn = content.querySelector(`.profile__edit-button`);
const profileAddBtn = content.querySelector(`.profile__add-button`);
const profileAvatarBtn = content.querySelector(`.profile__image`);

const popups = container.querySelectorAll(`.popup`);
const editPopup = container.querySelector(`.popup_type_edit`);
const addPopup = container.querySelector(`.popup_type_new-card`);
const imagePopup = container.querySelector(`.popup_type_image`);
const editAvatarPopup = container.querySelector(`.popup_type_edit-avatar`);
const removeCardPopup = container.querySelector(`.popup_type_remove`);

const formProfile = editPopup.querySelector(`.popup__form`);
const nameInput = formProfile.querySelector(`.popup__input_type_name`);
const jobInput = formProfile.querySelector(`.popup__input_type_description`);

const formNewCard = addPopup.querySelector(`.popup__form`);
const cardNameInput = formNewCard.querySelector(`.popup__input_type_card-name`);
const cardLinkInput = formNewCard.querySelector(`.popup__input_type_url`);

const formNewAvatar = editAvatarPopup.querySelector(`.popup__form`);
const avatarLinkInput = formNewAvatar.querySelector(`.popup__input_type_url`);

const formRemoveCard = removeCardPopup.querySelector(`.popup__form`);

const profileName = container.querySelector(`.profile__title`);
const profileDesc = container.querySelector(`.profile__description`);
const profileAvatar = container.querySelector(`.profile__image`);

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

let currentUserId = null;

let cardToDelete = null;
let cardIdToDelete = null;

Promise.all([getUserInfo(), getCards()])
    .then(([userData, initialCards]) => {
        // Обновляем профиль
        profileName.textContent = userData.name;
        profileDesc.textContent = userData.about;
        profileAvatar.style.backgroundImage = `url("${userData.avatar}")`;
        
        // Рисуем карточки
        currentUserId = userData._id;
        initialCards.forEach(item => {
            console.log(item)
            placesList.append(createCard(item, handleDeleteRequest, likeCard, openImage, currentUserId));
        });
    })
    .catch((err) => {
        console.log(err);
    })


//Слушатели для кнопок открытия модальных окон
profileEditBtn.addEventListener('click', () => {
    nameInput.value = container.querySelector(`.profile__title`).textContent;
    jobInput.value = container.querySelector(`.profile__description`).textContent;
    
    clearValidation(validationConfig, editPopup);

    openModal(editPopup);
});
profileAddBtn.addEventListener('click', () => {
    openModal(addPopup);
});
profileAvatarBtn.addEventListener('click', () => {
    openModal(editAvatarPopup);
})

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
formNewAvatar.addEventListener('submit', handleFormSubmitNewAvatar);
formRemoveCard.addEventListener('submit', handleFormRemoveCard);

//Функция для кнопки Сохранить в форме редактирования профиля
function handleFormSubmitEdit(evt) {
    evt.preventDefault(); 

    const nameVal = nameInput.value;
    const jobVal = jobInput.value;

    profileName.textContent = nameVal;
    profileDesc.textContent = jobVal;

    renderLoading(true, editPopup);
    updateUserInfo(nameVal, jobVal)
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false, editPopup);
        });
}

//Функция для кнопки Сохранить в форме добавления карточки
function handleFormSubmitNewCard(evt) {
    evt.preventDefault(); 

    const name = cardNameInput.value;
    const link = cardLinkInput.value;

    renderLoading(true, addPopup);
    addNewCard(name, link)
        .then((newCardData) => {
            placesList.prepend(createCard(newCardData, handleDeleteRequest, likeCard, openImage, currentUserId));
            formNewCard.reset();
            clearValidation(validationConfig, addPopup);
            closeModal(addPopup);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false, addPopup);
        });
}

//Функция для кнопки Сохранить в форме изменения аватарки
function handleFormSubmitNewAvatar(evt) {
    evt.preventDefault(); 

    const link = avatarLinkInput.value;
    
    renderLoading(true, editAvatarPopup);
    editAvatar(link)
        .then((data) => {
            profileAvatar.style.backgroundImage = `url("${data.avatar}")`;
            formNewAvatar.reset();
            clearValidation(validationConfig, editAvatarPopup);
            closeModal(editAvatarPopup);    
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false, editAvatarPopup);
        });
}

//Функция для кнопки Да в попапе удаления карточки
function handleFormRemoveCard(evt) {
    evt.preventDefault(); 

    removeCard(cardToDelete, cardIdToDelete);

    closeModal(removeCardPopup);
}

function handleDeleteRequest(card, id) {
    cardToDelete = card;
    cardIdToDelete = id;
    openModal(removeCardPopup);
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

//Добавление проверки полей форм
enableValidation(validationConfig);

//Функция загрузки
function renderLoading(isLoading, popup) {
    if(isLoading) {
        popup.querySelector(`.popup__button`).textContent = 'Сохранение...';
    } else {
        popup.querySelector(`.popup__button`).textContent = 'Сохранить';
    }
}
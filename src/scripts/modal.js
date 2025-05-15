import { createCard, deleteCard, likeCard } from "./card";
//DOM
const container = document.querySelector(`.page`);
const content = container.querySelector(`.content`);

const popups = container.querySelectorAll(`.popup`);
const editPopup = container.querySelector(`.popup_type_edit`);
const addPopup = container.querySelector(`.popup_type_new-card`);
const imagePopup = container.querySelector(`.popup_type_image`);

const formProfile = editPopup.querySelector(`.popup__form`);
const nameInput = formProfile.querySelector(`.popup__input_type_name`);
const jobInput = formProfile.querySelector(`.popup__input_type_description`);
nameInput.value = container.querySelector(`.profile__title`).textContent;
jobInput.value = container.querySelector(`.profile__description`).textContent;

const formNewCard = addPopup.querySelector(`.popup__form`);
const cardNameInput = formNewCard.querySelector(`.popup__input_type_card-name`);
const cardLinkInput = formNewCard.querySelector(`.popup__input_type_url`);

const places = content.querySelector(`.places`);
const placesList = places.querySelector(`.places__list`);

//Функция открытия модальных окон
function openModal(popup) {
    popup.classList.add(`popup_is-opened`);

    document.addEventListener('keydown', closeOnKeyDown);
}

//Функция закрытия модальных окон
function closeModal(modal) {
    modal.classList.remove(`popup_is-opened`);
    document.removeEventListener('keydown', closeOnKeyDown); //удаление слушателя для предотвращения
}                                                            //их накапливания при многократном
                                                             //открытии модальных окон

//Добавление слушателей для каждого модального окна, которые будут их закрывать
popups.forEach(popup => {
    popup.querySelector(`.popup__close`).addEventListener('click', () => closeModal(popup)); //при нажатии на крестик
    popup.addEventListener('click', evt => {    //при клике на оверлей
        if(evt.target === popup) {
                closeModal(popup);
            }
    });
})
function closeOnKeyDown(evt) {  //при нажатии Esc
    if(evt.key === 'Escape') {
        closeModal(document.querySelector(`.popup_is-opened`));
    }
}

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

//Добавление слушателей на кнопки в формах
formProfile.addEventListener('submit', handleFormSubmitEdit);
formNewCard.addEventListener('submit', handleFormSubmitNewCard);

//Функция открытия модального окна при клике на картинку карточки
function openImage(element) {
    element.addEventListener('click', evt => {
        if(evt.target.classList.contains(`card__image`)) {
            imagePopup.querySelector(`.popup__image`).src = element.querySelector(`.card__image`).src;
            imagePopup.querySelector(`.popup__image`).alt = element.querySelector(`.card__image`).alt;
            imagePopup.querySelector(`.popup__caption`).textContent = element.querySelector(`.card__title`).textContent;
            openModal(imagePopup);
        }
    })
}

export {openModal, closeModal, openImage, editPopup, addPopup};
//Темплейт карточки
const cardTemplate = document.querySelector(`#card-template`).content;

//Функция создания карточки
function createCard(cardData, removeCard, likeCard, openImage) {
    const card = cardTemplate.querySelector(`.card`).cloneNode(true);
    const cardImage = card.querySelector(`.card__image`);
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
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

//Функция лайка карточки
function likeCard(element) {
    element.addEventListener('click', evt => {  
        if(evt.target.classList.contains(`card__like-button`)) {
            evt.target.classList.toggle(`card__like-button_is-active`);
        }
    })
}

export {createCard, deleteCard, likeCard};

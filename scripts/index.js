//Темплейт карточки
const cardTemplate = document.querySelector(`#card-template`).content;

//DOM узлы
const container = document.querySelector(`.page`);
const content = container.querySelector(`.content`);
const places = content.querySelector(`.places`);
const placesList = places.querySelector(`.places__list`);

//Функция создания карточки
function createCard(values, del) {
    const card = cardTemplate.querySelector(`.card`).cloneNode(true);

    card.querySelector(`.card__image`).src = values.link;
    card.querySelector(`.card__image`).alt = values.name;
    card.querySelector(`.card__title`).textContent = values.name;

    card.querySelector(".card__delete-button").addEventListener('click', () => {
        del(card);
    });
    return card;
}

//Функция удаления карточки
function deleteCard(element) {
    element.remove();
}

//Вывести карточки на страницу
initialCards.forEach(item => {
    placesList.append(createCard(item, deleteCard));
});

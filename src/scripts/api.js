//Конфиг
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39',
  headers: {
    authorization: '3098ea21-a78e-4d76-a7bf-eb47a71d3487',
    'Content-Type': 'application/json'
  }
};

//Загрузка информации о пользователе
function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};

//Загрузка карточек
function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)); 
};

//Изменение профиля
function updateUserInfo(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};

//Добаление карточки
function addNewCard(cardName, cardUrl) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardUrl
    })
  })
  .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
}

function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

function addLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

function removeLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

function editAvatar(avatarUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
  .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

export {getUserInfo, getCards,  updateUserInfo, addNewCard, deleteCard, addLike, removeLike, editAvatar};
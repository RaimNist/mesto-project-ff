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
        .then((res => getResponseData(res)));
};

//Загрузка карточек
function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then((res => getResponseData(res))); 
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
  .then((res => getResponseData(res)));
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
  .then((res => getResponseData(res)))
}

function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then((res => getResponseData(res)));
}

function addLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then((res => getResponseData(res)));
}

function removeLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then((res => getResponseData(res)));
}

function editAvatar(avatarUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
  .then((res => getResponseData(res)));
}

function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
}

export {getUserInfo, getCards,  updateUserInfo, addNewCard, deleteCard, addLike, removeLike, editAvatar};
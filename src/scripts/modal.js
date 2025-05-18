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

function closeOnKeyDown(evt) {  //при нажатии Esc
    if(evt.key === 'Escape') {
        closeModal(document.querySelector(`.popup_is-opened`));
    }
}

export {openModal, closeModal};
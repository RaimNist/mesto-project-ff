function showInputError(validationConfig, formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
}

function hideInputError(validationConfig, formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
}

function checkInputValidity(validationConfig, formElement, inputElement) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if(!inputElement.validity.valid) {
        showInputError(validationConfig, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(validationConfig, formElement, inputElement);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

function toggleButtonState(validationConfig, inputList, button) {
    if(hasInvalidInput(inputList)) {
        button.classList.add(validationConfig.inactiveButtonClass);
        button.disabled = true;
    } else {
        button.classList.remove(validationConfig.inactiveButtonClass);
        button.disabled = false;
    }
};

function setEventListeners (validationConfig, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(validationConfig, formElement, inputElement);
      toggleButtonState(validationConfig, inputList, buttonElement);
    });
  });
};

function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    
    setEventListeners(validationConfig, formElement);
  });
};

function clearValidation(validationConfig, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach((inputElement) => {
        hideInputError(validationConfig, formElement, inputElement)
    });

    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
}

export {enableValidation, clearValidation};
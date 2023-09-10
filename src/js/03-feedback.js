import throttle from 'lodash.throttle';


const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');


const saveFormDataToLocalStorage = () => {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};


const populateFormFieldsFromLocalStorage = () => {
  const savedFormData = localStorage.getItem('feedback-form-state');
  if (savedFormData) {
    const formData = JSON.parse(savedFormData);
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
};


const throttledSaveFormData = throttle(saveFormDataToLocalStorage, 500);

emailInput.addEventListener('input', throttledSaveFormData);
messageInput.addEventListener('input', throttledSaveFormData);


window.addEventListener('load', populateFormFieldsFromLocalStorage);


form.addEventListener('submit', (event) => {
  event.preventDefault();

  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';


  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(formData);
});


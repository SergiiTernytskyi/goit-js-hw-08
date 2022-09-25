import throttle from 'lodash.throttle';

const LOCALE_STORAGE_KEY = 'feedback-form-state';
const formRef = document.querySelector('.feedback-form');

formRef.addEventListener('input', throttle(onFormType, 500));
formRef.addEventListener('submit', submitHandler);

pageLoad();

function onFormType(event) {
  const { name, value } = event.target;

  try {
    let savedFeedback = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (savedFeedback) {
      savedFeedback = JSON.parse(savedFeedback);
    } else {
      savedFeedback = {};
    }

    savedFeedback[name] = value;

    localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(savedFeedback));
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

function pageLoad() {
  const savedFeedback = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (savedFeedback) {
    try {
      Object.entries(JSON.parse(savedFeedback)).forEach(([key, value]) => {
        formRef.elements[key].value = value;
      });
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }
}

function submitHandler(event) {
  event.preventDefault();

  const {
    elements: { email, message },
  } = event.currentTarget;

  const formData = { email: email.value, message: message.value };
  console.log(formData);

  event.target.reset();
  localStorage.removeItem(LOCALE_STORAGE_KEY);
}

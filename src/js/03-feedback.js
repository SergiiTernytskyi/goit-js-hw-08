import throttle from 'lodash.throttle';

const LOCALE_STORAGE_KEY = 'feedback-form-state';
const formRef = document.querySelector('.feedback-form');

formRef.addEventListener('input', throttle(onFormType, 500));
formRef.addEventListener('submit', submitHandler);

pageLoad();

function onFormType(event) {
  const { name, value } = event.target;

  try {
    let savedFeedback = load(LOCALE_STORAGE_KEY);
    savedFeedback = savedFeedback ? savedFeedback : {};

    savedFeedback[name] = value;
    save(LOCALE_STORAGE_KEY, savedFeedback);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

function pageLoad() {
  const savedFeedback = load(LOCALE_STORAGE_KEY);
  console.log(savedFeedback);
  if (savedFeedback) {
    Object.entries(savedFeedback).forEach(([key, value]) => {
      formRef.elements[key].value = value;
    });
  }
}

function submitHandler(event) {
  event.preventDefault();

  const {
    elements: { email, message },
  } = event.currentTarget;

  const formData = { email: email.value, message: message.value };
  console.log(formData);

  event.currentTarget.reset();
  remove(LOCALE_STORAGE_KEY);
}

function save(key, value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

function load(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

function remove(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

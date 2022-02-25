const inputs = document.getElementsByTagName('input');
const submit = document.getElementsByTagName('button')[0];

const form = (function() {
  function validate(type, error) {
    error.textContent = ''
    if (type.getAttribute('type') === 'password') {
      checkPassword(type, error);
    }
    if (type.validity.tooShort) {
      type.setCustomValidity('Too short');
      type.reportValidity();
      error.innerHTML += '* Too short <br>';
    }
    if (type.validity.tooLong) {
      type.setCustomValidity('Too long');
      type.reportValidity();
      error.innerHTML += '* Too long <br>';
    }
    if (type.value === '') {
      type.setCustomValidity('Required');
      type.reportValidity();
      error.innerHTML += '* Required <br>';
    }
  };
  function checkPassword(type, error) {
    if (document.getElementById('password').value != document.getElementById('password-conf').value) {
      type.setCustomValidity('Passwords do not match');
      type.reportValidity();
      error.innerHTML += '* Passwords do not match <br>'
    } else {
      document.getElementById('password').setCustomValidity('');
      document.getElementById('password-conf').setCustomValidity('');
      document.getElementById('password').reportValidity();
      document.getElementById('password-conf').reportValidity();
    }
  }
  return {validate};
}())

Array.from(inputs).forEach((input) => {
  input.addEventListener('input', () => {
    input.setCustomValidity('');
    input.reportValidity();
    let error = document.getElementsByClassName(`${input.getAttribute('type')}-error`)[0];
    form.validate(input, error);
  })
})

submit.addEventListener('click', () => {
  Array.from(inputs).forEach((input) => {
    let error = document.getElementsByClassName(`${input.getAttribute('type')}-error`)[0];
    form.validate(input, error);

    if (!input.checkValidity()) {
      event.preventDefault();
    }
  })
})
const form = document.getElementsByTagName("form")[0] as HTMLElement;
const email = document.getElementById("mail") as HTMLInputElement;
const emailError = document.querySelector<HTMLElement>("#mail + span.error-subtext");
const namefeedback = document.getElementById("name") as HTMLInputElement;
const nameError = document.querySelector<HTMLElement>("#name + span.error-subtext");
const sendMessage = document.querySelector<HTMLInputElement>("span.send-subtext");

email?.addEventListener("input", function (event) {
  email?.setCustomValidity("");
  namefeedback.setCustomValidity("");
});

form.addEventListener("submit", function (event) {
  let isValid = true;
  event.preventDefault();
  if (!email.validity.valid) {
    showError();
    email.setCustomValidity("");
    isValid = false;
  }

  if (namefeedback?.validity?.valueMissing) {
    nameError!.textContent = "Поле должно быть заполнено";
    namefeedback.setCustomValidity("");
    nameError!.className = "error-subtext active";
    isValid = false;
  }

  if (isValid) {
    sendMessage!.textContent = "Сообщение отправлено";
    sendMessage!.className = "send-subtext active";
  }
});

function showError() {
  if (email.validity.valueMissing) {
    emailError!.textContent = "Поле должно быть заполнено";
  } else if (email.validity.typeMismatch) {
    emailError!.textContent = "Некорректный email-адрес";
  } else if (email.validity.tooShort) {
    emailError!.textContent = `Слишком короткий email-адрес`;
  }
  emailError!.className = "error-subtext active";
}
const form = document.querySelector("form");
const cardholderName = document.querySelector("#name");
const cardNumber = document.querySelector("#number");
const month = document.querySelector("#month");
const year = document.querySelector("#year");
const pin = document.querySelector("#cvc");

const cardName = document.querySelector(".name");
const expiry = document.querySelector(".date");
const cardNo = document.querySelector(".card--number");
const cvc = document.querySelector(".back");
const feedbackWrapper = document.querySelector(".feedback--wrapper");

const submitBtn = document.querySelector(".btn");
const continueBtn = document.querySelector(".continue");

// GSAP
// gsap.to('.feedback--wrapper', {y: 50, duration: 1, opacity: 1});
const tl = gsap.timeline({ defaults: { duration: 0.75, ease: "power1.out" } });

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
});

continueBtn.addEventListener("click", () => {
  feedbackWrapper.style.display = "none";
  feedbackWrapper.style.opacity = "0";
  form.style.display = "flex";
  cardName.textContent = "Your Name";
  cardNo.textContent = "0000 0000 0000";
  expiry.textContent = `00/00`;
  cvc.setAttribute("data-cvc", "000");
  tl.fromTo(".form", { opacity: 0, y: 50}, { opacity: 1, y: 0,});
  tl.fromTo(
      ".front",
      { opacity: 0, transformPerspective: 800, transformOrigin: "center", rotationX: -180 },
      { opacity: 1, rotationX: 0 },
      "<"
    );
});

function checkInputs() {
  const nameValue = cardholderName.value;
  const numberValue = cardNumber.value;
  const monthValue = month.value;
  const yearValue = year.value;
  const pinValue = pin.value;

  if (nameValue === "") {
    errorFor(cardholderName, "cannot be blank");
  } else {
    successFor(cardholderName);
  }

  if (numberValue === "") {
    errorFor(cardNumber, "cannot be blank");
  } else if (!testNumber(numberValue)) {
    errorFor(cardNumber, "Invalid format");
  } else {
    successFor(cardNumber);
  }

  if (monthValue === "") {
    errorFor(month, "cannot be blank");
  } else {
    successFor(month);
  }

  if (yearValue === "") {
    errorFor(year, "cannot be blank");
  } else if (!checkYear(yearValue) || !checkMonth(monthValue)) {
    errorFor(year, "Invalid Format");
  } else {
    successFor(year);
  }

  if (pinValue === "") {
    errorFor(pin, "cannot be blank");
  } else if (!checkPin(pinValue)) {
    errorFor(pin, "Invalid Format");
  } else {
    successFor(pin);
  }

  const checkError = document.getElementsByClassName("error");
  if (checkError.length === 0) {
    cardName.textContent = nameValue;
    cardNo.textContent = numberValue;
    expiry.textContent = `${monthValue}/${yearValue}`;
    cvc.setAttribute("data-cvc", pinValue);
    
    cardholderName.value = "";
    cardNumber.value = "";
    month.value = "";
    year.value = "";
    pin.value = "";
    
    feedbackWrapper.style.display = "flex";
    tl.fromTo(
      ".feedback--wrapper",
      { opacity: 0, y: 50},
      { opacity: 1, y: 0}
      );
      tl.fromTo(
        ".front",
        { opacity: 0, transformPerspective: 800, transformOrigin: "center", rotationX: 180 },
        { opacity: 1, rotationX: 0 },
        "<"
      );
    form.style.display = "none";
  }
}

function errorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  formControl.classList.remove("success");
  formControl.classList.add("error");
  small.textContent = message;
}

function successFor(input) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  formControl.classList.remove("error");
  formControl.classList.add("success");
}

function testNumber(inputValue) {
  return /^(\d{4})\s{1}\d{4}\s{1}\d{4}\s{1}\d{4}$/.test(inputValue);
}

function checkMonth(value) {
  return /^(0[1-9]|1[0-2])$/.test(value);
  // return /(0[1-9]|1[0-2])\/?(([0-9]{4})|[0-9]{2}$)/.test(value);
}
function checkYear(value) {
  return /^([2]{1})([2-5]{1})$/.test(value);
}

function checkPin(value) {
  return /^([1-9]{1})([0-9]{2})$/.test(value);
}

function onDetailsClick() {
  let { top } = document
    .getElementById('services')
    .getBoundingClientRect();
  
  window.scrollTo({
    left: 0,
    top: top + window.scrollY - 80,
    behavior: "smooth"
  });
}

const formatPhone = _phone => `+7 (${_phone.slice(0, 3)}) ${_phone.slice(3, 6)}-${_phone.slice(6, 8)}-${_phone.slice(8, 10)}`;

/** @type {HTMLElement} */
const header_element = document.getElementsByClassName("main-header")[0];
/** @type {HTMLElement} */
const main_element = document.getElementsByTagName("main")[0];
/** @type {HTMLElement} */
const guarant_element = document.getElementsByClassName("guarantee")[0];
/** @type {HTMLElement} */
const check_element = document.getElementsByClassName("check")[0];
/** @type {HTMLElement} */
const check_placer = document.getElementsByClassName("check-placer")[0];
/** @type {HTMLElement} */
const popup_element = document.getElementById("popup");

function updateMainFilter() {
  let { top } = document
    .getElementById('services')
    .getBoundingClientRect();
  main_element.style.filter = `brightness(${Math.min(Math.max(0, 1 - window.scrollY / top), 1)})`;
  if (window.outerHeight > 700) {
    if (window.scrollY > window.outerHeight) {
      check_element.classList.add("fixed");
    } else {
      check_element.classList.remove("fixed");
    }
  }
}


/**
 * @param {HTMLInputElement} el
 */
function makePhoneInput(el) {
  
  let phone = "";
  let renderTelInput = () => {
    let _phone = phone + '_'.repeat(10 - phone.length);
    el.value = formatPhone(_phone);
    if (phone.length == 10) {
      el.selectionStart = el.value.length;
      el.selectionEnd   = el.selectionStart;
    } else {
      el.selectionStart = el.value.indexOf('_');
      el.selectionEnd   = el.selectionStart;
    }
  }

  el.oninput = (ev) => {
    ev.preventDefault();
    if (ev.inputType == 'insertText' && ev.data >= '0' && ev.data <= '9' && phone.length < 10) {
      phone += ev.data;
    } else if (ev.inputType == 'deleteContentBackward') {
      phone = phone.slice(0, -1);
    }
    renderTelInput();
  }

  el.onkeydown = (ev) => {
    // ev.preventDefault();
    renderTelInput();
  }
  el.onkeypress = (ev) => {
    // ev.preventDefault();
    renderTelInput();
  }

  return () => ({ phone });
}

function handleForm() {
  const t_button    = document.getElementById("query_text_send");
  const i_button    = document.getElementById("query_preload_send");
  const name_input  = document.getElementById("query_input_name");
  const phone_input = document.getElementById("query_input_phone");
  /** @type {HTMLInputElement} */

  

  const clb = makePhoneInput(phone_input);

  t_button.onclick = () => {
    let name = name_input.value;

    let letter_c = 0;
    for (let i of name) {
      if (i.toLowerCase() >= 'а' && i.toLowerCase() <= 'я') ++letter_c;
      if (i.toLowerCase() >= 'a' && i.toLowerCase() <= 'z') ++letter_c;
    }

    let is_correct = true;
    if (name.trim() == "") {
      name_input.nextElementSibling.textContent = "Заполните это поле";
      is_correct = false;
    } else if (letter_c == 0) {
      name_input.nextElementSibling.textContent = "Имя введено некорректно";
      is_correct = false;
    } else {
      name_input.nextElementSibling.textContent = "";
    }

    if (clb().phone.length == 0) {
      phone_input.nextElementSibling.textContent = "Заполните это поле";
      is_correct = false;
    } else if (clb().phone.length != 10) {
      phone_input.nextElementSibling.textContent = "Номер введён некорректно";
      is_correct = false;
    } else {
      phone_input.nextElementSibling.textContent = "";
    }

    if (!is_correct) return;

    t_button.classList.add("hidden");
    i_button.classList.remove("hidden");

    fetch(`/query.php?name=${name}&phone=8${clb().phone}`).then((response) => {
      setTimeout(() => {
        if (response.ok && response.status == 200) {
          openPopup(".popup-success-query");
        } else {
          openPopup(".popup-error-query");
        }

        t_button.classList.remove("hidden");
        i_button.classList.add("hidden");
      }, 500);
    }).catch(err => {
      setTimeout(() => {
        openPopup(".popup-error-query");
        t_button.classList.remove("hidden");
        i_button.classList.add("hidden");
      }, 500);
    });
  }
}


function handleServices() {
  [].forEach.call(document.querySelectorAll(".services .order-button"), button => {
    button.onclick = () => {
      console.log(button.parentElement.querySelector(".field-title").textContent.trim());
    }
  })
}

function openPopup(selector) {
  [].forEach.call(popup_element.children, el => el.classList.add("hidden"));
  popup_element.querySelector(selector).classList.remove("hidden");
  popup_element.classList.remove("hidden");
  requestAnimationFrame(() => popup_element.classList.add("show"));
}

function closePopup() {
  popup_element.classList.remove("show");
  setTimeout(() => popup_element.classList.add("hidden"), 150);
}

function handlePopup() {
  popup_element.addEventListener("click", (ev) => ev.target == popup_element && closePopup());
  [].forEach.call(popup_element.querySelectorAll(".close-button"), el => el.onclick = closePopup);
}

// Проверяем, можно ли использовать Webp формат
function canUseWebp() {
  // Создаем элемент canvas
  let elem = document.createElement('canvas');
  // Приводим элемент к булеву типу
  if (!!(elem.getContext && elem.getContext('2d'))) {
      // Создаем изображение в формате webp, возвращаем индекс искомого элемента и сразу же проверяем его
      return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
  }
  // Иначе Webp не используем
  return false;
}

window.onload = function () {
  // Получаем все элементы с дата-атрибутом data-bg
  let images = document.querySelectorAll('[data-bg]');
  // Проходимся по каждому
  for (let i = 0; i < images.length; i++) {
      // Получаем значение каждого дата-атрибута
      let image = images[i].getAttribute('data-bg');
      // Каждому найденному элементу задаем свойство background-image с изображение формата jpg
      images[i].style.backgroundImage = 'url(' + image + ')';
  }

  // Проверяем, является ли браузер посетителя сайта Firefox и получаем его версию
  let isitFirefox = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./);
  let firefoxVer = isitFirefox ? parseInt(isitFirefox[1]) : 0;

  // Если есть поддержка Webp или браузер Firefox версии больше или равно 65
  if (canUseWebp() || firefoxVer >= 65) {
      // Делаем все то же самое что и для jpg, но уже для изображений формата Webp
      let imagesWebp = document.querySelectorAll('[data-bg-webp]');
      for (let i = 0; i < imagesWebp.length; i++) {
          let imageWebp = imagesWebp[i].getAttribute('data-bg-webp');
          imagesWebp[i].style.backgroundImage = 'url(' + imageWebp + ')';
      }
  }
};

function main() {
  document.getElementById("details_button").onclick = onDetailsClick;
  window.addEventListener("scroll", updateMainFilter);

  updateMainFilter();
  handlePopup();
  handleServices();
  handleForm();
}

main();
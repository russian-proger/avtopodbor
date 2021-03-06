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

function handleForm(form) {
  const t_button    = form.querySelector(".query_text_send");
  const i_button    = form.querySelector(".query_preload_send");
  const name_input  = form.querySelector(".query_input_name > input");
  const phone_input = form.querySelector(".query_input_phone > input");
  /** @type {HTMLInputElement} */

  

  const clb = makePhoneInput(phone_input);

  t_button.onclick = () => {
    let name = name_input.value;

    let letter_c = 0;
    for (let i of name) {
      if (i.toLowerCase() >= '??' && i.toLowerCase() <= '??') ++letter_c;
      if (i.toLowerCase() >= 'a' && i.toLowerCase() <= 'z') ++letter_c;
    }

    let is_correct = true;
    if (name.trim() == "") {
      name_input.nextElementSibling.textContent = "?????????????????? ?????? ????????";
      is_correct = false;
    } else if (letter_c == 0) {
      name_input.nextElementSibling.textContent = "?????? ?????????????? ??????????????????????";
      is_correct = false;
    } else {
      name_input.nextElementSibling.textContent = "";
    }

    if (clb().phone.length == 0) {
      phone_input.nextElementSibling.textContent = "?????????????????? ?????? ????????";
      is_correct = false;
    } else if (clb().phone.length != 10) {
      phone_input.nextElementSibling.textContent = "?????????? ???????????? ??????????????????????";
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
      openPopup(".popup-form");
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

// ??????????????????, ?????????? ???? ???????????????????????? Webp ????????????
function canUseWebp() {
  // ?????????????? ?????????????? canvas
  let elem = document.createElement('canvas');
  // ???????????????? ?????????????? ?? ???????????? ????????
  if (!!(elem.getContext && elem.getContext('2d'))) {
      // ?????????????? ?????????????????????? ?? ?????????????? webp, ???????????????????? ???????????? ???????????????? ???????????????? ?? ?????????? ???? ?????????????????? ??????
      return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
  }
  // ?????????? Webp ???? ????????????????????
  return false;
}

window.onload = function () {
  // ???????????????? ?????? ???????????????? ?? ????????-?????????????????? data-bg
  let images = document.querySelectorAll('[data-bg]');
  // ???????????????????? ???? ??????????????
  for (let i = 0; i < images.length; i++) {
      // ???????????????? ???????????????? ?????????????? ????????-????????????????
      let image = images[i].getAttribute('data-bg');
      // ?????????????? ???????????????????? ???????????????? ???????????? ???????????????? background-image ?? ?????????????????????? ?????????????? jpg
      images[i].style.backgroundImage = 'url(' + image + ')';
  }

  // ??????????????????, ???????????????? ???? ?????????????? ???????????????????? ?????????? Firefox ?? ???????????????? ?????? ????????????
  let isitFirefox = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./);
  let firefoxVer = isitFirefox ? parseInt(isitFirefox[1]) : 0;

  // ???????? ???????? ?????????????????? Webp ?????? ?????????????? Firefox ???????????? ???????????? ?????? ?????????? 65
  if (canUseWebp() || firefoxVer >= 65) {
      // ???????????? ?????? ???? ???? ?????????? ?????? ?? ?????? jpg, ???? ?????? ?????? ?????????????????????? ?????????????? Webp
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

  document.querySelectorAll(".query-form").forEach(v => handleForm(v))
}

main();
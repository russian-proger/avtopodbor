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

function updateMainFilter() {
  let { top } = document
    .getElementById('services')
    .getBoundingClientRect();
  main_element.style.filter = `brightness(${Math.min(Math.max(0, 1 - window.scrollY / top), 1)})`;
  let ce_rect = check_element.previousElementSibling.getBoundingClientRect();
  let he_rect = header_element.getBoundingClientRect();
  let g_rect  = guarant_element.getBoundingClientRect();
  if (window.outerHeight > 700) {
    console.log(g_rect.bottom - he_rect.height);
    if (ce_rect.top - 800 < window.innerHeight) {
      check_element.classList.add("fixed");
    } else {
      check_element.classList.remove("fixed");
    }
  }
}

function addHoverDetecting() {

}

function main() {
  document.getElementById("details_button").onclick = onDetailsClick;
  window.addEventListener("scroll", updateMainFilter);

  updateMainFilter();
}

main();
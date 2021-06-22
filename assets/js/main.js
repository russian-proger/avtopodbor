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

const main_element = document.getElementsByTagName("main")[0];

/** @type {HTMLElement} */
const check_element = document.getElementsByClassName("check")[0];

function updateMainFilter() {
  let { top } = document
    .getElementById('services')
    .getBoundingClientRect();
  main_element.style.filter = `brightness(${Math.min(Math.max(0, 1 - window.scrollY / top), 1)})`;

  if (window.outerHeight > 700) {
    if (check_element.previousElementSibling.getBoundingClientRect().top - 800 < window.innerHeight) {
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
}

main();
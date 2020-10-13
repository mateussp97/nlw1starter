const buttonSearch = document.querySelector("#page-home main a") //Getting html elements
const modal = document.querySelector("#modal") //Getting html elements
const close = document.querySelector("#modal .header a") //Getting html elements

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide") //When click, remove the class hide
})

close.addEventListener("click", () => {
    modal.classList.add("hide") //When click, add the class hide
})
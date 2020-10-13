function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json()) //Anonymous function that is returning a value
        .then(states => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>" //Cleared the fild Cidade
    citySelect.disabled = true //Blocked the field Cidade when we change the field Estado

    fetch(url)
        .then(res => res.json()) //Anonymous function that is returning a value
        .then(cities => {
            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false
        })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//Ítens de coleta
//Get all LI'S
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = [] //We use let to be able to override a variable

function handleSelectedItem(event) {
    const itemLi = event.target

    //Add or remove Class with JavaScript | selected is an anonymous class that will be generated in create-point.html and has already been configured in create-point.css
    itemLi.classList.toggle("selected") //toggle does the function of adding or removing

    const itemId = itemLi.dataset.id

    //Check if there are selected items, if yes 
    //Pick the selected items
    const alreadySelected = selectedItems.findIndex((item) => {
        const itemFound = item == itemId //It will this be true or false
        return itemFound //It will return when be true
    })

    //If already selected
    if (alreadySelected >= 0) { //This is true when different from -1
        //Unselect
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    }

    //If not selected
    else {
        //Add the selection
        selectedItems.push(itemId)
    }

    //Update the hidden field with the selected items
    collectedItems.value = selectedItems
}

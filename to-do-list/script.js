const addItemInput = document.getElementById("add-item");
const filter = document.getElementById("filter");
const toDolist = document.querySelector("#to-do-list");

function addItem() {
  const itemValue = addItemInput.value;
  const newEl = document.createElement("li");
  newEl.innerHTML = `
    <p>${itemValue}</p>
    <div class="actions">
      <input type="checkbox" class="btn-action-done"/>
      <button class="delete-item">&#10008;</button>
    </div>
  `;
  toDolist.querySelector("ul").appendChild(newEl);
  addItemInput.value = "";
}

function clearItem(e) {
  e.innerHTML = "";
}

toDolist.addEventListener("click", (e) => {
  const element = e.target;
  if (element.classList[0] === "btn-action-done") {
    if (filter.checked === true) {
      clearItem(element.parentElement.parentElement);
    } else {
      element.toggleAttribute("checked");
      element.parentElement.parentElement.classList.toggle("done");
    }
  } else if (element.classList[0] === "btn-action-delete") {
    clearItem(element.parentElement.parentElement);
  } else if (element.classList[0] === "btn-action-filter") {
    if (element.checked) {
      const checkedItems = toDolist.querySelectorAll("li.done");
      if (checkedItems) {
        checkedItems.forEach((li) => (li.style.display = "none"));
      } else return;
    } else {
      toDolist.querySelectorAll("li").forEach((li) => {
        li.style.display = "flex";
      });
    }
  }
});

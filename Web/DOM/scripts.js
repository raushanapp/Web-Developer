let button = document.getElementById("enter");
let input = document.getElementById("user_input");
let ul = document.querySelector("ul");

function inputLenght() {
  return input.value.length;
}

function createListElement() {
  let d = document.createElement("div");
  d.classList.add("list-item");
  let b = document.createElement("button");
  b.appendChild(document.createTextNode("Delete"));
  //  deleting the list item
  b.addEventListener("click", function removeBox() {
    onDeleteElement(d);
  });
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(input.value));
  ul.appendChild(d);
  d.append(li, b);
  input.value = "";
}

function onDeleteElement(element) {
  return element.remove();
}

function addListAfterClick() {
  if (inputLenght() > 0) {
    createListElement();
  }
}

function addListAfterKeyPress(event) {
  if (inputLenght() > 0 && event.keyCode === 13) {
    createListElement();
  }
}

button.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeyPress);

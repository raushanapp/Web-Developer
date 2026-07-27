// const listElement = document.getElementById("list");
// const newListItem = document.createElement("li");
// newListItem.textContent = "Item 4";

// setTimeout(() => listElement.appendChild(newListItem), 1000);
//  this is imperative programming
const countElement = document.getElementById("count");

function setCount() {
  let count = Number(countElement.textContent);
  //   count++;
  count = count + 1;
  countElement.textContent = count;
}

//  imperative programming here i am telling the browser what to do

const countApp = {
  getCount: () => {
    const countElement = document.getElementById("count");
    return Number(countElement.textContent);
  },

  setCount: (val) => {
    const countElement = document.getElementById("count");
    countElement.textContent = val;
  },
};

//  this code have declarative approach

function setCount1() {
  let count = countApp.getCount();

  if (count >= 5) {
    countApp.setCount(0);
  } else {
    countApp.setCount(count + 1);
  }
}

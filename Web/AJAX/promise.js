// Promise
const promise = new Promise((resolve, reject) => {
  if (true) {
    resolve("Success!");
  }
  {
    reject("Error!");
  }
});

//  with in here we have another promise
const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "HIII");
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "POKIE");
});

const promise4 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "POKIE MAN");
});

Promise.all([promise, promise2, promise3, promise4]).then((value) => {
  console.log(value);
});

promise
  .then((result) => result + "!")
  .then((res) => res + "!")
  .catch((error) => console.error("Error:", error))
  .then((res3) => res3 + "!"); // here if getting error never catche error because it's handled by the previous catch

//   another example

const url = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/albums",
];

Promise.all(url.map((u) => fetch(u).then((res) => res.json())))
  .then((ans) => {
    console.log(ans[0]);
    console.log(ans[1]);
    console.log(ans[2]);
  })
  .catch((e) => console.error("Error:", e));

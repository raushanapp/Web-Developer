//  ASYNC  AWAIT
const url = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/albums",
];

async function movePlayer() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const data = await response.json();
  console.log(data);
}
movePlayer();

//  function expression
const movePlayerAsync = async function () {
  try {
    const [users, posts, albums] = await Promise.all(
      url.map(async (u) => {
        let rsponse = await fetch(u);
        return rsponse.json();
      }),
    );
    return [users, posts, albums];
  } catch (error) {
    console.error("Error:", error);
  }
};

movePlayerAsync().then((res) => console.log(res));

const getData = async function () {
  try {
    const arrayOfPromises = url.map((url) => fetch(url));
    for await (let request of arrayOfPromises) {
      const data = await request.json();
      console.log(data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const fs = require("fs");
//  1 what floor does santa end up on ?
//  ( ===>  should go up  1 floor
//  ) ===> should go down 1 floor

function question1() {
  fs.readFile("./santa.txt", (err, data) => {
    console.time("santa-time");
    const directions = data.toString();
    const directionsArray = directions.split("");

    const answer = directionsArray.reduce((acc, currentValue) => {
      if (currentValue === "(") {
        return acc + 1;
      } else if (currentValue === ")") {
        return acc - 1;
      }
    }, 0);
    console.timeEnd("santa-time");
    console.log("====================================");
    console.log(answer);
    console.log("====================================");
  });
}

// question1();

//  2 when does santa  first enter the basement ?

function question2() {
  fs.readFile("./santa.txt", (err, data) => {
    console.time("q2-santa-time");
    const directions = data.toString();
    const directionsArray = directions.split("");
    let accumulator = 0;
    let counter = 0;
    const answer = directionsArray.some((currentItem) => {
      if (currentItem === "(") {
        accumulator += 1;
      } else if (currentItem === ")") {
        accumulator -= 1;
      }
      counter++;
      return accumulator < 0;
    });

    console.log("Counter", counter, answer);

    console.timeEnd("q2-santa-time");
  });
}

question2();

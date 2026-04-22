const fs = require("fs");

fs.readFile("test.txt", (err, data) => {
  if (err) {
    console.log("error occurred while reading file");
  } else {
    console.log(data.toString("utf8"), "1", "Async");
  }
});

const fileSync = fs.readFileSync("./test.txt");
console.log(fileSync.toString(), "2", "Sync");

//  APPEND
// fs.appendFile("./test.txt", " Hello World!", (err) => {
//   if (err) {
//     console.log("error occurred while appending to file");
//   }
// });

//  WRITE

// fs.writeFile("bye.txt", " Sad to see you go!", (err) => {
//   if (err) {
//     console.log("error occurred while writing to file");
//   }
// });

//  DELETE

// fs.unlink("./bye.txt", (err) => {
//   if (err) {
//     console.log("error occurred while deleting file");
//   }
//   console.log("Inception");
// });

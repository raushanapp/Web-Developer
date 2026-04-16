//  old way of making HTTP requests
var request = new XMLHttpRequest();
request.open("GET", "https://jsonplaceholder.typicode.com/posts/1", true);

request.onloadend = function () {
  if (request.status >= 200 && request.status < 400) {
    //  success
    var data = JSON.parse(request.responseText);
    console.log(data);
  } else {
    //  we reached our target server, but it returned an error
    console.error("Error:", request.status);
  }
};

request.onerror = function () {
  // there was a connection error of some sort
  console.error("Connection Error");
};

request.send();

//  other example with jQuery

$.getJSON("https://jsonplaceholder.typicode.com/posts/1", function (data) {
  console.log(data);
});

// this is new way
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

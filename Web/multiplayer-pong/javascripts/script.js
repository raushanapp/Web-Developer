//  Canvas Related code

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
let paddleIndex = 0;

let width = 500;
let height = 700;

// Paddle

let paddleHeight = 10;
let paddleWidth = 50;
let paddleDiff = 25;
let paddleX = [255, 255];
let trajectoryX = [0, 0]; // this repersent the direction of paddle heading
let playerMoved = false;

//  Ball

let ballX = 250;
let ballY = 350;
let ballRadius = 5;
let ballDirection = 1;

//  Speed

let speedY = 2;
let speedX = 0;
let computerSpeed = 4;

//  score for Both players

let score = [0, 0];

// Create Canvas Element

function createCanvas() {
  canvas.id = "canvas";
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
  renderCanvas();
}

// Wait for Opponents
// function renderIntro() {
//   // Canvas Background
//   context.fillStyle = 'black';
//   context.fillRect(0, 0, width, height);

//   // Intro Text
//   context.fillStyle = 'white';
//   context.font = "32px Courier New";
//   context.fillText("Waiting for opponent...", 20, (canvas.height / 2) - 30);
// }

// Render Everything on Canvas

function renderCanvas() {
  // Canvas Background
  context.fillStyle = "black";
  context.fillRect(0, 0, width, height);

  // Paddle Color
  context.fillStyle = "white";
}

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
let trajectoryX = [0, 0];
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

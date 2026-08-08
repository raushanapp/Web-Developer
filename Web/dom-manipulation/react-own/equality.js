console.log("1" == 1);
console.log("1" === 1);

let a = { name: "tony" };
let b = { name: "tony" };
let c = a;
console.log(a === b);
console.log(a === c);
console.log(a === b);

console.log(Object.is(a, b));
console.log(Object.is(a, c));

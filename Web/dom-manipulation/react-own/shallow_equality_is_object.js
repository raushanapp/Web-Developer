// REFERENCTIAL EQUALITY
// comparing two values to see if they are at the same location in memory

//  SHALLOW EQUALITY
// Comparing the properties of two valies to  see if they all are strictly equal.
// That means the same value for promitives, or the same memory location for objects.

const person1 = {
  firstName: "Tony",
  lastName: "Alicea",
  //   course:"Understanding React", this is a string, so it will be compared by value true
  //  this is called sub object, so it will be compared by reference, not by value

  cours: { name: "Understanding React" }, // this is a nested object, so it will be compared by reference, not by value
};

const person2 = {
  firstName: "Tony",
  lastName: "Alicea",
  //   course:"Understanding React", this is a string, so it will be compared by value true
  //  this is called sub object, so it will be compared by reference, not by value
  cours: { name: "Understanding React" }, // this is a nested object, so it will be compared by reference, not by value
};

const person3 = person1;
console.log(Object.is(person1, person3)); // true
console.log(Object.is(person1, person2)); // false

const objectIs = Object.is;

function shallowEqual(objA, objB) {
  if (objectIs(objA, objB)) {
    return true;
  }

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  } // Test for A's keys different from B.

  for (var i = 0; i < keysA.length; i++) {
    var currentKey = keysA[i];

    if (
      !hasOwnProperty.call(objB, currentKey) ||
      !objectIs(objA[currentKey], objB[currentKey])
    ) {
      return false;
    }
  }

  return true;
}

console.log(shallowEqual(person1, person2)); // true

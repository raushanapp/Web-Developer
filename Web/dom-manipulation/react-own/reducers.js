// Concept Reducers

const number = [1, 2, 3, 4];

const reducerFn = (accumulator, currentValue) => {
  console.log("---- Iteration ----");
  console.log("Accumulator: ", accumulator);
  console.log("Current Value: ", currentValue);

  const nextAccumulator = accumulator + currentValue;
  console.log("Next Accumulator: ", nextAccumulator);
  return nextAccumulator;
};

const intitalValue = 0;

const sum = number.reduce(reducerFn, intitalValue);
console.log("Sum: ", sum);

//  Javascripts Object

const globalState = {
  NorthSouth: "Green",
  CarWaiting: false,
  WaitTime: 30,
};

function reducer(state, action) {
  switch (action.type) {
    case "Car Waiting": {
      return {
        ...state,
        CarWaiting: true,
        WaitTime: action.payload.WaitTime,
      };
    }
    case "Finished Waiting": {
      return {
        ...state,
        NorthSouth: "Yellow",
      };
    }
    default: {
      return state;
    }
  }
}

console.log("Initial State: ", globalState);

const newState = reducer(globalState, {
  type: "Car Waiting",
  payload: {
    WaitTime: 10,
  },
});
console.log("New State: ", newState);

const newState1 = reducer(newState, {
  type: "Finished Waiting",
});
console.log("New State 1: ", newState1);

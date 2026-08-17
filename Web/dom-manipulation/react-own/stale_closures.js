// STALE CLOSURES
function createCounter(incBy) {
  let value = 0;
  function increment() {
    value += incBy;
    console.log("Value ==> ", value);
  }

  //   const message = `Current value is ${value}`; // this wrong capturing the closures and this version has stale
  function log() {
    const message = `Current value is ${value}`; // this fixed version
    console.log(message);
  }

  return [increment, log];
}

const [increment, log] = createCounter(1);
increment();
increment();
increment();
log();

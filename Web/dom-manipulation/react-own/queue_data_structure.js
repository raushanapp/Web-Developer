//  Queue

class QueueListNode {
  constructor(val, next = null) {
    this.value = val;
    this.next = next;
  }
}

class QueueList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(val) {
    const newNode = new QueueListNode(val);
    //  if there is no head yet let's make new nodee a head.
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }
    //  Attach new node to the end of linked list.
    this.tail.next = newNode;
    this.tail = newNode;
    return this;
  }

  pop() {
    let originalHead = this.head;
    if (this.head) {
      this.head = this.head.next;
    }

    return originalHead ? originalHead.value : null;
  }

  print() {
    let currentNode = this.head;
    while (currentNode) {
      console.log(currentNode.value);
      currentNode = currentNode.next;
    }
  }
}

let myQueue = new QueueList();
myQueue.append("Tony");
myQueue.append("Mayur");
myQueue.append("Alice");
myQueue.append("Understanding React");
myQueue.print();

console.log("-------");

console.log("Popped value: " + myQueue.pop());
console.log("Popped value: " + myQueue.pop());

myQueue.print();

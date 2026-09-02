//  Linked list
class LinkedListNode {
  constructor(val, next = null) {
    this.value = val;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(val) {
    const newNode = new LinkedListNode(val);
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

  print() {
    let currentNode = this.head;
    while (currentNode) {
      console.log(currentNode.value);
      currentNode = currentNode.next;
    }
  }
}

let myLinkedList = new LinkedList();
myLinkedList.append("Tony");
myLinkedList.append("Mayur");
myLinkedList.append("Alice");
myLinkedList.append("Understanding React");
myLinkedList.print();

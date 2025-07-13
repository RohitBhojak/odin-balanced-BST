import uniqueMergeSort from "./sort.js";
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export default class Tree {
  constructor(array) {
    const sorted = uniqueMergeSort(array);
    this.root = this.buildTree(sorted);
  }

  buildTree(array) {
    if (array.length == 0) {
      return null;
    }
    const mid = Math.floor(array.length / 2);
    const node = new Node(array[mid]);
    node.left = this.buildTree(array.slice(0, mid));
    node.right = this.buildTree(array.slice(mid + 1));
    return node;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value) {
    let current = this.root;
    let prev = null;
    while (current) {
      prev = current;
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    const newNode = new Node(value);
    if (prev === null) {
      this.root = newNode;
      return;
    }

    if (value > prev.value) prev.right = newNode;
    else if (value < prev.value) prev.left = newNode;
  }
}

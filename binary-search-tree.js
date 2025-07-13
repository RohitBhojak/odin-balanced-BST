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
    this.root = this.#insert(this.root, value);
  }

  #insert(current, value) {
    console.log(current);
    if (current == null) {
      return new Node(value);
    }

    if (value > current.value) {
      current.right = this.#insert(current.right, value);
    } else if (value < current.value) {
      current.left = this.#insert(current.left, value);
    }

    return current;
  }

  #getSuccessor(current) {
    current = current.right;
    while (current && current.left) {
      current = current.left;
    }
    return current;
  }
}

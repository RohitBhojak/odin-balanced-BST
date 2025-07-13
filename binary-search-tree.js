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
}

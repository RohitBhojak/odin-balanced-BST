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
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    const sorted = uniqueMergeSort(array);
  }
}

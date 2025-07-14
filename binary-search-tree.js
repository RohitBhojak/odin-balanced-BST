function uniqueMergeSort(array) {
  if (array.length <= 1) return array;

  const mid = Math.floor(array.length / 2);
  return merge(
    uniqueMergeSort(array.slice(0, mid)),
    uniqueMergeSort(array.slice(mid))
  );
}

function merge(array1, array2) {
  const sorted = [];
  let i = 0,
    j = 0;
  let lastElement = null;
  while (i < array1.length && j < array2.length) {
    let val1 = array1[i],
      val2 = array2[j];
    if (val1 === lastElement) {
      i++;
      continue;
    }
    if (val2 === lastElement) {
      j++;
      continue;
    }
    if (val1 < val2) {
      sorted.push(val1);
      lastElement = val1;
      i++;
    } else {
      sorted.push(val2);
      lastElement = val2;
      j++;
    }
  }

  while (i < array1.length) {
    let val = array1[i];
    if (lastElement === val) {
      i++;
      continue;
    }
    sorted.push(val);
    i++;
  }

  while (j < array2.length) {
    let val = array2[j];
    if (lastElement === val) {
      j++;
      continue;
    }
    sorted.push(val);
    j++;
  }

  return sorted;
}

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export default class Tree {
  #callbackError = "A function is required as argument";
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

  deleteItem(value) {
    this.root = this.#delete(this.root, value);
  }

  #delete(current, value) {
    if (current == null) {
      return current;
    }

    if (value > current.value) {
      current.right = this.#delete(current.right, value);
    } else if (value < current.value) {
      current.left = this.#delete(current.left, value);
    } else {
      if (current.left == null) {
        return current.right;
      } else if (current.right == null) {
        return current.left;
      } else {
        let successor = this.#getMin(current.right);
        current.value = successor.value;
        current.right = this.#delete(current.right, successor.value);
      }
    }
    return current;
  }

  getMin() {
    const min = this.#getMin(this.root);
    return min ? min.value : null;
  }

  getMax() {
    const max = this.#getMax(this.root);
    return max ? max.value : null;
  }

  #getMin(current) {
    while (current && current.left) {
      current = current.left;
    }
    return current;
  }

  #getMax(current) {
    while (current && current.right) {
      current = current.right;
    }
    return current;
  }

  find(value) {
    let current = this.root;
    while (current && current.value !== value) {
      if (value > current.value) {
        current = current.right;
      } else {
        current = current.left;
      }
    }
    return current;
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error(this.#callbackError);
    }
    if (this.root === null) return;
    const queue = [this.root];
    while (queue.length) {
      const size = queue.length;
      for (let i = 0; i < size; i++) {
        const node = queue.shift();
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
        callback(node);
      }
    }
  }

  inOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error(this.#callbackError);
    }
    this.#inOrder(this.root, callback);
  }

  #inOrder(node, callback) {
    if (node === null) return;

    this.#inOrder(node.left, callback);
    callback(node);
    this.#inOrder(node.right, callback);
  }

  preOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error(this.#callbackError);
    }
    this.#preOrder(this.root, callback);
  }

  #preOrder(node, callback) {
    if (node === null) return;

    callback(node);
    this.#preOrder(node.left, callback);
    this.#preOrder(node.right, callback);
  }

  postOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error(this.#callbackError);
    }
    this.#postOrder(this.root, callback);
  }

  #postOrder(node, callback) {
    if (node === null) return;

    this.#postOrder(node.left, callback);
    this.#postOrder(node.right, callback);
    callback(node);
  }

  height(value) {
    return this.#maxDepth(this.find(value)) - 1;
  }

  #maxDepth(node) {
    if (node === null) return 0;
    const left = this.#maxDepth(node.left);
    const right = this.#maxDepth(node.right);
    return 1 + Math.max(left, right);
  }

  depth(value) {
    let level = 0;
    let current = this.root;

    while (current && current.value !== value) {
      if (value > current.value) {
        current = current.right;
      } else {
        current = current.left;
      }
      level++;
    }

    return current ? level : -1;
  }

  isBalanced() {
    return this.#checkBalance(this.root) != -1;
  }

  #checkBalance(node) {
    if (node === null) return 0;

    const left = this.#checkBalance(node.left);
    const right = this.#checkBalance(node.right);

    if (left == -1 || right == -1) return -1;
    if (Math.abs(left - right) > 1) return -1;

    return 1 + Math.max(left, right);
  }

  reBalance() {
    const inOrder = [];
    this.inOrderForEach((node) => inOrder.push(node.value));
    this.root = this.buildTree(inOrder);
  }
}

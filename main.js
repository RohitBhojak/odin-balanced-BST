import Tree from "./binary-search-tree.js";

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const bst = new Tree(arr);

bst.insert(10);
bst.insert(12);
bst.insert(11);
bst.insert(1421);
bst.insert(1);

bst.deleteItem(67);
bst.prettyPrint();

console.log(bst.getMax());
console.log(bst.getMin());

console.log(bst.find(111));
console.log(bst.find(12));

const levelOrder = [];
bst.levelOrderForEach((node) => levelOrder.push(node.value));
console.log(levelOrder);

const inOrder = [];
bst.inOrderForEach((node) => inOrder.push(node.value));
console.log(inOrder);

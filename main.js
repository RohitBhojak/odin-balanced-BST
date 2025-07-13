import Tree from "./binary-search-tree.js";

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const bst = new Tree(arr);

bst.insert(10);
// bst.insert(12);
// bst.insert(11);
bst.prettyPrint();

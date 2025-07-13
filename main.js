import prettyPrint from "./prettyPrint.js";
import Tree from "./binary-search-tree.js";

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const bst = new Tree(arr);

prettyPrint(bst.root);

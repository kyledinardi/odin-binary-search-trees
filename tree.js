import Node from './node.js';

function buildTree(arr, start, end) {
  if (start > end) {
    return null;
  }

  const mid = parseInt((start + end) / 2, 10);
  const node = new Node(arr[mid]);
  node.left = buildTree(arr, start, mid - 1);
  node.right = buildTree(arr, mid + 1, end);
  return node;
}

function insert(node, data) {
  if (node === null) {
    return new Node(data);
  }

  if (data < node.data) {
    node.left = insert(node.left, data);
  } else {
    node.right = insert(node.right, data);
  }

  return node;
}

function deleteNode(root, data) {
  if (root === null) {
    return root;
  }

  if (data < root.data) {
    root.left = deleteNode(root.left, data);
    return root;
  } else if (data > root.data) {
    root.right = deleteNode(root.right, data);
    return root;
  }

  if (root.left === null) {
    let tmp = root.right;
    return tmp;
  } else if (root.right === null) {
    let tmp = root.left;
    return tmp;
  } else {
    let succParent = root;
    let succ = root.right;

    while (succ.left !== null) {
      succParent = succ;
      succ = succ.left;
    }

    if (succParent !== root) {
      succParent.left = succ.right;
    } else {
      succParent.right = succ.right;
    }

    root.data = succ.data;
    return root;
  }
}

function sortAndRemoveDuplicates(arr) {
  const copy = [...arr];
  const sortedCopy = copy.sort((a, b) => a - b);

  for (let i = 0; i < sortedCopy.length - 1; i += 1) {
    while (sortedCopy[i] === sortedCopy[i + 1]) {
      sortedCopy.splice(i, 1);
    }
  }

  return sortedCopy;
}

function prettyPrint(node, prefix = '', isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }

  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);

  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

class Tree {
  constructor(arr) {
    this.arr = sortAndRemoveDuplicates(arr);
    this.root = buildTree(this.arr, 0, this.arr.length - 1);
  }
}

const example = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(prettyPrint(example.root));

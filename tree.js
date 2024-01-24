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

function insert(node, value) {
  if (node === null) {
    return new Node(value);
  }

  if (value < node.data) {
    node.left = insert(node.left, value);
  } else {
    node.right = insert(node.right, value);
  }

  return node;
}

function deleteNode(root, value) {
  if (root === null) {
    return root;
  }

  if (value < root.data) {
    root.left = deleteNode(root.left, value);
    return root;
  } else if (value > root.data) {
    root.right = deleteNode(root.right, value);
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

function find(node, value) {
  if (node === null) {
    return 'Value not in tree';
  }

  if (value < node.data) {
    return find(node.left, value);
  } else if (value > node.data) {
    return find(node.right, value);
  } else {
    return node;
  }
}

function levelOrder(node, callback) {
  if (node === null) {
    null;
  }

  const arr = [];
  const q = [];
  q.push(node);

  while (q.length > 0) {
    const current = q.shift();

    if (callback) {
      current.data = callback(current.data);
    } else {
      arr.push(current.data);
    }

    if (current.left) {
      q.push(current.left);
    }
    if (current.right) {
      q.push(current.right);
    }
  }

  if (!callback) {
    return arr;
  }
}

function inOrder(node, callback, arr = []) {
  if (node === null) {
    return;
  }

  inOrder(node.left, callback, arr);

  if (callback) {
    callback(node);
  } else {
    arr.push(node.data);
  }

  inOrder(node.right, callback, arr);

  if (!callback) {
    return arr;
  }
}

function preOrder(node, callback, arr = []) {
  if (node === null) {
    return;
  }

  if (callback) {
    callback(node);
  } else {
    arr.push(node.data);
  }

  preOrder(node.left, callback, arr);
  preOrder(node.right, callback, arr);

  if (!callback) {
    return arr;
  }
}

function postOrder(node, callback, arr = []) {
  if (node === null) {
    return;
  }

  postOrder(node.left, callback, arr);
  postOrder(node.right, callback, arr);

  if (callback) {
    callback(node);
  } else {
    arr.push(node.data);
  }

  if (!callback) {
    return arr;
  }
}

function height(node) {
  if (node === null) {
    return -1;
  }

  const leftHeight = height(node.left);
  const rightHeight = height(node.right);

  return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
}

function depth(node, root) {
  let current = 0;
  let tmp = root;

  while (tmp !== null) {
    if (node.data < tmp.data) {
      tmp = tmp.left;
      current += 1;
    } else if (node.data > tmp.data) {
      tmp = tmp.right;
      current += 1;
    } else {
      return current;
    }
  }

  return 'Node not in tree';
}

function isBalanced(node) {
  if (node === null) {
    return;
  }

  let isTreeBalanced = true;

  inOrder(node, (tmp) => {
    if (!tmp.left && !tmp.right) {
      return;
    }

    const diff = Math.abs(height(tmp.left) - height(tmp.right))

    if (diff > 1) {
      isTreeBalanced = false;
    }
  });

  return isTreeBalanced;
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

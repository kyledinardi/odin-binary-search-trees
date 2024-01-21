/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
import Node from './node.js';

function mergeSort(arr) {
  if (arr.length === 0) {
    return 'Array is empty';
  }
  if (arr.length === 1) {
    return arr;
  }

  const halfway = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, halfway));
  const right = mergeSort(arr.slice(halfway));
  const sorted = [];

  while (left.length > 0 && right.length > 0) {
    if (left[0] <= right[0]) {
      sorted.push(left.shift());
    } else {
      sorted.push(right.shift());
    }
  }

  if (left.length === 0) {
    right.forEach((n) => {
      sorted.push(n);
    });
  } else {
    left.forEach((n) => {
      sorted.push(n);
    });
  }

  return sorted;
}

function removeDuplicates(arr) {
  const copy = [...arr];
  for (let i = 0; i < copy.length - 1; i += 1) {
    while (copy[i] === copy[i + 1]) {
      copy.splice(i, 1);
    }
  }

  return copy;
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
    this.arr = removeDuplicates(mergeSort(arr));
    this.root = this.buildTree(this.arr, 0, this.arr.length - 1);
  }

  buildTree(arr, start, end) {
    if (start > end) {
      return null;
    }

    const mid = parseInt((start + end) / 2, 10);
    const node = new Node(arr[mid]);
    node.left = this.buildTree(arr, start, mid - 1);
    node.right = this.buildTree(arr, mid + 1, end);
    return node;
  }
}

const example = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(prettyPrint(example.root));

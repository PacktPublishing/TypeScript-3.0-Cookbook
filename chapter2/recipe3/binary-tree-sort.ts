import { TreeNode, treeNode } from "./TreeNode";

class BinaryTreeSort {
  constructor(private tree: treeNode = null) {}

  public push(...values: number[]): void {
    values.forEach((value: number) => {
      this.tree = this.pushNode(this.tree, value);
    });
  }

  public sort(): number[] {
    const sorted:number[] = [];
    this.inorder(this.tree, sorted);
    return sorted;
  }

  private inorder(node: treeNode, sorted: number[]): void {
    if (node !== null) {
      this.inorder(node.left, sorted);
      sorted.push(node.key);
      this.inorder(node.right, sorted);
    }
  }

  private pushNode(node: treeNode, key: number): TreeNode {
    if (node === null) {
      node = new TreeNode(key);
      return node;
    }
    if (key < node.key) {
      node.left = this.pushNode(node.left, key);
    } else if (key > node.key) {
      node.right = this.pushNode(node.right, key);
    }
    return node;
  }
}

const sort: BinaryTreeSort = new BinaryTreeSort();
sort.push(10, 30, 24, 95,18, 6);
console.log(`Unsorted ${[10, 30, 24, 95,18, 6]}`);
console.log(`Sorted ${sort.sort()}`);
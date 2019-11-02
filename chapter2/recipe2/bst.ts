import { treeNode, TreeNode } from "./TreeNode";
import { BalanceNode } from "./BalanceNode";

class BinarySearchTree {
  constructor(public tree: treeNode = null, private balanceTree: BalanceNode = new BalanceNode()) {}

  public push(key: number): void {
    const newNode: TreeNode = new TreeNode(key);
    this.tree = this.insertNode(this.tree, newNode);
  }

  private insertNode(node: treeNode, newNode: TreeNode): treeNode {
    if (!node) {
      node = newNode;
      return node;
    }
    if (newNode.key < node.key) {
      node.left = this.insertNode(node.left, newNode);
    } else if (newNode.key > node.key) {
      node.right = this.insertNode(node.right, newNode);
    }
    return this.balanceTree.balance(node);
  }

  public find(key: number): treeNode {
    let flag: boolean = true;
    if (this.tree === null) {
      return null;
    }
    let data = this.tree;
    while (flag) {
      if (data.key === key) {
        return data;
      }
      if (key > data.key) {
        if (data.right === null)
        {
          flag = false;
        } else {
          data = data.right;
        }
      } else if (key < data.key) {
        if (data.left === null) {
          flag = false;
        } else {
          data = data.left;
        }
      }
    }
    return null;
  }

  public contains(key: number): boolean {
    return this.find(key) !== null;
  }

}

const binarySearchTree: BinarySearchTree = new BinarySearchTree();
binarySearchTree.push(10);
binarySearchTree.push(12);
binarySearchTree.push(8);
binarySearchTree.push(5);
binarySearchTree.push(6);
binarySearchTree.push(11);
binarySearchTree.push(20);

console.log(binarySearchTree.tree);
console.log(`binarySearchTree.contains(5) is ${binarySearchTree.contains(5)}`);
console.log(`binarySearchTree.contains(4) is ${binarySearchTree.contains(4)}`);

/* To see the effect of the balance, uncomment this code
binarySearchTree.push(30);
binarySearchTree.push(40);
binarySearchTree.push(50);

console.log(binarySearchTree.find(30));
*/
import { treeNode } from "./TreeNode";
export class BalanceNode {
  public balance(node: treeNode): treeNode {
    let balanceFactor = this.getBalance(node);
    if (balanceFactor > 1) {
      balanceFactor = this.getBalance(node!.left);
      if (balanceFactor > 0) {
        node = this.rotateLeftLeft(node);
      }
      else {
        node = this.rotateLeftRight(node);
      }
    }
    else if (balanceFactor < -1) {
      balanceFactor = this.getBalance(node!.right);
      if (balanceFactor > 0) {
        node = this.rotateRightLeft(node);
      }
      else {
        node = this.rotateRightRight(node);
      }
    }
    return node;
  }
  private rotateLeftRight(parent: treeNode): treeNode {
    const pivot = parent!.left;
    parent!.left = this.rotateRightRight(pivot);
    return this.rotateLeftLeft(parent);
  }
  private rotateRightLeft(parent: treeNode): treeNode {
    const pivot = parent!.right;
    parent!.right = this.rotateLeftLeft(pivot);
    return this.rotateRightRight(parent);
  }
  private rotateRightRight(parent: treeNode): treeNode {
    const pivot = parent!.right;
    parent!.right = pivot!.left;
    pivot!.left = parent;
    return pivot;
  }
  private rotateLeftLeft(parent: treeNode): treeNode {
    const pivot = parent!.left;
    parent!.left = pivot!.right;
    pivot!.right = parent;
    return pivot;
  }
  private getBalance(node: treeNode): number {
    const left = this.getHeight(node!.left);
    const right = this.getHeight(node!.right);
    return left - right;
  }
  private getHeight(node: treeNode): number {
    let height: number = 0;
    if (node) {
      const left = this.getHeight(node.left);
      const right = this.getHeight(node.right);
      const max = Math.max(left, right);
      height = max + 1;
    }
    return height;
  }
}

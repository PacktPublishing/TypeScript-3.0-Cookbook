export type treeNode = TreeNode | null;

export class TreeNode {
  constructor(public key: number, public left: treeNode = null, public right: treeNode = null) { }
}

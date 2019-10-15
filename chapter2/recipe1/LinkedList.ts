import { Node } from "./Node";
export class LinkedList<T> {
  constructor(protected head: Node<T> | null = null) { }
  public push(data: T): void {
    const node: Node<T> = new Node(data);
    if (this.head === null) {
      this.head = node;
    }
    else {
      const lastNode: Node<T> = this.findLast()!;
      lastNode.next = node;
    }
  }
  private findLast(): Node<T> | null {
    if (this.head === null) {
      return null;
    }
    let node: Node<T> = this.head;
    while (node.next !== null) {
      node = node.next;
    }
    return node;
  }
}

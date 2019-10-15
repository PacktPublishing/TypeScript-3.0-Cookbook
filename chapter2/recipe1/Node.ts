export class Node<T> {
  constructor(public data: T, public next: Node<T> | null = null) { }
}

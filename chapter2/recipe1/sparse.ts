import { LinkedList } from "./LinkedList";
import { Node } from "./Node";

class Matrix {
  constructor(public row: number, public column: number, public value: number) { }
}

class SparseMatrix extends LinkedList<Matrix> {
  public toArray(): (number)[][] | null {
    if (this.head === null) {
      return null;
    }
    const bounds = this.bounds();
    let node: Node<Matrix> = this.head;

    const items = new Array<Array<number>>();
    for (let row: number = 0; row < bounds[0]; row++) {
      items[row] = new Array<number>(bounds[1]).fill(0);
    }
    while (node !== null) {
      items[node.data.row][node.data.column] = node.data.value;
      node = node.next!;
    }
    return items!;
  }

  private bounds(): [number, number] {
    if (this.head === null) {
      return [0,0];
    }
    let node: Node<Matrix> = this.head;
    let maxCol: number = node.data.column;
    let maxRow: number = node.data.row;
    while (node !== null) {
      maxCol = Math.max(node.data.column, maxCol);
      maxRow = Math.max(node.data.row, maxRow);
      node = node.next!;
    }
    // These are maximum rows and columns, so they need to
    // be incremented because arrays are zero based.
    return [++maxRow, ++maxCol];
  }
}


function push(row: number, column: number, value: number): Matrix {
  return new Matrix(row, column, value);
}

const sparseMatrix = new SparseMatrix();
sparseMatrix.push(push(4, 3, 33));
sparseMatrix.push(push(2, 1, 12));

console.log(sparseMatrix.toArray());
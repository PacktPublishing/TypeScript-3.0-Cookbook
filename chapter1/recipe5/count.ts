class Enumerable {
  public static count(items: any[]): number {
    let count = 0;
    for (const item in items) {
      if (items[item] !== undefined) {
        count++;
      }
    }
    return count;
  }
}

const board = [10, 20, , 30, 41];

console.log('*** The length is');
console.log(board.length);
console.log('*** The count is')
console.log(Enumerable.count(board));

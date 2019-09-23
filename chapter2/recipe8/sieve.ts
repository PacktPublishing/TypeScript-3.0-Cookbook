class Eratosthenes {
  public static sieve(limit: number): number[] {
    const allItems: boolean[] = [];
    const upperLimit = Math.sqrt(limit);
    const output: number[] = [];

    for (let index: number = 0; index < limit; index++) {
      allItems.push(true);
    }

    for (let index = 2; index <= upperLimit; index++) {
      if (allItems[index]) {
          for (let innerIndex = index * index; innerIndex < limit; innerIndex += index) {
            allItems[innerIndex] = false;
          }
      }
    }

    for (let index = 2; index < limit; index++) {
      if (allItems[index]) {
          output.push(index);
      }
    }

    return output;
  }
}

console.log(Eratosthenes.sieve(1000000));
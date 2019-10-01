class Eratosthenes {
  public static sieve(limit: number): number[] {
    const allItems: boolean[] = Eratosthenes.populateSieve(limit);
    Eratosthenes.calculateNonPrimes(limit, allItems);

    return Eratosthenes.createPrimeOutput(limit, allItems);
  }

  private static populateSieve(limit: number): boolean[] {
    const allItems: boolean[] = Array(limit).fill(true);
    return allItems;
  }

  private static calculateNonPrimes(limit: number, allItems: boolean[]): void {
    const upperLimit = Math.sqrt(limit);
    for (let index = 2; index <= upperLimit; index++) {
      if (allItems[index]) {
        for (let innerIndex = index * index; innerIndex < limit; innerIndex += index) {
          allItems[innerIndex] = false;
        }
      }
    }
  }

  private static createPrimeOutput(limit: number, allItems: boolean[]): number[] {
    const output: number[] = [];
    for (let index = 2; index < limit; index++) {
      if (allItems[index]) {
        output.push(index);
      }
    }
    return output;
  }
}

console.log(Eratosthenes.sieve(10000000).length);
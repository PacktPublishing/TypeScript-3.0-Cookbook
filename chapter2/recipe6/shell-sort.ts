class Sort {
  public static shellSort(values: number[]): void {
    let n: number = values.length; 
    let gap: number = Math.floor(n / 2);
    while (gap > 0) {
      for (let index: number = gap; index< n; index+= 1) {
        const temp: number = values[index];
        let innerIndex: number = 0;
        for (innerIndex = index; innerIndex>= gap && values[innerIndex - gap] > temp; innerIndex -= gap) {
          values[innerIndex] = values[innerIndex - gap];
        }
        values[innerIndex] = temp;
      }
      gap = Math.floor(gap / 2);
    }
  }
}

const array: number[] = [12, 24, -4, 32, 3, -1, -5, 64, 108, 9, 12, 24, 14];
Sort.shellSort(array)
console.log(array);
class Sort {
  public static quickSort(values: number[], left: number = 0, right: number = values.length - 1): void {
    const partitionIndex = Sort.partition(values, left, right);

    if (left < partitionIndex - 1) {
      Sort.quickSort(values, left, partitionIndex - 1);
    }

    if (partitionIndex < right) {
      Sort.quickSort(values, partitionIndex, right);
    }
  }

  private static partition(values: number[], left: number = 0, right: number = values.length - 1): number {
    let pivotIndex: number = values[Math.floor((right + left) / 2)];
    let index: number = left;
    let rightIndex: number = right;
    while (index <= rightIndex) {
      while(values[index] < pivotIndex) {
        index++;
      }
      while(values[rightIndex] > pivotIndex) {
        rightIndex--;
      }
      if (index <= rightIndex) {
        [values[index], values[rightIndex]] = [values[rightIndex], values[index]];
        index++;
        rightIndex--;
      }
    }
    return index;
  }
}

const array: number[] = [10, 139, 40, 3, 80, 18, 12, 52, 90]
Sort.quickSort(array);
console.log(array);
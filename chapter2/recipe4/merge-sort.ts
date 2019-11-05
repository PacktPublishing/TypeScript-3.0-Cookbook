class Sort {
  public static mergeSort(values: number[]): number[] {
    return Sort.sort(values);
  }

  private static sort(values: number[]): number[] {
    if (values.length === 1) {
      return values;
    }
    const middle = Math.floor(values.length / 2);
  
    const left: number[] = values.slice(0, middle);
    const right: number[] = values.slice(middle);
  
    return Sort.mergeLeftAndRightArrays(
      Sort.sort(left), Sort.sort(right)
    );
  }

  private static mergeLeftAndRightArrays(leftValues: number[], rightValues: number[]): number[] {
    const result = [];
    let left = 0;
    let right = 0;
  
    while (left < leftValues.length && right < rightValues.length) {
      if (leftValues[left] < rightValues[right]) {
        result.push(leftValues[left++]);
      } else {
        result.push(rightValues[right++]);
      }
    }
    return result.concat(leftValues.slice(left)).concat(rightValues.slice(right));
  }
}

const array: number[] = [12, 24, -4, 32, 3, -1, -5, 64, 108, 9, 12, 14];
console.log(Sort.mergeSort(array));
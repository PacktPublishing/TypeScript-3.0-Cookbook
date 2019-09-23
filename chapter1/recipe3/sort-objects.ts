enum SortResults {
  LessThan = -1,
  Same = 0,
  GreaterThan = 1
}

interface Comparable<T> {
  compare(item1: T, item2: T): SortResults;
}

class SimpleClass {
  constructor(public name: string) { }
}

interface Comparer<T extends Comparable<any>> {
  setComparer(comparer: T): void;
}

class SimpleSortSample implements Comparer<Comparable<SimpleClass>> {
  constructor(private sortCase: SimpleClass[] = [], private comparisonObject: Comparable<SimpleClass> | null = null) {
    this.add('John');
    this.add('Ringo');
    this.add('Mary');
    this.add('Flavio');
    this.add('Orson');
  }

  public setComparer(compare: Comparable<SimpleClass>): void {
    this.comparisonObject = compare;
  }

  public sort(): void {
    /*
    If we did not copy our array (using slice here), we would find that our original array would be
    sorted.
    const sortOrder = this.sortCase.sort((cmp1: SimpleSortCase, cmp2: SimpleSortCase) => {
      if (cmp1.Name > cmp2.Name) return 1;
      if (cmp1.Name < cmp2.Name) return -1;
      return 0;
    });
    */
    let sortOrder: SimpleClass[] = this.sortCase.slice(0);
    if (this.comparisonObject === null) {
      sortOrder = sortOrder.sort();
    } else {
      sortOrder = this.sortCase.slice(0).sort((cmp1: SimpleClass, cmp2: SimpleClass) => {
        return this.comparisonObject!.compare(cmp1, cmp2);
      });
    }
    console.log(sortOrder);
  }

  private add(name: string): void {
    this.sortCase.push(new SimpleClass(name));
  }
}


class SortComparable implements Comparable<SimpleClass> {
  compare(item1: SimpleClass, item2: SimpleClass): SortResults {
    if (item1.name > item2.name) return SortResults.GreaterThan;
    if (item1.name < item2.name) return SortResults.LessThan;
    return SortResults.Same;
  }
}

const simple: SimpleSortSample = new SimpleSortSample();
console.log('*** Default sort');
simple.sort();
console.log('*** Logging with comparer');
simple.setComparer(new SortComparable());
simple.sort();

class MoreComplexCase {
  constructor(public name: string, public age: number, public location: string) {}
}

interface Comparable<T> {
  compare(item1: T, item2: T): number;
}

interface Comparer<T extends Comparable<any>> {
  setComparer(comparer: T): void;
}

class SortComparable implements Comparable<MoreComplexCase> {
  compare(item1: MoreComplexCase, item2: MoreComplexCase): number {
    const compareName = item1.name.localeCompare(item2.name);
     // We could use the following to test the age for the sorting but there's an easier way.
     // Operator short circuiting means that we only check the age comparison part, if the first
     // test indicates that the items are the same.
     //const compareAge = cmp1.Age > cmp2.Age ? 1 : cmp1.Age < cmp2.Age ? -1 : 0;
    return compareName || item1.age - item2.age;
  }
}

class MoreComplexSample implements Comparer<Comparable<MoreComplexCase>> {
  setComparer(comparer: Comparable<MoreComplexCase>): void {
    this.comparisonObject = comparer;
  }

  constructor(private sortCase: MoreComplexCase[] = [], private comparisonObject: Comparable<MoreComplexCase> | null = null){
    this.add('Peter', 50, 'London');
    this.add('Peter', 30, 'New York');
    this.add('Sophia', 42, 'Durban');
    this.add('Sophia', 42, 'Canberra');
    this.add('Jane', 22, 'Paris');
    this.add('Antonia', 45, 'Tokyo');
    this.add('Sophia', 22, 'Mumbai');
  }

  public sort(): void {
    let sortOrder = this.sortCase.slice(0);
    if (this.comparisonObject === null) {
      sortOrder = sortOrder.sort();
    } else {
      sortOrder = sortOrder.sort((cmp1: MoreComplexCase, cmp2: MoreComplexCase) => {
        return this.comparisonObject!.compare(cmp1, cmp2);
      });
    }
    console.log(sortOrder);
  }

  private add(name: string, age: number, location: string): void {
    this.sortCase.push(new MoreComplexCase(name, age, location));
  }
}

const complex: MoreComplexSample = new MoreComplexSample();
console.log('*** Default sort');
complex.sort();
console.log('*** Logging with comparer');
complex.setComparer(new SortComparable());
complex.sort();
class MoreComplexCase {
  constructor(public Name: string, public Age: number, public Location: string) {}
}

class MoreComplexSample {
  constructor(private sortCase: MoreComplexCase[] = []){
    this.add('Peter', 50, 'London');
    this.add('Peter', 30, 'New York');
    this.add('Sophia', 42, 'Durban');
    this.add('Sophia', 42, 'Canberra');
    this.add('Jane', 22, 'Paris');
    this.add('Antonia', 45, 'Tokyo');
    this.add('Sophia', 22, 'Mumbai');
  }

  public sort(): void {
   const sortOrder = this.sortCase.slice(0).sort((cmp1: MoreComplexCase, cmp2: MoreComplexCase) => {
     const compareName = cmp1.Name.localeCompare(cmp2.Name);
     // We could use the following to test the age for the sorting but there's an easier way.
     // Operator short circuiting means that we only check the age comparison part, if the first
     // test indicates that the items are the same.
     //const compareAge = cmp1.Age > cmp2.Age ? 1 : cmp1.Age < cmp2.Age ? -1 : 0;
     return compareName || cmp1.Age - cmp2.Age;
    });
    console.log(`-- Unsorted list`);
    console.log(this.sortCase);
    console.log(`-- Sorted list`);
    console.log(sortOrder);
  }

  private add(name: string, age: number, location: string): void {
    this.sortCase.push(new MoreComplexCase(name, age, location));
  }
}

const complex: MoreComplexSample = new MoreComplexSample();
complex.sort();
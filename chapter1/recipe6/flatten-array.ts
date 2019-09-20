class Flatten {
  private consolidatedArray: any[] = [];
  public static flat(inputItem: any[], flattenDepth: number = 1): any[] {
    const flatten: Flatten = new Flatten();
    flatten.flatImplementation(inputItem, flattenDepth)
    return flatten.consolidatedArray;
  }

  private flatImplementation(inputItem: any[], flattenDepth: number): void {
    for (const item of inputItem) {
      if (item instanceof Array) {
        if (flattenDepth > 0) {
          this.flatImplementation(item, flattenDepth - 1);
        }
        continue;
      }
      this.consolidatedArray.push(item);
    }
  }
}

const guitars = [
  'Ibanez', 'Gibson', [
    'Fender', 'PRS', 'Cort', [
        'Epiphone', 'ESP', [
            'Yamaha', [
                'Peavey'
            ]
        ]
    ]
  ], 'Shine'
]

const out = Flatten.flat(guitars, Infinity);
console.log(out);
function findNear(input: string, startText: string, findText: string, minDistance: number, distance: number): string[] {
  const pattern: string = `\\b${startText}\\W+(?:\\w+\\W+){${minDistance},${distance}}?${findText}`;
  const regEx: RegExp = new RegExp(pattern, 'gmi');
  const matches: RegExpMatchArray | null = input.match(regEx);
  const stringVal: string[] = [];
  if (matches) {
    matches.forEach(match => stringVal.push(match));
  }
  return stringVal;
}

const testInput: string = `It was the best of times It was the worst of times and was best
   he was known as the Best of friends but he was not known as the absolute best of friends`

const matchCollection = findNear(testInput, 'was', 'best', 0, 4);
if (matchCollection) {
  console.log(matchCollection);
}

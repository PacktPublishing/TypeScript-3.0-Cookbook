export class KnuthMorrisPratt {
  constructor(private text: string) { }

  public search(searchText: string): number[] {
    if (searchText.length === 0) {
      return [];
    }
    const patternTable = this.buildTable(searchText);
    const results: number[] = [];
    let textIdx: number = 0;
    let wordIdx: number = 0;

    while (textIdx < this.text.length) {
      if (this.text[textIdx] === searchText[wordIdx]) {
        if (wordIdx === searchText.length -1) {
          results.push((textIdx - searchText.length) + 1);
        }
        textIdx++;
        wordIdx++;        
      } else if (wordIdx > 0) {
        wordIdx = patternTable[wordIdx - 1];
      } else {
        wordIdx = 0;
        textIdx++;
      }
    }
    return results;
  }

  private buildTable(word: string): number[] {
    const table: number[] = [];
    let prefix: number = 0;
    let suffix: number = 1;

    while (suffix < word.length) {
      if (word[prefix] === word[suffix]) {
        table[prefix] = prefix + 1;
        suffix++;
        prefix++;
      } else if (prefix === 0) {
        table[suffix] = 0;
        suffix++;
      } else {
        prefix = table[prefix - 1];
      }
    }
    return table;
  }
}

function buildPatternTable(word:string) {
  const patternTable = [0];
  let prefixIndex = 0;
  let suffixIndex = 1;

  while (suffixIndex < word.length) {
    if (word[prefixIndex] === word[suffixIndex]) {
      patternTable[suffixIndex] = prefixIndex + 1;
      suffixIndex += 1;
      prefixIndex += 1;
    } else if (prefixIndex === 0) {
      patternTable[suffixIndex] = 0;
      suffixIndex += 1;
    } else {
      prefixIndex = patternTable[prefixIndex - 1];
    }
  }

  return patternTable;
}


export default function knuthMorrisPratt(text: string, word: string) {
  if (word.length === 0) {
    return 0;
  }

  let textIndex = 0;
  let wordIndex = 0;

  const patternTable = buildPatternTable(word);

  while (textIndex < text.length) {
    if (text[textIndex] === word[wordIndex]) {
      // We've found a match.
      if (wordIndex === word.length - 1) {
        return (textIndex - word.length) + 1;
      }
      wordIndex += 1;
      textIndex += 1;
    } else if (wordIndex > 0) {
      wordIndex = patternTable[wordIndex - 1];
    } else {
      wordIndex = 0;
      textIndex += 1;
    }
  }

  return -1;
}

var test = 'I love';

var string = `Cupcake ipsum dolor sit amet sesame snaps. Sweet tiramisu cupcake liquorice I loveI love cheesecake candy topping chocolate cake. Muffin fruitcake dessert apple pie. Caramels brownie chupa chups marzipan jujubes jelly beans sesame snaps I love. Gummies sesame snaps powder toffee dessert ice cream. Sweet caramels tart.

Pastry chocolate bar marzipan sugar plum cheesecake. Bonbon marshmallow cupcake jujubes. Carrot cake cake donut cheesecake caramels pastry pastry. Macaroon danish liquorice ice cream. Ice cream cake icing sweet roll caramels icing. Tootsie roll danish halvah jujubes. Dessert cupcake fruitcake oat cake halvah.

Lollipop I love tootsie roll sweet roll fruitcake danish dragée fruitcake danish. Lemon drops toffee carrot cake. I love fruitcake dragée brownie. Dessert liquorice cake cake I love. Cake liquorice pudding bear claw croissant muffin chocolate cake chupa chups. Tiramisu jujubes cupcake apple pie tootsie roll sweet roll. Cheesecake wafer brownie. Candy pie ice cream. Chocolate bar ice cream donut fruitcake. Pudding ice cream chocolate muffin candy.

Cake chocolate cake wafer I love tart chupa chups cake bonbon. Macaroon sweet dessert chupa chups marshmallow. Cupcake toffee pastry pie toffee muffin lollipop jelly beans. Pudding donut jelly wafer marshmallow jelly. I love halvah bear claw. Cookie candy cheesecake tart. Cookie I love cheesecake. Lollipop I love macaroon gingerbread toffee I love.

Donut halvah oat cake toffee icing. Cotton candy caramels sesame snaps chocolate cake chupa chups. Bonbon chupa chups croissant. Fruitcake sugar plum candy I love liquorice. I love I love cheesecake marzipan chocolate cake ice cream. Icing brownie gummies chocolate dessert biscuit.`;

const result = new KnuthMorrisPratt(string);
console.log(result.search(test));
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
      if (this.text.charAt(textIdx) === searchText.charAt(wordIdx)) {
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
    const results:[number, number] = [0, 0];
    let prefix = 2;
    let cnd = 0;

    while (prefix < word.length) {
        if (word.charAt(prefix - 1) === word.charAt(cnd)) {
          cnd++;
          results[prefix] = cnd;
          prefix++;
        } else if (cnd === 0) {
          results[prefix] = 0;
          prefix++;
        } else {
          cnd = results[cnd];
        }
    }
    return results;
  }
}

var test = 'abacab';

var string = `abaabbaaabbacagabbahabbahayabacabannabaaakaabaacabaaabacabaabababacababahahabaaahacabaabbaaabbacagabbahabbahayabacabannabaaakaabaacabaaabacabaabababacababahahabaaahacabaabbaaabbacagabbahabbahayabacabannabaaakaabaacabaaabacabaabababacababahahabaaahacabaabbaaabbacagabbahabbahayabacabannabaaakaabaacabaaabacabaabababacababahahabaaahac`;

const result = new KnuthMorrisPratt(string);
console.log(result.search(test));
class KnuthMorrisPratt {
  constructor(private text: string) { }

  public search(searchText: string): number[] {
    if (searchText.length === 0) {
      return [];
    }
    const partialMatchTable = this.buildPartialMatchTable(searchText);
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
        wordIdx = partialMatchTable[wordIdx - 1];
      } else {
        wordIdx = 0;
        textIdx++;
      }
    }
    return results;
  }

  private buildPartialMatchTable(word: string): number[] {
    const results:[number, number] = [0, 0];
    let prefix = 2;
    let current = 0;

    while (prefix < word.length) {
      if (word.charAt(prefix - 1) === word.charAt(current)) {
        current++;
        results[prefix] = current;
        prefix++;
      } else if (current === 0) {
        results[prefix] = 0;
        prefix++;
      } else {
        current = results[current];
      }
    }
    return results;
  }
}

const searchText = `abaabbababacabaaabbacagabba
habbababacabahababacabayabacaababacab
bannabaaakaabaacabaaabacab
aabababacababahahabaaahacabaabbaaabbacaga
bbahabbahayabacabababacabann
abababacabaaababacab
akaabaacabaaabacabaabab
abacababahahabaaahacabaabbaaabbacagabbahabbahay
abacabannabaaakaabaacabaaabacaba`;
const result = new KnuthMorrisPratt(searchText);
console.log(result.search('ababacab'));
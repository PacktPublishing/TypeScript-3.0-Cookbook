class SingleName {
  constructor(public name: string) {}
}

const singleNames: SingleName[] = [];
const duplicateEntry: SingleName = new SingleName("Miguel");
singleNames.push(new SingleName("Jennifer"));
singleNames.push(duplicateEntry);
singleNames.push(new SingleName("James"));
singleNames.push(new SingleName("Fred"));
singleNames.push(duplicateEntry);
singleNames.push(new SingleName("Rich"));
singleNames.push(duplicateEntry);
singleNames.push(new SingleName("Rich"));
singleNames.push(duplicateEntry);
singleNames.push(new SingleName("Rich"));
singleNames.push(duplicateEntry);
singleNames.push(new SingleName("Rich"));
singleNames.push(duplicateEntry);
singleNames.push(new SingleName("Rich"));

const dedupe2 = singleNames.filter(function(item, index) {
  return singleNames.findIndex(searchItem => searchItem.name === item.name) >= index;
});

console.log(dedupe2);

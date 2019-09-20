const items = [ 10, 20, 'SubItem', 22, 18, 14, 'BarclayGamma', 12];
const copy = items.slice(0);

// This extracts the first two items in the array. It has to be
// sliced so that it doesn't extract the items first.
console.log(copy.slice(0).splice(0, 2));

// This returns everything from the second item.
console.log(copy.slice(2));
class Enumerable {
  public static count<T extends any[]>(items: T): number {
    return items.length;
  }
}

const books = [
  {
    category: 'Science fiction', subCategory: 'Humour', books: [
      {name: "Hitchhikers Guide To The Galaxy", language: "English", "pageCount": 142},
      {name: "The Stainless Steel Rat Anthology", language: "English", "pageCount": 468},
      {name: "Hitchhikers Guide To The Galaxy", language: "French", pageCount: 220}
    ]
  },
  {
    category: 'Science fiction', subCategory: 'Classic', books: [
      { name: "Foundation and Empire", language: "English", "pageCount": 225}
    ]
  },
  {
    category: 'Technical', subCategory: 'Programming Books', books: [
      {name: "Advanced TypeScript Programming Projects", language: "German", "pageCount": 420}
  ]
}]

console.log(Enumerable.count(books.filter(book => book.category === 'Science fiction' && book.books.map(inner => inner.language === 'English'))));

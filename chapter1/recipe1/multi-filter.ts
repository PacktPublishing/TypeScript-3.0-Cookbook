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

const filteredBooks = books.reduce((booksArray: any[],book: any) => {
  if (book.category === 'Science fiction' && book.subCategory === 'Humour') {
    const innerFilter = book.books.reduce((inner: any[], filteredBook: any) => {
      if (filteredBook.pageCount > 200) {
        inner.push(filteredBook);
      }
      return inner;
    }, []);
    if (innerFilter.length > 0) {
      const item = { category: book.category, subCategory: book.subCategory, books: innerFilter};
      booksArray.push(item);
    }
  }
  return booksArray;
}, []);

console.log(JSON.stringify(filteredBooks));

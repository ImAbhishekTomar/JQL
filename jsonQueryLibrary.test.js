import { strictEqual } from 'assert';
import { queryJsonWithXPath } from './jsonQueryLibrary.js'; // Replace with the actual path to your library

describe('JSON XPath Query Library', () => {
  const jsonData = {
    book: {
      title: 'Sample Book',
      author: {
        name: 'Abhishek',
        nationality: 'IN',
      },
      pages: 150,
      genre: 'Fiction',
    },
  };

  it('should query JSON data with XPath', () => {
    const xpathQuery = '/book/author/name';
    const result = queryJsonWithXPath(jsonData, xpathQuery);
    strictEqual(result, 'John Doe');
  });

  it('should handle basic XPath queries', () => {
    const xpathQuery = '/book/pages';
    const result = queryJsonWithXPath(jsonData, xpathQuery);
    strictEqual(result, 150);
  });

  it('should handle attribute queries', () => {
    const xpathQuery = '/book/author/@attributes/nationality';
    const result = queryJsonWithXPath(jsonData, xpathQuery);
    strictEqual(result, 'US');
  });

  it('should handle array queries', () => {
    const jsonDataWithArray = {
      books: [
        { title: 'Book 1', author: 'Author 1' },
        { title: 'Book 2', author: 'Author 2' },
      ],
    };
    const xpathQuery = '/books/book[2]/author';
    const result = queryJsonWithXPath(jsonDataWithArray, xpathQuery);
    strictEqual(result, 'Author 2');
  });
});

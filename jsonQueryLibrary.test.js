// import { strictEqual } from 'assert';
// import { queryJsonWithXPath } from './jsonQueryLibrary.js'; // Replace with the actual path to your library

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

  // create unit test for my jsonQueryLibrary.js for all functions
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
});

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

  it('should select specific fields from the result array', () => {
    const data = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 },
    ];
    const query = new JsonQueryLibrary(data).select(['name']);
    const result = query.result;
    const expected = [{ name: 'John' }, { name: 'Jane' }];
    strictEqual(JSON.stringify(result), JSON.stringify(expected));
  });

  it('should filter the result array based on the specified condition', () => {
    const data = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 },
    ];
    const query = new JsonQueryLibrary(data).where((item) => item.age > 25);
    const result = query.result;
    const expected = [{ name: 'Jane', age: 30 }];
    strictEqual(JSON.stringify(result), JSON.stringify(expected));
  });

  it('should sort the result array based on the specified field and order type', () => {
    const data = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 },
    ];
    const query = new JsonQueryLibrary(data).order('age', 'desc');
    const result = query.result;
    const expected = [
      { name: 'Jane', age: 30 },
      { name: 'John', age: 25 },
    ];
    strictEqual(JSON.stringify(result), JSON.stringify(expected));
  });

  it('should limit the number of items in the result array', () => {
    const data = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 },
      { name: 'Bob', age: 35 },
    ];
    const query = new JsonQueryLibrary(data).limit(2);
    const result = query.result;
    const expected = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 },
    ];
    strictEqual(JSON.stringify(result), JSON.stringify(expected));
  });

  it('should skip the specified number of items from the beginning of the result array', () => {
    const data = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 },
      { name: 'Bob', age: 35 },
    ];
    const query = new JsonQueryLibrary(data).skip(1);
    const result = query.result;
    const expected = [
      { name: 'Jane', age: 30 },
      { name: 'Bob', age: 35 },
    ];
    strictEqual(JSON.stringify(result), JSON.stringify(expected));
  });

  it('should take the specified number of items from the beginning of the result array', () => {
    const data = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 },
      { name: 'Bob', age: 35 },
    ];
    const query = new JsonQueryLibrary(data).take(2);
    const result = query.result;
    const expected = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 },
    ];
    strictEqual(JSON.stringify(result), JSON.stringify(expected));
  });

  it('should return the number of items in the result array', () => {
    const data = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 },
    ];
    const query = new JsonQueryLibrary(data);
    const result = query.count();
    const expected = 2;
    strictEqual(result, expected);
  });

  it('should return the minimum value of the specified field in the result array', () => {
    const data = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 },
    ];
    const query = new JsonQueryLibrary(data);
    const result = query.min('age');
    const expected = 25;
    strictEqual(result, expected);
  });

  it('should return the maximum value of the specified field in the result array', () => {
    const data = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 },
    ];
    const query = new JsonQueryLibrary(data);
    const result = query.max('age');
    const expected = 30;
    strictEqual(result, expected);
  });

  it('should return the sum of the values in the specified field for all items in the result array', () => {
    const data = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 },
    ];
    const query = new JsonQueryLibrary(data);
    const result = query.sum('age');
    const expected = 55;
    strictEqual(result, expected);
  });

  it('should round the numeric values in the specified field for all items in the result array', () => {
    const data = [
      { name: 'John', age: 25.4 },
      { name: 'Jane', age: 30.8 },
    ];
    const query = new JsonQueryLibrary(data).round('age');
    const result = query.result;
    const expected = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 31 },
    ];
    strictEqual(JSON.stringify(result), JSON.stringify(expected));
  });

  it('should join the current result array with another data array based on key selectors and a result selector function', () => {
    const data = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ];
    const innerData = [
      { id: 1, age: 25 },
      { id: 2, age: 30 },
    ];
    const query = new JsonQueryLibrary(data).join(
      innerData,
      (outerItem) => outerItem.id,
      (innerItem) => innerItem.id,
      (outerItem, innerItem) => ({ ...outerItem, age: innerItem.age })
    );
    const result = query.result;
    const expected = [
      { id: 1, name: 'John', age: 25 },
      { id: 2, name: 'Jane', age: 30 },
    ];
    strictEqual(JSON.stringify(result), JSON.stringify(expected));
  });

  it('should convert the characters in the specified field for all items in the result array to their ASCII values', () => {
    const data = [
      { name: 'John', firstChar: 'J' },
      { name: 'Jane', firstChar: 'J' },
    ];
    const query = new JsonQueryLibrary(data).ascii('firstChar');
    const result = query.result;
    const expected = [
      { name: 'John', firstChar: 74 },
      { name: 'Jane', firstChar: 74 },
    ];
    strictEqual(JSON.stringify(result), JSON.stringify(expected));
  });

  it('should convert the ASCII value to its corresponding character and assign it to the specified field for all items in the result array', () => {
    const data = [
      { name: 'John', firstChar: 74 },
      { name: 'Jane', firstChar: 74 },
    ];
    const query = new JsonQueryLibrary(data).char(74, 'firstChar');
    const result = query.result;
    const expected = [
      { name: 'John', firstChar: 'J' },
      { name: 'Jane', firstChar: 'J' },
    ];
    strictEqual(JSON.stringify(result), JSON.stringify(expected));
  });

  it('should find the index of the first occurrence of the specified substring in the field for all items in the result array', () => {
    const data = [
      { name: 'John', city: 'New York' },
      { name: 'Jane', city: 'San Francisco' },
    ];
    const query = new JsonQueryLibrary(data).charindex('an', 'city');
    const result = query.result;
    const expected = [
      { name: 'John', city: 1 },
      { name: 'Jane', city: 2 },
    ];
    strictEqual(JSON.stringify(result), JSON.stringify(expected));
  });

  it('should concatenate the specified fields for all items in the result array', () => {
    const data = [
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'Jane', lastName: 'Smith' },
    ];
    const query = new JsonQueryLibrary(data).concat('firstName', 'lastName');
    const result = query.result;
    const expected = [
      { firstName: 'John', lastName: 'Doe', Concatenated: 'JohnDoe' },
      { firstName: 'Jane', lastName: 'Smith', Concatenated: 'JaneSmith' },
    ];
    strictEqual(JSON.stringify(result), JSON.stringify(expected));
  });
});

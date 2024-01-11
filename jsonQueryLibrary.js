/**
 * JsonQueryLibrary - A JavaScript library for querying and manipulating JSON data.
 *
 * @class
 * @param {Array} data - Initial JSON data array to be queried.
 */

class JsonQueryLibrary {
  constructor(data) {
    this.data = data;
    this.result = data;
  }

  /**
   * Selects specific fields from the result array of items.
   * @param {Array} fields - An array of strings representing the fields to be selected.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  select(fields) {
    // Map over each item in the result array
    this.result = this.result.map((item) => {
      // Create a new object to store selected fields for the current item
      const selectedItem = {};

      // Iterate through the specified fields and copy them to the new object
      fields.forEach((field) => {
        selectedItem[field] = item[field];
      });

      // Return the object with selected fields for the current item
      return selectedItem;
    });

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Filters the result array based on the specified condition function.
   * @param {Function} condition - A function that takes an item as its parameter and returns a boolean indicating whether the item should be included in the result.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  where(condition) {
    // Filter the result array based on the specified condition function
    this.result = this.result.filter((item) => condition(item));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Sorts the result array based on the specified field and order type.
   * @param {string} field - The field by which the result array should be sorted.
   * @param {string} [orderType='asc'] - The order type, either 'asc' for ascending or 'desc' for descending (default is 'asc').
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  order(field, orderType = 'asc') {
    // Sort the result array based on the specified field and order type
    this.result.sort((a, b) => {
      if (orderType === 'asc') {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Sorts the result array based on the specified field and order type.
   * @param {string} field - The field by which the result array should be sorted.
   * @param {string} [orderType='asc'] - The order type, either 'asc' for ascending or 'desc' for descending (default is 'asc').
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  order(field, orderType = 'asc') {
    // Sort the result array based on the specified field and order type
    this.result.sort((a, b) => {
      // Use a ternary operator to determine the sorting order
      return orderType === 'asc' ? (a[field] > b[field] ? 1 : -1) : a[field] < b[field] ? 1 : -1;
    });

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Limits the number of items in the result array to the specified count.
   * @param {number} count - The maximum number of items to include in the result array.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  limit(count) {
    // Use the slice method to limit the result array to the specified count
    this.result = this.result.slice(0, count);

    // Return the current instance of the object for method chaining
    return this;
  }
  /**
   * Skips the specified number of items from the beginning of the result array.
   * @param {number} count - The number of items to skip.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  skip(count) {
    // Use the slice method to skip the specified number of items from the beginning of the result array
    this.result = this.result.slice(count);

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Takes the specified number of items from the beginning of the result array. (Alias for the limit method)
   * @param {number} count - The number of items to take.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  take(count) {
    // Use the limit method to take the specified number of items from the beginning of the result array
    return this.limit(count);
  }

  /**
   * Returns the number of items in the result array.
   * @returns {number} - The count of items in the result array.
   */
  count() {
    // Return the length of the result array
    return this.result.length;
  }

  /**
   * Returns the minimum value of the specified field in the result array.
   * @param {string} field - The field for which to find the minimum value.
   * @returns {number} - The minimum value of the specified field.
   */
  min(field) {
    // Use Math.min and the map method to find the minimum value of the specified field in the result array
    return Math.min(...this.result.map((item) => item[field]));
  }

  /**
   * Returns the maximum value of the specified field in the result array.
   * @param {string} field - The field for which to find the maximum value.
   * @returns {number} - The maximum value of the specified field.
   */
  max(field) {
    // Use Math.max and the map method to find the maximum value of the specified field in the result array
    return Math.max(...this.result.map((item) => item[field]));
  }

  /**
   * Returns the sum of the values in the specified field for all items in the result array.
   * @param {string} field - The field for which to calculate the sum.
   * @returns {number} - The sum of the values in the specified field for all items in the result array.
   */
  sum(field) {
    // Use the reduce method to calculate the sum of the values in the specified field for all items in the result array
    return this.result.reduce((acc, item) => acc + item[field], 0);
  }

  /**
   * Rounds the numeric values in the specified field for all items in the result array to the nearest integer.
   * @param {string} field - The field containing the numeric values to be rounded.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  round(field) {
    // Round the numeric values in the specified field for all items in the result array to the nearest integer
    this.result.forEach((item) => {
      item[field] = Math.round(item[field]);
    });

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Joins the current result array with another data array based on key selectors and a result selector function.
   * @param {Array} innerData - The data array to join with the current result array.
   * @param {Function} outerKeySelector - A function that returns the key for items in the current result array.
   * @param {Function} innerKeySelector - A function that returns the key for items in the inner data array.
   * @param {Function} resultSelector - A function that combines matched items from the result and inner arrays.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  join(innerData, outerKeySelector, innerKeySelector, resultSelector) {
    // Create a map for efficient lookup of inner items based on keys
    const innerMap = new Map(innerData.map(innerKeySelector));

    // Perform the join operation and filter out null results
    this.result = this.result
      .map((outerItem) => {
        const innerItem = innerMap.get(outerKeySelector(outerItem));

        if (innerItem) {
          return resultSelector(outerItem, innerItem);
        }

        return null;
      })
      .filter((item) => item !== null);

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Converts the characters in the specified field for all items in the result array to their ASCII values.
   * @param {string} field - The field containing characters to be converted to ASCII values.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  ascii(field) {
    // Convert characters in the specified field for all items in the result array to their ASCII values
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].charCodeAt(0),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Converts the ASCII value to its corresponding character and assigns it to the specified field for all items in the result array.
   * @param {number} asciiValue - The ASCII value to be converted to a character.
   * @param {string} field - The field to which the resulting character should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  char(asciiValue, field) {
    // Convert the ASCII value to its corresponding character and assign it to the specified field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: String.fromCharCode(asciiValue),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Finds the index of the first occurrence of the specified substring in the field for all items in the result array.
   * @param {string} substring - The substring to search for.
   * @param {string} field - The field in which to search for the substring.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  charindex(substring, field) {
    // Find the index of the first occurrence of the specified substring in the field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].indexOf(substring),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Concatenates the specified fields for all items in the result array and adds a new field 'Concatenated' with the combined values.
   * @param {...string} fields - The fields to be concatenated.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  concat(...fields) {
    // Concatenate the specified fields for all items in the result array and add a new field 'Concatenated'
    this.result = this.result.map((item) => ({
      ...item,
      Concatenated: fields.map((field) => item[field]).join(''),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Concatenates the specified fields for all items in the result array using the provided separator and adds a new field 'Concatenated'.
   * @param {string} separator - The separator to be used between concatenated values.
   * @param {...string} fields - The fields to be concatenated.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  concatWithSeparator(separator, ...fields) {
    // Concatenate the specified fields for all items in the result array using the provided separator and add a new field 'Concatenated'
    this.result = this.result.map((item) => ({
      ...item,
      Concatenated: fields.join(separator),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Computes the byte length of the specified field for all items in the result array using UTF-8 encoding.
   * @param {string} field - The field for which to compute the byte length.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  datalength(field) {
    // Compute the byte length of the specified field for all items in the result array using UTF-8 encoding
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Buffer.from(item[field]).length,
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Computes the similarity difference between two strings (Levenshtein distance) and adds a new field with the result.
   * @param {string} str1 - The first string for comparison.
   * @param {string} str2 - The second string for comparison.
   * @param {string} field - The field to store the similarity difference result.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  difference(str1, str2, field) {
    // Compute the similarity difference between two strings for all items in the result array and add a new field with the result
    this.result = this.result.map((item) => ({
      ...item,
      [field]: this.soundsSimilar(str1, str2),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Formats the date values in the specified field for all items in the result array using the provided format and adds a new field.
   * @param {string} value - The field containing date values to be formatted.
   * @param {object} format - The format options for the Intl.DateTimeFormat constructor.
   * @param {string} field - The field to store the formatted date values.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  format(value, format, field) {
    // Format the date values in the specified field for all items in the result array and add a new field with the formatted values
    this.result = this.result.map((item) => ({
      ...item,
      [field]: new Intl.DateTimeFormat('en-US', format).format(item[value]),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Extracts a substring from the specified field for all items in the result array, starting from the beginning and with the specified length.
   * @param {string} field - The field containing the original string.
   * @param {number} length - The length of the substring to extract.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  left(field, length) {
    // Extract a substring from the specified field for all items in the result array and add a new field with the result
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].slice(0, length),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Computes the length of the specified field for all items in the result array and adds a new field 'Length' with the result.
   * @param {string} field - The field for which to compute the length.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  len(field) {
    // Compute the length of the specified field for all items in the result array and add a new field 'Length' with the result
    this.result = this.result.map((item) => ({
      ...item,
      Length: item[field].length,
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Converts the characters in the specified field for all items in the result array to lowercase.
   * @param {string} field - The field containing characters to be converted to lowercase.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  lower(field) {
    // Convert characters in the specified field for all items in the result array to lowercase
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].toLowerCase(),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Trims leading whitespaces from the characters in the specified field for all items in the result array.
   * @param {string} field - The field containing characters to be trimmed.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  ltrim(field) {
    // Trim leading whitespaces from the characters in the specified field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].replace(/^\s+/, ''),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Converts the specified Unicode value to its corresponding character and assigns it to the specified field for all items in the result array.
   * @param {number} unicodeValue - The Unicode value to be converted to a character.
   * @param {string} field - The field to which the resulting character should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  nchar(unicodeValue, field) {
    // Convert the specified Unicode value to its corresponding character and assign it to the specified field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: String.fromCodePoint(unicodeValue),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Finds the index of the first occurrence of the specified pattern in the field for all items in the result array.
   * @param {string} pattern - The pattern to search for using a regular expression.
   * @param {string} field - The field in which to search for the pattern.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  patindex(pattern, field) {
    // Find the index of the first occurrence of the specified pattern in the field for all items in the result array
    const regex = new RegExp(pattern);
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].search(regex),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Encloses the characters in the specified field with double quotes for all items in the result array.
   * @param {string} str - The field containing characters to be enclosed with double quotes.
   * @param {string} field - The field to which the enclosed characters should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  quotename(str, field) {
    // Enclose the characters in the specified field with double quotes for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: `"${item[str]}"`,
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Replaces occurrences of a specified substring with another string in the specified field for all items in the result array.
   * @param {string} find - The substring to search for.
   * @param {string} replace - The string to replace occurrences of the substring.
   * @param {string} field - The field in which to perform the replacement.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  replace(find, replace, field) {
    // Replace occurrences of the specified substring with another string in the field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].replace(new RegExp(find, 'g'), replace),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Replicates the characters in the specified field for all items in the result array a specified number of times.
   * @param {string} field - The field containing characters to be replicated.
   * @param {number} count - The number of times to replicate the characters.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  replicate(field, count) {
    // Replicate the characters in the specified field for all items in the result array a specified number of times
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].repeat(count),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Reverses the characters in the specified field for all items in the result array.
   * @param {string} field - The field containing characters to be reversed.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  reverse(field) {
    // Reverse the characters in the specified field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].split('').reverse().join(''),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Extracts a substring from the end of the characters in the specified field for all items in the result array.
   * @param {string} field - The field containing the original string.
   * @param {number} length - The length of the substring to extract from the end.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  right(field, length) {
    // Extract a substring from the end of the characters in the specified field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].slice(-length),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Trims trailing whitespaces from the characters in the specified field for all items in the result array.
   * @param {string} field - The field containing characters to be trimmed.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  rtrim(field) {
    // Trim trailing whitespaces from the characters in the specified field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].replace(/\s+$/, ''),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Generates a string consisting of a specified number of spaces and assigns it to the specified field for all items in the result array.
   * @param {number} count - The number of spaces to generate.
   * @param {string} field - The field to which the generated spaces should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  space(count, field) {
    // Generate a string consisting of a specified number of spaces and assign it to the specified field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: ' '.repeat(count),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Converts the values in the specified field for all items in the result array to strings.
   * @param {string} value - The field containing values to be converted to strings.
   * @param {string} field - The field to which the converted strings should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  str(value, field) {
    // Convert the values in the specified field for all items in the result array to strings
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[value].toString(),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Replaces a portion of the characters in the specified field for all items in the result array with another string.
   * @param {string} field - The field containing the original string.
   * @param {number} start - The starting position from which to replace characters.
   * @param {number} length - The length of the portion to replace.
   * @param {string} replaceWith - The string to replace the specified portion.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  stuff(field, start, length, replaceWith) {
    // Replace a portion of the characters in the specified field for all items in the result array with another string
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].substring(0, start) + replaceWith + item[field].substring(start + length),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Extracts a substring from the characters in the specified field for all items in the result array.
   * @param {string} field - The field containing the original string.
   * @param {number} start - The starting position from which to extract characters.
   * @param {number} length - The length of the substring to extract.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  substring(field, start, length) {
    // Extract a substring from the characters in the specified field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].substring(start, start + length),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Translates characters in the specified field for all items in the result array based on the provided mapping.
   * @param {string} field - The field containing characters to be translated.
   * @param {string} fromChars - The characters to be replaced.
   * @param {string} toChars - The replacement characters.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  translate(field, fromChars, toChars) {
    // Create a translation map based on the provided fromChars and toChars
    const translationMap = this.createTranslationMap(fromChars, toChars);

    // Translate characters in the specified field for all items in the result array using the created translation map
    this.result = this.result.map((item) => ({
      ...item,
      [field]: this.translateString(item[field], translationMap),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Trims leading and trailing whitespaces from the characters in the specified field for all items in the result array.
   * @param {string} field - The field containing characters to be trimmed.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  trim(field) {
    // Trim leading and trailing whitespaces from the characters in the specified field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].trim(),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Converts the first character in the specified field for all items in the result array to its Unicode value.
   * @param {string} field - The field containing the character to be converted.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  unicode(field) {
    // Converts the first character in the specified field for all items in the result array to its Unicode value
    this.result = this.result.map((item) => ({
      ...item,
      UnicodeValue: item[field].charCodeAt(0),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Converts the characters in the specified field for all items in the result array to uppercase.
   * @param {string} field - The field containing characters to be converted to uppercase.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  upper(field) {
    // Convert characters in the specified field for all items in the result array to uppercase
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].toUpperCase(),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Creates a translation map based on the provided fromChars and toChars.
   * @param {string} fromChars - The characters to be replaced.
   * @param {string} toChars - The replacement characters.
   * @returns {Object} - Returns the created translation map.
   */
  createTranslationMap(fromChars, toChars) {
    // Create a translation map based on the provided fromChars and toChars
    const translationMap = {};
    for (let i = 0; i < fromChars.length; i++) {
      translationMap[fromChars.charAt(i)] = toChars.charAt(i) || '';
    }
    return translationMap;
  }

  /**
   * Translates a string based on the provided translation map.
   * @param {string} str - The string to be translated.
   * @param {Object} translationMap - The translation map.
   * @returns {string} - Returns the translated string.
   */
  translateString(str, translationMap) {
    // Translate the string based on the provided translation map
    return str.replace(/./g, (char) => translationMap[char]);
  }

  /**
   * Computes the absolute value of the numeric values in the specified field for all items in the result array.
   * @param {string} field - The field containing numeric values.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  abs(field) {
    // Compute the absolute value of the numeric values in the specified field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.abs(item[field]),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Computes the arccosine (inverse cosine) of the numeric values in the specified field for all items in the result array.
   * @param {string} field - The field containing numeric values.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  acos(field) {
    // Compute the arccosine (inverse cosine) of the numeric values in the specified field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.acos(item[field]),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Computes the arcsine (inverse sine) of the numeric values in the specified field for all items in the result array.
   * @param {string} field - The field containing numeric values.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  asin(field) {
    // Compute the arcsine (inverse sine) of the numeric values in the specified field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.asin(item[field]),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Computes the arctangent (inverse tangent) of the numeric values in the specified field for all items in the result array.
   * @param {string} field - The field containing numeric values.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  atan(field) {
    // Compute the arctangent (inverse tangent) of the numeric values in the specified field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.atan(item[field]),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Computes the arctangent of the quotient of its arguments, where the arguments are the numeric values in the specified yField and xField for all items in the result array.
   * @param {string} yField - The field containing the numerator (y-coordinate) values.
   * @param {string} xField - The field containing the denominator (x-coordinate) values.
   * @param {string} resultField - The field to which the computed arctangent values should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  atan2(yField, xField, resultField) {
    // Compute the arctangent of the quotient of its arguments for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: Math.atan2(item[yField], item[xField]),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Computes the average of the numeric values in the specified field for all items in the result array.
   * @param {string} field - The field containing numeric values.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  avg(field) {
    // Compute the sum of the numeric values in the specified field
    const sum = this.result.reduce((acc, item) => acc + item[field], 0);

    // Compute the average of the numeric values
    const average = sum / this.result.length;

    // Update the result array to include the computed average
    this.result = [{ Average: average }];

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Rounds up the numeric values in the specified field to the nearest integer greater than or equal to the original values.
   * @param {string} field - The field containing numeric values.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  ceiling(field) {
    // Round up the numeric values in the specified field to the nearest integer greater than or equal to the original values
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.ceil(item[field]),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Counts the number of items in the result array and assigns the count to the specified field.
   * @param {string} field - The field to which the count should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  count(field) {
    // Count the number of items in the result array
    const count = this.result.length;

    // Update the result array to include the count
    this.result = [{ [field]: count }];

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Computes the cosine of the numeric values in the specified field for all items in the result array.
   * @param {string} field - The field containing numeric values.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  cos(field) {
    // Compute the cosine of the numeric values in the specified field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.cos(item[field]),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Computes the cotangent of the numeric values in the specified field for all items in the result array.
   * @param {string} field - The field containing numeric values.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  cot(field) {
    // Compute the cotangent of the numeric values in the specified field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: 1 / Math.tan(item[field]),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Converts the numeric values in the specified field from radians to degrees for all items in the result array.
   * @param {string} field - The field containing numeric values in radians.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  degrees(field) {
    // Convert the numeric values in the specified field from radians to degrees for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: (180 / Math.PI) * item[field],
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Computes the exponential value (e^x) of the numeric values in the specified field for all items in the result array.
   * @param {string} field - The field containing numeric values.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  exp(field) {
    // Compute the exponential value (e^x) of the numeric values in the specified field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.exp(item[field]),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Rounds down the numeric values in the specified field to the nearest integer less than or equal to the original values.
   * @param {string} field - The field containing numeric values.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  floor(field) {
    // Round down the numeric values in the specified field to the nearest integer less than or equal to the original values
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.floor(item[field]),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Computes the logarithm of the numeric values in the specified field with a specified base for all items in the result array.
   * @param {string} field - The field containing numeric values.
   * @param {number} base - The base of the logarithm (default is Math.E).
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  log(field, base = Math.E) {
    // Compute the logarithm of the numeric values in the specified field with a specified base for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.log(item[field]) / Math.log(base),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Computes the logarithm base 10 of the numeric values in the specified field for all items in the result array.
   * @param {string} field - The field containing numeric values.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  log10(field) {
    // Use log method to compute the logarithm base 10 of the numeric values in the specified field for all items in the result array
    return this.log(field, 10);
  }

  /**
   * Finds the maximum numeric value in the specified field and updates the result array to include the maximum value.
   * @param {string} field - The field containing numeric values.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  max(field) {
    // Find the maximum numeric value in the specified field
    const maxValue = Math.max(...this.result.map((item) => item[field]));

    // Update the result array to include the maximum value
    this.result = [{ [field]: maxValue }];

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Finds the minimum numeric value in the specified field and updates the result array to include the minimum value.
   * @param {string} field - The field containing numeric values.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  min(field) {
    // Find the minimum numeric value in the specified field
    const minValue = Math.min(...this.result.map((item) => item[field]));

    // Update the result array to include the minimum value
    this.result = [{ [field]: minValue }];

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Updates the result array to include the value of mathematical constant Pi (π).
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  pi() {
    // Update the result array to include the value of mathematical constant Pi (π)
    this.result = [{ PI: Math.PI }];

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Computes the result of raising the numeric values in the specified baseField to the power of the numeric values in the specified exponentField for all items in the result array.
   * @param {string} baseField - The field containing base values.
   * @param {string} exponentField - The field containing exponent values.
   * @param {string} resultField - The field to which the computed power values should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  power(baseField, exponentField, resultField) {
    // Compute the result of raising the numeric values in the specified baseField to the power of the numeric values in the specified exponentField for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: Math.pow(item[baseField], item[exponentField]),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Converts the numeric values in the specified field from degrees to radians for all items in the result array.
   * @param {string} field - The field containing numeric values in degrees.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  radians(field) {
    // Convert the numeric values in the specified field from degrees to radians for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: (Math.PI / 180) * item[field],
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Generates random numeric values between 0 (inclusive) and 1 (exclusive) for the specified field for all items in the result array.
   * @param {string} field - The field to which the generated random values should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  rand(field) {
    // Generate random numeric values between 0 (inclusive) and 1 (exclusive) for the specified field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.random(),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Rounds the numeric values in the specified field to the specified number of decimal places for all items in the result array.
   * @param {string} field - The field containing numeric values.
   * @param {number} decimalPlaces - The number of decimal places to round to (default is 0).
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  round(field, decimalPlaces = 0) {
    // Round the numeric values in the specified field to the specified number of decimal places for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: +item[field].toFixed(decimalPlaces),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Determines the sign of the numeric values in the specified field for all items in the result array.
   * @param {string} field - The field containing numeric values.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  sign(field) {
    // Determine the sign of the numeric values in the specified field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.sign(item[field]),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Computes the sine of the numeric values in the specified field for all items in the result array.
   * @param {string} field - The field containing numeric values.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  sin(field) {
    // Compute the sine of the numeric values in the specified field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.sin(item[field]),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Computes the square root of the numeric values in the specified field for all items in the result array.
   * @param {string} field - The field containing numeric values.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  sqrt(field) {
    // Compute the square root of the numeric values in the specified field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.sqrt(item[field]),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Computes the square of the numeric values in the specified field for all items in the result array.
   * @param {string} field - The field containing numeric values.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  square(field) {
    // Compute the square of the numeric values in the specified field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.pow(item[field], 2),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Computes the sum of the numeric values in the specified field for all items in the result array.
   * @param {string} field - The field containing numeric values.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  sum(field) {
    // Compute the sum of the numeric values in the specified field for all items in the result array
    const sumValue = this.result.reduce((acc, item) => acc + item[field], 0);

    // Update the result array to include the sum
    this.result = [{ [field]: sumValue }];

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Computes the tangent of the numeric values in the specified field for all items in the result array.
   * @param {string} field - The field containing numeric values.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  tan(field) {
    // Compute the tangent of the numeric values in the specified field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.tan(item[field]),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Updates the result array to include the current timestamp for the specified field for all items.
   * @param {string} field - The field to which the current timestamp should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  currentTimestamp(field) {
    // Update the result array to include the current timestamp for the specified field for all items
    this.result = this.result.map((item) => ({
      ...item,
      [field]: new Date().toISOString(),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Adds a specified number of intervals (years, quarters, months, days, hours, minutes, seconds) to the date values in the specified dateField for all items in the result array.
   * @param {string} interval - The interval to add (year, quarter, month, day, hour, minute, second).
   * @param {number} number - The number of intervals to add.
   * @param {string} dateField - The field containing date values.
   * @param {string} resultField - The field to which the resulting date values should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  dateAdd(interval, number, dateField, resultField) {
    // Map intervals to corresponding date methods
    const intervals = {
      year: 'FullYear',
      quarter: 'Month',
      month: 'Month',
      day: 'Date',
      hour: 'Hours',
      minute: 'Minutes',
      second: 'Seconds',
    };

    // Add the specified number of intervals to the date values in the specified dateField for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: new Date(item[dateField]).set(intervals[interval], item[dateField].get(intervals[interval]) + number),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Computes the difference in specified intervals (years, quarters, months, days, hours, minutes, seconds) between the date values in the specified startDateField and endDateField for all items in the result array.
   * @param {string} interval - The interval for the difference calculation (year, quarter, month, day, hour, minute, second).
   * @param {string} startDateField - The field containing start date values.
   * @param {string} endDateField - The field containing end date values.
   * @param {string} resultField - The field to which the resulting difference should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  dateDiff(interval, startDateField, endDateField, resultField) {
    // Define milliseconds in various intervals
    const intervals = {
      year: 31536000000, // milliseconds in a year
      quarter: 7776000000, // milliseconds in a quarter year
      month: 2592000000, // milliseconds in a month
      day: 86400000, // milliseconds in a day
      hour: 3600000, // milliseconds in an hour
      minute: 60000, // milliseconds in a minute
      second: 1000, // milliseconds in a second
    };

    // Compute the difference in specified intervals between the date values in the specified startDateField and endDateField for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: Math.round((new Date(item[endDateField]) - new Date(item[startDateField])) / intervals[interval]),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Creates date values based on the year, month, and day values in the specified fields for all items in the result array.
   * @param {string} yearField - The field containing year values.
   * @param {string} monthField - The field containing month values.
   * @param {string} dayField - The field containing day values.
   * @param {string} resultField - The field to which the resulting date values should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  dateFromParts(yearField, monthField, dayField, resultField) {
    // Create date values based on the year, month, and day values in the specified fields for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: new Date(item[yearField], item[monthField] - 1, item[dayField]).toISOString(),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Retrieves specific components (year, quarter, month, day, hour, minute, second) of the date values in the specified dateField for all items in the result array.
   * @param {string} datePart - The date part to retrieve (year, quarter, month, day, hour, minute, second).
   * @param {string} dateField - The field containing date values.
   * @param {string} resultField - The field to which the retrieved date parts should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  dateName(datePart, dateField, resultField) {
    // Map date parts to corresponding date methods
    const datePartMap = {
      year: 'getFullYear',
      quarter: 'getMonth',
      month: 'getMonth',
      day: 'getDate',
      hour: 'getHours',
      minute: 'getMinutes',
      second: 'getSeconds',
    };

    // Retrieve specific components of the date values in the specified dateField for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: new Date(item[dateField])[datePartMap[datePart]](),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Retrieves specific components (year, quarter, month, day, hour, minute, second) of the date values in the specified dateField for all items in the result array.
   * @param {string} datePart - The date part to retrieve (year, quarter, month, day, hour, minute, second).
   * @param {string} dateField - The field containing date values.
   * @param {string} resultField - The field to which the retrieved date parts should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  datePart(datePart, dateField, resultField) {
    // Map date parts to corresponding date methods
    const datePartMap = {
      year: 'getFullYear',
      quarter: 'getMonth',
      month: 'getMonth',
      day: 'getDate',
      hour: 'getHours',
      minute: 'getMinutes',
      second: 'getSeconds',
    };

    // Retrieve specific components of the date values in the specified dateField for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: new Date(item[dateField])[datePartMap[datePart]]() + 1, // Months are 0-indexed
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Retrieves the day component of the date values in the specified dateField for all items in the result array.
   * @param {string} dateField - The field containing date values.
   * @param {string} resultField - The field to which the retrieved day values should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  day(dateField, resultField) {
    // Retrieve the day component of the date values in the specified dateField for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: new Date(item[dateField]).getDate(),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Retrieves the current date for the specified field for all items in the result array.
   * @param {string} field - The field to which the current date should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  getDate(field) {
    // Retrieve the current date for the specified field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: new Date().toISOString(),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Retrieves the current UTC date for the specified field for all items in the result array.
   * @param {string} field - The field to which the current UTC date should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  getUTCDate(field) {
    // Retrieve the current UTC date for the specified field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [field]: new Date().toISOString(),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Determines whether the values in the specified dateField are valid date values for all items in the result array.
   * @param {string} dateField - The field containing date values.
   * @param {string} resultField - The field to which the result of the validation should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  isDate(dateField, resultField) {
    // Determine whether the values in the specified dateField are valid date values for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: Number(!isNaN(new Date(item[dateField]))),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Retrieves the month component of the date values in the specified dateField for all items in the result array.
   * @param {string} dateField - The field containing date values.
   * @param {string} resultField - The field to which the retrieved month values should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  month(dateField, resultField) {
    // Retrieve the month component of the date values in the specified dateField for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: new Date(item[dateField]).getMonth() + 1, // Months are 0-indexed
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Retrieves the current system date and time for the specified field for all items in the result array.
   * @param {string} resultField - The field to which the current system date and time should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  sysDateTime(resultField) {
    // Retrieve the current system date and time for the specified field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: new Date().toISOString(),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Retrieves the year component of the date values in the specified dateField for all items in the result array.
   * @param {string} dateField - The field containing date values.
   * @param {string} resultField - The field to which the retrieved year values should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  year(dateField, resultField) {
    // Retrieve the year component of the date values in the specified dateField for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: new Date(item[dateField]).getFullYear(),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Converts the value in the specified valueField to the target data type for all items in the result array.
   * @param {string} valueField - The field containing the values to be converted.
   * @param {string} targetType - The target data type to which the values should be converted.
   * @param {string} resultField - The field to which the converted values should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  cast(valueField, targetType, resultField) {
    // Convert the value in the specified valueField to the target data type for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: this.castValue(item[valueField], targetType),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Returns the first non-null value from the specified fields for all items in the result array.
   * @param {...string} fields - The fields from which to retrieve values.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  coalesce(...fields) {
    // Return the first non-null value from the specified fields for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      CoalesceResult: fields.reduce((acc, field) => (acc !== null ? acc : item[field]), null),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Converts the value in the specified valueField to the target data type for all items in the result array.
   * @param {string} valueField - The field containing the values to be converted.
   * @param {string} targetType - The target data type to which the values should be converted.
   * @param {string} resultField - The field to which the converted values should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  convert(valueField, targetType, resultField) {
    // Convert the value in the specified valueField to the target data type for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: this.castValue(item[valueField], targetType),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Retrieves the username of the current user for the specified field for all items in the result array.
   * @param {string} resultField - The field to which the current user's username should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  current_user(resultField) {
    // Retrieve the username of the current user for the specified field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: 'CurrentUserName',
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Returns either the trueValueField or falseValueField based on the conditionField for all items in the result array.
   * @param {string} conditionField - The field containing the condition.
   * @param {string} trueValueField - The field containing the value to return when the condition is true.
   * @param {string} falseValueField - The field containing the value to return when the condition is false.
   * @param {string} resultField - The field to which the result should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  iif(conditionField, trueValueField, falseValueField, resultField) {
    // Return either the trueValueField or falseValueField based on the conditionField for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: item[conditionField] ? item[trueValueField] : item[falseValueField],
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Replaces null values in the specified valueField with the replacementValue for all items in the result array.
   * @param {string} valueField - The field containing the values to be checked for null.
   * @param {*} replacementValue - The value to use as a replacement for null.
   * @param {string} resultField - The field to which the replaced values should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  isnull(valueField, replacementValue, resultField) {
    // Replace null values in the specified valueField with the replacementValue for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: item[valueField] !== null ? item[valueField] : replacementValue,
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Checks whether the values in the specified valueField are numeric for all items in the result array.
   * @param {string} valueField - The field containing the values to be checked for numeric.
   * @param {string} resultField - The field to which the result of the numeric check should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  isnumeric(valueField, resultField) {
    // Checks whether the values in the specified valueField are numeric for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: this.isNumeric(item[valueField]),
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Returns null if the values in the specified valueField are equal to the comparisonValue for all items in the result array.
   * @param {string} valueField - The field containing the values to be compared.
   * @param {*} comparisonValue - The value to compare against.
   * @param {string} resultField - The field to which the result should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  nullif(valueField, comparisonValue, resultField) {
    // Return null if the values in the specified valueField are equal to the comparisonValue for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: item[valueField] === comparisonValue ? null : item[valueField],
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Retrieves the session user name and assigns it to the specified result field for all items in the result array.
   * @param {string} resultField - The field to which the session user name should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  session_user(resultField) {
    // Retrieve the session user name and assign it to the specified result field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: 'SessionUserName',
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Retrieves session properties and assigns the result to the specified field for all items in the result array.
   * @param {string} option - The session property option.
   * @param {string} resultField - The field to which the session property result should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  sessionproperty(option, resultField) {
    // Retrieve session properties and assign the result to the specified field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: 'SessionPropertyResult',
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Retrieves the system user name and assigns it to the specified result field for all items in the result array.
   * @param {string} resultField - The field to which the system user name should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  system_user(resultField) {
    // Retrieve the system user name and assign it to the specified result field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: 'SystemUserName',
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Retrieves the database user name based on the specified user ID field and assigns it to the specified result field for all items in the result array.
   * @param {string} userIdField - The field containing user ID values.
   * @param {string} resultField - The field to which the database user name should be assigned.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  user_name(userIdField, resultField) {
    // Retrieve the database user name based on the specified user ID field and assign it to the specified result field for all items in the result array
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: 'DatabaseUserName',
    }));

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Adds a new object to the result array.
   * @param {Object} newObject - The new object to add.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  addObject(newObject) {
    // Add a new object to the result array
    this.result = [...this.result, newObject];

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Removes items from the result array based on a specified condition.
   * @param {string} conditionField - The field to use for the condition.
   * @param {*} conditionValue - The value to compare against in the condition.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  removeObject(conditionField, conditionValue) {
    // Remove items from the result array based on a specified condition
    this.result = this.result.filter((item) => item[conditionField] !== conditionValue);

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Updates items in the result array based on a specified condition and a set of fields to update.
   * @param {string} conditionField - The field to use for the condition.
   * @param {*} conditionValue - The value to compare against in the condition.
   * @param {Object} updateFields - The fields to update for items meeting the condition.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  updateObject(conditionField, conditionValue, updateFields) {
    // Update items in the result array based on a specified condition and a set of fields to update
    this.result = this.result.map((item) => {
      if (item[conditionField] === conditionValue) {
        return { ...item, ...updateFields };
      }
      return item;
    });

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Combines the result array with another array (union).
   * @param {Array} otherData - The array to combine with the current result array.
   * @returns {Object} - Returns the current instance of the object for method chaining.
   */
  union(otherData) {
    // Combine the result array with another array (union)
    this.result = [...this.result, ...otherData];

    // Return the current instance of the object for method chaining
    return this;
  }

  /**
   * Retrieves data from JSON based on a JSON path.
   * @param {Object} jsonData - The JSON data.
   * @param {string} jsonPath - The JSON path to retrieve data.
   * @returns {*} - Returns the data specified by the JSON path.
   */
  queryJsonWithJsonPath(jsonData, jsonPath) {
    // Split the JSON path into segments
    const segments = jsonPath.split('.');
    let result = [jsonData];

    // Iterate through each segment and retrieve the corresponding data
    for (const segment of segments) {
      // Handle arrays in the result
      if (Array.isArray(result)) {
        const newResult = [];
        for (const item of result) {
          if (item && typeof item === 'object') {
            // Push array items or specific property values to the new result
            if (Array.isArray(item[segment])) {
              newResult.push(...item[segment]);
            } else if (item[segment] !== undefined) {
              newResult.push(item[segment]);
            }
          }
        }
        result = newResult;
      } else {
        // Handle non-array result and retrieve the property value
        result = result[segment];
      }
    }

    return result;
  }

  /**
   * Filters data based on a specified condition.
   * @param {Array} data - The data array to filter.
   * @param {Function} condition - The filtering condition function.
   * @returns {Array} - Returns the filtered data array.
   */
  having(data, condition) {
    // Filter the data array based on the specified condition
    return data.filter(condition);
  }

  /**
   * Converts JSON data to an HTML table.
   * @param {Array} jsonData - The JSON data array.
   * @returns {string} - Returns an HTML table representation of the JSON data.
   */
  jsonToHtmlTable(jsonData) {
    // Check if jsonData is valid and not empty
    if (!jsonData || !Array.isArray(jsonData) || jsonData.length === 0) {
      return '<p>No data available</p>';
    }

    // Extract headers from the first object in the array
    const headers = Object.keys(jsonData[0]);

    // Create HTML table header
    const tableHeader = `<thead><tr>${headers.map((header) => `<th>${header}</th>`).join('')}</tr></thead>`;

    // Create HTML table body with rows and cells
    const tableBody = `<tbody>${jsonData.map((row) => `<tr>${headers.map((header) => `<td>${row[header]}</td>`).join('')}</tr>`).join('')}</tbody>`;

    // Combine the header and body to create the HTML table
    const htmlTable = `<table>${tableHeader}${tableBody}</table>`;

    return htmlTable;
  }

  /**
   * Converts JSON data to XML format.
   * @param {Object} jsonData - The JSON data to convert to XML.
   * @returns {string} - Returns the XML representation of the JSON data.
   */
  jsonToXml(jsonData) {
    /**
     * Converts JSON-like structure to XML.
     * @param {Object} json - The JSON-like structure.
     * @returns {string} - Returns the XML string.
     */
    const jsonToXml = (json) => {
      let xml = '';
      for (const key in json) {
        if (json.hasOwnProperty(key)) {
          xml += `<${key}>${typeof json[key] === 'object' ? jsonToXml(json[key]) : json[key]}</${key}>`;
        }
      }
      return xml;
    };

    return jsonToXml(jsonData);
  }

  /**
   * Converts XML data to JSON format.
   * @param {Node} xml - The XML node to convert to JSON.
   * @returns {Object} - Returns the JSON representation of the XML data.
   */
  xmlToJson(xml) {
    /**
     * Converts XML node to JSON.
     * @param {Node} xml - The XML node.
     * @returns {Object} - Returns the JSON object.
     */
    const xmlToJson = (xml) => {
      let obj = {};
      if (xml.nodeType === 1) {
        if (xml.attributes.length > 0) {
          obj['@attributes'] = {};
          for (let j = 0; j < xml.attributes.length; j++) {
            const attribute = xml.attributes.item(j);
            obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
          }
        }
      } else if (xml.nodeType === 3) {
        obj = xml.nodeValue;
      }
      if (xml.hasChildNodes()) {
        for (let i = 0; i < xml.childNodes.length; i++) {
          const item = xml.childNodes.item(i);
          const nodeName = item.nodeName;
          if (typeof obj[nodeName] === 'undefined') {
            obj[nodeName] = xmlToJson(item);
          } else {
            if (typeof obj[nodeName].push === 'undefined') {
              const old = obj[nodeName];
              obj[nodeName] = [];
              obj[nodeName].push(old);
            }
            obj[nodeName].push(xmlToJson(item));
          }
        }
      }
      return obj;
    };

    return xmlToJson(xml);
  }

  /**
   * Converts JSON data to Avro format based on a specified Avro schema.
   * @param {Object} jsonData - The JSON data to convert to Avro format.
   * @param {string} avroSchema - The Avro schema to use for conversion.
   * @returns {Buffer} - Returns the Avro-formatted Buffer.
   */
  jsonToAvro(jsonData, avroSchema) {
    // Parse the Avro schema using the avsc library
    const type = avsc.parse(avroSchema);
    // Convert JSON data to Avro format and return the resulting Buffer
    const avroBuffer = type.toBuffer(jsonData);
    return avroBuffer;
  }

  /**
   * Queries JSON data using XPath.
   * @param {Object} jsonData - The JSON data to query.
   * @param {string} xpathQuery - The XPath query to apply.
   * @returns {*} - Returns the result of the XPath query on the JSON data.
   */
  queryJsonWithXPath(jsonData, xpathQuery) {
    // Convert JSON data to XML-like structure
    const xmlData = jsonToXml(jsonData);

    // Use DOMParser to parse the XML-like structure
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'application/xml');

    // Use XPath to query the parsed XML
    const result = xmlDoc.evaluate(xpathQuery, xmlDoc, null, XPathResult.ANY_TYPE, null);

    // Return the result based on XPath type
    switch (result.resultType) {
      case XPathResult.NUMBER_TYPE:
        return result.numberValue;
      case XPathResult.STRING_TYPE:
        return result.stringValue;
      case XPathResult.BOOLEAN_TYPE:
        return result.booleanValue;
      case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
        const nodes = [];
        let node = result.iterateNext();
        while (node) {
          nodes.push(xmlToJson(node));
          node = result.iterateNext();
        }
        return nodes;
      default:
        return null;
    }
  }

  /**
   * Gets the result of the current chain of operations.
   * @returns {Array} - Returns the current result.
   */
  getResult() {
    return this.result;
  }
}
// Example of using a JSON query library to perform operations on JSON data

// Select items with 'id' and 'name', where age is greater than 25, order by 'name' in ascending order,
// skip the first item, take the next two items, and get the result
queryResult = queryLibrary
  .select(['id', 'name'])
  .where((item) => item.age > 25)
  .order('name', 'asc')
  .skip(1)
  .take(2)
  .getResult();

console.log(queryResult);

// Calculate the minimum age in the jsonData array
const minAge = new JsonQueryLibrary(jsonData).min('age');
console.log(minAge);

// Calculate the maximum age in the jsonData array
const maxAge = new JsonQueryLibrary(jsonData).max('age');
console.log(maxAge);

// Calculate the sum of ages in the jsonData array
const sumOfAges = new JsonQueryLibrary(jsonData).sum('age');
console.log(sumOfAges);

// Round the 'age' field for each item in the jsonData array and get the result
const roundedAges = new JsonQueryLibrary(jsonData).round('age').getResult();
console.log(roundedAges);

// Data for performing a join operation
const postsData = [
  { ID: 1, Title: 'Post 1' },
  { ID: 2, Title: 'Post 2' },
];

const postMetasData = [
  { Post_ID: 1, Meta: 'Meta 1' },
  { Post_ID: 2, Meta: 'Meta 2' },
];

// Join 'postsData' and 'postMetasData' based on the ID and Post_ID fields and get the result
let queryResult = new JsonQueryLibrary(postsData)
  .join(
    postMetasData,
    (post) => post.ID,
    (meta) => meta.Post_ID,
    (post, meta) => ({ Post: post, Meta: meta })
  )
  .getResult();

console.log(queryResult);

// Update the jsonData array with a new set of data
jsonData = [
  { ID: 1, Name: 'Abhishek', Age: 30 },
  { ID: 2, Name: 'Jane Smith', Age: 25 },
];

queryResult = new JsonQueryLibrary(jsonData)
  .select(['ID', 'Name'])
  .concat('ID', 'Name')
  .datalength('Name')
  .difference('John', 'Jon', 'NameDifference')
  .format('Age', { year: 'numeric', month: 'long', day: 'numeric' }, 'FormattedAge')
  .len('Name')
  .lower('Name')
  .ltrim('Name')
  .nchar(65, 'A')
  .patindex('Sm', 'Name')
  .quotename('Name', 'QuotedName')
  .replace('John', 'Jon', 'Name')
  .replicate('Name', 2)
  .reverse('Name')
  .right('Name', 3)
  .rtrim('Name')
  .soundsSimilar('John', 'Jon')
  .space(5, 'SpaceString')
  .str('Age', 'AgeAsString')
  .stuff('Name', 5, 2, 'X')
  .substring('Name', 1, 3)
  .translate('Name', 'aeiou', 'AEIOU')
  .trim('Name')
  .unicode('Name')
  .upper('Name')
  .getResult();

console.log(queryResult);

jsonData = [
  { ID: 1, Value: 5 },
  { ID: 2, Value: 8 },
  { ID: 3, Value: 3 },
];

queryResult = new JsonQueryLibrary(jsonData)
  .abs('Value')
  .acos('Value')
  .asin('Value')
  .atan('Value')
  .atan2('Value', 1, 'Atan2Result')
  .avg('Value')
  .ceiling('Value')
  .count('RowCount')
  .cos('Value')
  .cot('Value')
  .degrees('ValueInDegrees')
  .exp('Value')
  .floor('Value')
  .log('Value')
  .log10('Value')
  .max('Value')
  .min('Value')
  .pi()
  .power('Value', 2, 'PowerResult')
  .radians('Value')
  .rand('RandomValue')
  .round('Value', 2)
  .sign('Value')
  .sin('Value')
  .sqrt('Value')
  .square('Value')
  .sum('Value')
  .tan('Value')
  .getResult();

console.log(queryResult);

jsonData = [
  { ID: 1, DateValue: '2023-01-15T12:30:00Z' },
  { ID: 2, DateValue: '2023-04-20T08:45:00Z' },
];

queryResult = new JsonQueryLibrary(jsonData)
  .currentTimestamp('CurrentTimestamp')
  .dateAdd('day', 5, 'DateValue', 'DateAfterAddingDays')
  .dateDiff('day', 'DateValue', '2023-03-01T00:00:00Z', 'DaysDifference')
  .dateFromParts('Year', 'Month', 'Day', 'DateFromPartsResult')
  .dateName('month', 'DateValue', 'MonthName')
  .datePart('day', 'DateValue', 'DayOfMonth')
  .day('DateValue', 'DayOfMonth')
  .getDate('CurrentDate')
  .getUTCDate('UTCDate')
  .isDate('DateValue', 'IsDateValid')
  .month('DateValue', 'MonthOfYear')
  .sysDateTime('SystemDateTime')
  .year('DateValue', 'YearValue')
  .getResult();

console.log(queryResult);

jsonData = [
  { ID: 1, Value: '123', IsNumericTest: '456' },
  { ID: 2, Value: 'abc', IsNumericTest: '789' },
];

queryResult = new JsonQueryLibrary(jsonData)
  .cast('Value', 'int', 'CastedValue')
  .coalesce('NonExistentField', 'Value', 'CoalesceResult')
  .convert('Value', 'date', 'ConvertedDate')
  .current_user('CurrentUser')
  .iif('CastedValue', 'IsNumericTest', 'Value', 'IIFResult')
  .isnull('Value', 'DefaultValue', 'IsNullResult')
  .isnumeric('IsNumericTest', 'IsNumericResult')
  .nullif('Value', '123', 'NullIfResult')
  .session_user('SessionUser')
  .sessionproperty('TimeZone', 'SessionPropertyResult')
  .system_user('SystemUser')
  .user_name('ID', 'UserName')
  .getResult();

console.log(queryResult);

jsonData = [
  { ID: 1, Name: 'Abhishek', Age: 30 },
  { ID: 2, Name: 'Jane Smith', Age: 25 },
];

queryResult = new JsonQueryLibrary(jsonData)
  .addObject({ ID: 3, Name: 'Bob Johnson', Age: 35 })
  .removeObject('ID', 2)
  .updateObject('ID', 1, { Age: 31, City: 'Philippines' })
  .getResult();

console.log(queryResult);

jsonData1 = [
  { ID: 1, Name: 'Abhishek', Age: 30 },
  { ID: 2, Name: 'Jane Smith', Age: 25 },
];

const jsonData2 = [
  { ID: 3, Name: 'Bob Johnson', Age: 35 },
  { ID: 4, Name: 'Alice Brown', Age: 28 },
];

queryResult = new JsonQueryLibrary(jsonData1).union(jsonData2).getResult();

console.log(queryResult);

jsonData = {
  users: {
    user: [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Bob' },
    ],
  },
};

const jsonPath = 'users.user[?(@.name=="Jane")]';
const result = queryJsonWithJsonPath(jsonData, jsonPath);
console.log(result);

jsonData = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 25 },
  { id: 3, name: 'Bob', age: 35 },
];

// Filter the data using the 'HAVING' function
const filteredData = having(jsonData, (item) => item.age > 30);

console.log(filteredData);

const jsonData = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 25 },
  { id: 3, name: 'Bob', age: 35 },
];

const htmlTable = jsonToHtmlTable(jsonData);
console.log(htmlTable);

const jsonDataForXml = {
  person: {
    name: 'Abhishek',
    age: 30,
    address: {
      city: 'Philippines',
      zip: '10001',
    },
  },
};

const xmlString = jsonToXml(jsonDataForXml);
console.log(xmlString);

const jsonDataForAvro = {
  name: 'Abhishek',
  age: 30,
  city: 'Philippines',
};

const avroSchema = {
  type: 'record',
  name: 'Person',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'age', type: 'int' },
    { name: 'city', type: 'string' },
  ],
};

const avroBuffer = jsonToAvro(jsonDataForAvro, avroSchema);
console.log(avroBuffer);

jsonData = {
  book: {
    title: 'Code with JavaScript',
    author: {
      name: 'Abhishek',
      nationality: 'IN',
    },
    pages: 150,
    genre: 'Fiction',
  },
};

const xpathQuery = '/book/author/name';

result = queryJsonWithXPath(jsonData, xpathQuery);
console.log(result); // Output: Abhishek

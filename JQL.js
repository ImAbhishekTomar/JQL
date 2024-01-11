class JsonQueryLibrary {
  constructor(data) {
    this.data = data;
    this.result = data;
  }

  select(fields) {
    this.result = this.result.map((item) => {
      const selectedItem = {};
      fields.forEach((field) => {
        selectedItem[field] = item[field];
      });
      return selectedItem;
    });
    return this;
  }

  where(condition) {
    this.result = this.result.filter((item) => condition(item));
    return this;
  }

  order(field, orderType = 'asc') {
    this.result.sort((a, b) => {
      if (orderType === 'asc') {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });
    return this;
  }

  limit(count) {
    this.result = this.result.slice(0, count);
    return this;
  }

  skip(count) {
    this.result = this.result.slice(count);
    return this;
  }

  take(count) {
    return this.limit(count);
  }

  count() {
    return this.result.length;
  }

  min(field) {
    return Math.min(...this.result.map((item) => item[field]));
  }

  max(field) {
    return Math.max(...this.result.map((item) => item[field]));
  }

  sum(field) {
    return this.result.reduce((acc, item) => acc + item[field], 0);
  }

  round(field) {
    this.result.forEach((item) => {
      item[field] = Math.round(item[field]);
    });
    return this;
  }

  join(innerData, outerKeySelector, innerKeySelector, resultSelector) {
    const innerMap = new Map(innerData.map(innerKeySelector));

    this.result = this.result
      .map((outerItem) => {
        const innerItem = innerMap.get(outerKeySelector(outerItem));

        if (innerItem) {
          return resultSelector(outerItem, innerItem);
        }

        return null;
      })
      .filter((item) => item !== null);

    return this;
  }

  ascii(field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].charCodeAt(0),
    }));
    return this;
  }

  char(asciiValue, field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: String.fromCharCode(asciiValue),
    }));
    return this;
  }

  charindex(substring, field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].indexOf(substring),
    }));
    return this;
  }

  concat(...fields) {
    this.result = this.result.map((item) => ({
      ...item,
      Concatenated: fields.map((field) => item[field]).join(''),
    }));
    return this;
  }

  concatWithSeparator(separator, ...fields) {
    this.result = this.result.map((item) => ({
      ...item,
      Concatenated: fields.join(separator),
    }));
    return this;
  }

  datalength(field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Buffer.from(item[field]).length,
    }));
    return this;
  }

  difference(str1, str2, field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: this.soundsSimilar(str1, str2),
    }));
    return this;
  }

  format(value, format, field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: new Intl.DateTimeFormat('en-US', format).format(item[value]),
    }));
    return this;
  }

  left(field, length) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].slice(0, length),
    }));
    return this;
  }

  len(field) {
    this.result = this.result.map((item) => ({
      ...item,
      Length: item[field].length,
    }));
    return this;
  }

  lower(field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].toLowerCase(),
    }));
    return this;
  }

  ltrim(field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].replace(/^\s+/, ''),
    }));
    return this;
  }

  nchar(unicodeValue, field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: String.fromCodePoint(unicodeValue),
    }));
    return this;
  }

  patindex(pattern, field) {
    const regex = new RegExp(pattern);
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].search(regex),
    }));
    return this;
  }

  quotename(str, field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: `"${item[str]}"`,
    }));
    return this;
  }

  replace(find, replace, field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].replace(new RegExp(find, 'g'), replace),
    }));
    return this;
  }

  replicate(field, count) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].repeat(count),
    }));
    return this;
  }

  reverse(field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].split('').reverse().join(''),
    }));
    return this;
  }

  right(field, length) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].slice(-length),
    }));
    return this;
  }

  rtrim(field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].replace(/\s+$/, ''),
    }));
    return this;
  }

  soundsSimilar(str1, str2) {
    // Implement your logic for DIFFERENCE here
    // This is a placeholder function, you may need to adjust it based on your requirements.
    // For simplicity, it currently returns 0 (no difference).
    return 0;
  }

  space(count, field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: ' '.repeat(count),
    }));
    return this;
  }

  str(value, field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[value].toString(),
    }));
    return this;
  }

  stuff(field, start, length, replaceWith) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].substring(0, start) + replaceWith + item[field].substring(start + length),
    }));
    return this;
  }

  substring(field, start, length) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].substring(start, start + length),
    }));
    return this;
  }

  translate(field, fromChars, toChars) {
    const translationMap = this.createTranslationMap(fromChars, toChars);
    this.result = this.result.map((item) => ({
      ...item,
      [field]: this.translateString(item[field], translationMap),
    }));
    return this;
  }

  trim(field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].trim(),
    }));
    return this;
  }

  unicode(field) {
    this.result = this.result.map((item) => ({
      ...item,
      UnicodeValue: item[field].charCodeAt(0),
    }));
    return this;
  }

  upper(field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: item[field].toUpperCase(),
    }));
    return this;
  }

  createTranslationMap(fromChars, toChars) {
    const translationMap = {};
    for (let i = 0; i < fromChars.length; i++) {
      translationMap[fromChars.charAt(i)] = toChars.charAt(i) || '';
    }
    return translationMap;
  }

  translateString(str, translationMap) {
    return str.replace(/./g, (char) => translationMap[char]);
  }

  abs(field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.abs(item[field]),
    }));
    return this;
  }

  acos(field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.acos(item[field]),
    }));
    return this;
  }

  asin(field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.asin(item[field]),
    }));
    return this;
  }

  atan(field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.atan(item[field]),
    }));
    return this;
  }

  atan2(yField, xField, resultField) {
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: Math.atan2(item[yField], item[xField]),
    }));
    return this;
  }

  avg(field) {
    const sum = this.result.reduce((acc, item) => acc + item[field], 0);
    const average = sum / this.result.length;
    this.result = [{ Average: average }];
    return this;
  }

  ceiling(field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.ceil(item[field]),
    }));
    return this;
  }

  count(field) {
    const count = this.result.length;
    this.result = [{ [field]: count }];
    return this;
  }

  cos(field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.cos(item[field]),
    }));
    return this;
  }

  cot(field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: 1 / Math.tan(item[field]),
    }));
    return this;
  }

  degrees(field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: (180 / Math.PI) * item[field],
    }));
    return this;
  }

  exp(field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.exp(item[field]),
    }));
    return this;
  }

  floor(field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.floor(item[field]),
    }));
    return this;
  }

  log(field, base = Math.E) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.log(item[field]) / Math.log(base),
    }));
    return this;
  }

  log10(field) {
    return this.log(field, 10);
  }

  max(field) {
    const maxValue = Math.max(...this.result.map((item) => item[field]));
    this.result = [{ [field]: maxValue }];
    return this;
  }

  min(field) {
    const minValue = Math.min(...this.result.map((item) => item[field]));
    this.result = [{ [field]: minValue }];
    return this;
  }

  pi() {
    this.result = [{ PI: Math.PI }];
    return this;
  }

  power(baseField, exponentField, resultField) {
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: Math.pow(item[baseField], item[exponentField]),
    }));
    return this;
  }

  radians(field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: (Math.PI / 180) * item[field],
    }));
    return this;
  }

  rand(field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.random(),
    }));
    return this;
  }

  round(field, decimalPlaces = 0) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: +item[field].toFixed(decimalPlaces),
    }));
    return this;
  }

  sign(field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.sign(item[field]),
    }));
    return this;
  }

  sin(field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.sin(item[field]),
    }));
    return this;
  }

  sqrt(field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.sqrt(item[field]),
    }));
    return this;
  }

  square(field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.pow(item[field], 2),
    }));
    return this;
  }

  sum(field) {
    const sumValue = this.result.reduce((acc, item) => acc + item[field], 0);
    this.result = [{ [field]: sumValue }];
    return this;
  }

  tan(field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: Math.tan(item[field]),
    }));
    return this;
  }

  currentTimestamp(field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: new Date().toISOString(),
    }));
    return this;
  }

  dateAdd(interval, number, dateField, resultField) {
    const intervals = {
      year: 'FullYear',
      quarter: 'Month',
      month: 'Month',
      day: 'Date',
      hour: 'Hours',
      minute: 'Minutes',
      second: 'Seconds',
    };

    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: new Date(item[dateField]).set(intervals[interval], item[dateField].get(intervals[interval]) + number),
    }));
    return this;
  }

  dateDiff(interval, startDateField, endDateField, resultField) {
    const intervals = {
      year: 31536000000, // milliseconds in a year
      quarter: 7776000000, // milliseconds in a quarter year
      month: 2592000000, // milliseconds in a month
      day: 86400000, // milliseconds in a day
      hour: 3600000, // milliseconds in an hour
      minute: 60000, // milliseconds in a minute
      second: 1000, // milliseconds in a second
    };

    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: Math.round((new Date(item[endDateField]) - new Date(item[startDateField])) / intervals[interval]),
    }));
    return this;
  }

  dateFromParts(yearField, monthField, dayField, resultField) {
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: new Date(item[yearField], item[monthField] - 1, item[dayField]).toISOString(),
    }));
    return this;
  }

  dateName(datePart, dateField, resultField) {
    const datePartMap = {
      year: 'getFullYear',
      quarter: 'getMonth',
      month: 'getMonth',
      day: 'getDate',
      hour: 'getHours',
      minute: 'getMinutes',
      second: 'getSeconds',
    };

    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: new Date(item[dateField])[datePartMap[datePart]](),
    }));
    return this;
  }

  datePart(datePart, dateField, resultField) {
    const datePartMap = {
      year: 'getFullYear',
      quarter: 'getMonth',
      month: 'getMonth',
      day: 'getDate',
      hour: 'getHours',
      minute: 'getMinutes',
      second: 'getSeconds',
    };

    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: new Date(item[dateField])[datePartMap[datePart]]() + 1, // Months are 0-indexed
    }));
    return this;
  }

  day(dateField, resultField) {
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: new Date(item[dateField]).getDate(),
    }));
    return this;
  }

  getDate(field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: new Date().toISOString(),
    }));
    return this;
  }

  getUTCDate(field) {
    this.result = this.result.map((item) => ({
      ...item,
      [field]: new Date().toISOString(),
    }));
    return this;
  }

  isDate(dateField, resultField) {
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: Number(!isNaN(new Date(item[dateField]))),
    }));
    return this;
  }

  month(dateField, resultField) {
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: new Date(item[dateField]).getMonth() + 1, // Months are 0-indexed
    }));
    return this;
  }

  sysDateTime(resultField) {
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: new Date().toISOString(),
    }));
    return this;
  }

  year(dateField, resultField) {
    this.result = this.result.map((item) => ({
      ...item,
      [resultField]: new Date(item[dateField]).getFullYear(),
    }));
    return this;
  }

  getResult() {
    return this.result;
  }
}

//---------------------------------------------------------- TEST

const jsonData = [
  { id: 1, name: 'John', age: 25 },
  { id: 2, name: 'Jane', age: 30 },
  { id: 3, name: 'Bob', age: 22 },
];

const queryLibrary = new JsonQueryLibrary(jsonData);

const queryResult = queryLibrary
  .select(['id', 'name'])
  .where((item) => item.age > 25)
  .order('name', 'asc')
  .skip(1)
  .take(2)
  .getResult();

console.log(queryResult);

const minAge = new JsonQueryLibrary(jsonData).min('age');
console.log(minAge);

const maxAge = new JsonQueryLibrary(jsonData).max('age');
console.log(maxAge);

const sumOfAges = new JsonQueryLibrary(jsonData).sum('age');
console.log(sumOfAges);

const roundedAges = new JsonQueryLibrary(jsonData).round('age').getResult();
console.log(roundedAges);

const postsData = [
  { ID: 1, Title: 'Post 1' },
  { ID: 2, Title: 'Post 2' },
];

const postMetasData = [
  { Post_ID: 1, Meta: 'Meta 1' },
  { Post_ID: 2, Meta: 'Meta 2' },
];

queryResult = new JsonQueryLibrary(postsData)
  .join(
    postMetasData,
    (post) => post.ID,
    (meta) => meta.Post_ID,
    (post, meta) => ({ Post: post, Meta: meta })
  )
  .getResult();

console.log(queryResult);

jsonData = [
  { ID: 1, Name: 'John Doe', Age: 30 },
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
  // ... more data
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

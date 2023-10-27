const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const answerOptionsArr = [
  'Words by name (from A to Z).',
  'Show digits from the smallest.',
  'Show digits from the biggest.',
  'Words by quantity of letters.',
  'Only unique words.',
  'Only unique values.',
];

const answerOptionsStr = answerOptionsArr
  .map((ans, i) => `${i + 1}. ${ans}`)
  .join('\n');

getInput();

function getInput() {
  rl.question(
    'Hello. Enter at least 10 words or digits deviding them in spaces: ',
    input => {
      if (input.toLowerCase() === 'exit') {
        rl.close();
        return;
      }

      const data = input
        .trim()
        .split(' ')
        .filter(item => item);

      outputSortedValues(data);
    }
  );
}

function outputSortedValues(data) {
  let result = '';

  rl.question(
    `How would you like to sort values:\n${answerOptionsStr}
    \nSelect (1-5) and press ENTER: `,

    option => {
      if (+option === 1) {
        result = getSortedWords(data);
      }

      if (+option === 2) {
        result = getSortedNumbersBy('increase', data);
      }

      if (+option === 3) {
        result = getSortedNumbersBy('decrease', data);
      }

      if (+option === 4) {
        result = getSortedWordsByLength(data);
      }

      if (+option === 5) {
        result = getUniqueWords(data);
      }

      if (+option === 6) {
        result = getAllUniqueValues(data);
      }

      if (option.toLowerCase() === 'exit') {
        console.log('Good bye! Come back again!');
        rl.close();
        return;
      }

      console.log(result);
      getInput();
    }
  );
}

// 1
function getSortedWords(data) {
  return getWords(data).sort();
}

// 2-3
function getSortedNumbersBy(sortBy, data) {
  return getNumbers(data).sort((a, b) =>
    sortBy === 'increase' ? a - b : b - a
  );
}

// 4
function getSortedWordsByLength(data) {
  return getWords(data).sort((a, b) => a.length - b.length);
}

// 5
function getUniqueWords(data) {
  return [...new Set(getWords(data))];
}

// 6
function getAllUniqueValues(data) {
  return [...new Set(data)];
}

// Helpers

function getNumbers(data) {
  return data.filter(item => !Number.isNaN(+item));
}

function getWords(data) {
  return data.filter(item => Number.isNaN(+item));
}

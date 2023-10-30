const fs = require('fs');
const inquirer = require('inquirer');

const FILE_DB = 'db.txt';
const FILE_JSON_DB = 'dbJSON.txt';

askQuestionsForDB();
writeAllUsersToDBJSON(FILE_DB);

// *************************************************************
// CLI Handlers

function askQuestionsForDB() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'user',
        message: "Enter the user's name. To cancel press ENTER:",
      },
    ])
    .then(answers => {
      if (answers.user.trim() === '') {
        askToFindUser();
      } else {
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'gender',
              message: 'Choose your Gender.',
              choices: ['male', 'female'],
            },
            {
              type: 'number',
              name: 'age',
              message: 'Enter your age:',
            },
          ])
          .then(nextAnswers => {
            answers.gender = nextAnswers.gender;
            answers.age = nextAnswers.age;

            addNewUserToDB(answers);
            writeAllUsersToDBJSON(FILE_DB);
            askQuestionsForDB();
          })
          .catch(error => {
            if (error.isTtyError) {
              throw error;
            }
          });
      }
    });
}

function askToFindUser() {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'likeToSearch',
        message: 'Would you like to search values in DB?',
        choices: ['Y', 'n'],
      },
    ])
    .then(answers => {
      if (answers.likeToSearch) {
        displayAllUsersFromDB(FILE_DB);
        askWhichUserToFind();
      }
    })
    .catch(error => {
      if (error.isTtyError) {
        throw error;
      }
    });
}

function askWhichUserToFind() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'userToFind',
        message: "Enter user's name you wanna find in DB:",
      },
    ])
    .then(answers => {
      if (answers.userToFind) {
        findAndDisplayUserFromDB(FILE_DB, answers.userToFind);
      }
    })
    .catch(error => {
      if (error.isTtyError) {
        throw error;
      }
    });
}

// *************************************************************
// FS Handler

function addNewUserToDB(data) {
  const newData = checkAge(data);
  newData.user = newData.user.toTitleCase();

  fs.appendFile(FILE_DB, `${JSON.stringify(newData)},\n`, 'utf8', err => {
    if (err) throw err;
  });

  writeAllUsersToDBJSON(FILE_DB);
}

function writeAllUsersToDBJSON(fileDB) {
  readAllUsersFromDB(fileDB, (err, parsedData) => {
    if (err) throw err;
    fs.writeFile(FILE_JSON_DB, JSON.stringify(parsedData), 'utf8', err => {
      if (err) {
        console.error(err);
      }
    });
  });
}

function readAllUsersFromDB(fileDB, callback) {
  fs.readFile(fileDB, 'utf8', function (err, data) {
    if (err) throw err;

    const dataChars = data.trim().split('');
    dataChars.pop();

    const correctData = '[\n' + dataChars.join('') + '\n]';
    const parsedData = JSON.parse(correctData);
    // return parsedData;
    callback(null, parsedData);
  });
}

function displayAllUsersFromDB(fileDB) {
  readAllUsersFromDB(fileDB, (err, parsedData) => {
    if (err) throw err;
    console.log('\n', parsedData);
  });
}

function findAndDisplayUserFromDB(fileDB, name) {
  readAllUsersFromDB(fileDB, (err, parsedData) => {
    if (err) throw err;
    displayUserFromDB(
      parsedData.find(data => data.user === name.toTitleCase()),
      name
    );
  });
}

function displayUserFromDB(user, name) {
  if (!user) {
    console.log(`User ${name} was not found.`);
    return false;
  }
  console.log(`User ${user.user.toTitleCase()} was found.`);
  console.log(user);
}

// *************************************************************
// Checking limitations

function checkAge(data) {
  if (+data.age < 6 || +data.age > 100 || isNaN(+data.age)) delete data.age;
  return data;
}

// *************************************************************
// Helpers

String.prototype.toTitleCase = function () {
  const wordsArr = this.toLowerCase().trim().split(' ');
  const titledWordsArr = wordsArr.map(
    word => word.split('')[0].toUpperCase() + word.split('').slice(1).join('')
  );
  return titledWordsArr.join(' ');
};

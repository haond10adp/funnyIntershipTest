'use strict';
class Question {
  // 1. Build a function constructor called Question
  constructor(question, answers, correctAns) {
    this._question = question;
    this._answers = answers;
    this._correctAns = correctAns;
  }

  // 7.  Make sure that all your code is private
  // make all properties protected.
  get question() {
    return this._question;
  }
  get answers() {
    return this._answers;
  }
  get correctAns() {
    return this._correctAns;
  }

  show() {
    console.log(this.question);
    this.answers.forEach((answer, index) => {
      console.log(`${index + 1}. ${answer}`);
    });
  }

  checkAnswer(answer) {
    if (answer == this.correctAns) {
      console.log('Correct');
    } else {
      console.log('Incorrect');
    }
    return answer == this.correctAns;
  }
}

// 2. Create a couple of questions using the constructor
let question1 = new Question(
  'What is the result of 2 + 3 * 4?',
  [20, 14, 24],
  2
);
let question2 = new Question(
  "What's the largest contry on earth?",
  ['Russia', 'USA', 'China', 'Canada', 'Brazil'],
  1
);
let question3 = new Question('Is Mars bigger than Earth?', [true, false], 2);

// 3. Store them all inside an array
let questions = [question1, question2, question3];

// 7. Cannot set a protected property, this will throw an error
// questions[1].question = 'New question?';

let score = 0;
function ask() {
  // 4. Select one random question and log it on the console
  let randomNumber = Math.floor(Math.random() * questions.length);
  questions[randomNumber].show();

  // 5. Use the 'prompt' function to ask the user for the correct answer
  let answer = prompt(
    "What's your answer? (Type 'exit' or click Cancel to quit the game)"
  );

  // 9. Quit the game if user type 'exit' or click Cancel
  if (answer == 'exit' || answer == null) {
    console.log("You've quit the game");
    console.log(`Your score is ${score}`); // 11. Display score in the console
    return;
  }

  // 6. Check if the answer is correct and print to the console: checkAnswer() side effect
  if (questions[randomNumber].checkAnswer(answer)) {
    score++; // 10. track score
  }

  // 8.  Display the next random question
  ask();
}

let confirmed = confirm('You should open the console before entering the quiz');
if (confirmed) {
  setTimeout(ask, 0);
}

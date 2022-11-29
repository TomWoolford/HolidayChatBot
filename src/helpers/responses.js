class Message {
    constructor(msg, key = "", isUser = false) {
        this.msg = msg;
        this.key = key;
        this.isUser = isUser;
    }
}

const welcomeMessage = new Message (
    "Welcome! 😊 How can we help you today? Type 'help' for a list of options, or type 'holiday' to begin.",
);

const errorMessage = new Message (
    "Oh no! Something went wrong 😢 Please refresh the page and try again.", 
);

const helpMessage = new Message (
    "Try typing one of the below commands or keep an eye out for the keywords in single quotes ' '" +
    "<ul><li>Type 'help' to view this again</li><li>Type 'holiday' to get help finding a holiday</li><li>Type 'joke' for a joke</li></ul>",
    "help"
); // Add back, repeat?

const notRecognised = new Message (
    "Ah man! I'm not sure what you're trying to say! 😕 Enter one of the keywords from above or type 'help' for a list of options"
);

const invalidNumber = new Message (
    "One or more of the numbers you entered are invalid! 🙈 Ensure you enter a number(s) that lies within the stated range."
);

const notImplemented = new Message (
    "💯😜🃏🐱‍👤 I haven't got here yet but hold tight!"
);

const questions = [
    welcomeMessage,
    new Message("Let's find you a holiday! 🏝😎 First off, would you prefer a 'hot', 'cold', 'mild', 'relaxing', 'snow', 'adventure' or 'beach' holiday?"),
    new Message("Ok, do you like to cook? 👩‍🍳 Which board would you choose; 'full', 'half' or 'none'?"),
    new Message("All right then, how many ⭐s does your hotel need to have? '1', '2', '3', '4' or '5'? You can enter more than one value, seperateed by a space 🙂"),
    new Message("Finally, please enter a price range 💲! Please ensure you enter two numbers between 100 and 1000, seperated by a dash - e.g. 150-450"),
    new Message("Question 5"),
]; 



export { 
    welcomeMessage,
    errorMessage,
    helpMessage, 
    notImplemented,
    Message, 
    questions,
    notRecognised,
    invalidNumber,
 }

 // Array of Questions and valid answers
 // check user input and move stage if valid
 // Keep array of stages in responses.jsx
 // Add new stage each time
 // Can go back by 1
 // Use stage array to get the correct question

class message {
    constructor(msg, key = "", isUser = false) {
        this.msg = msg;
        this.key = key;
        this.isUser = isUser;
    }
}

const welcomeMessage = new message (
    "Welcome! 😊 How can we help you today? Type 'help' for a list of options, or type 'holiday' to begin.",
);

const errorMessage = new message (
    "Oh no! Something went wrong 😢 Please refresh the page and try again.", 
);

const helpMessage = new message (
    "Try typing one of the below commands or keep an eye out for the keywords in single quotes ' '" +
    "<ul><li>Type 'help' to view this again</li><li>Type 'holiday' to get help finding a holiday</li><li>Type 'joke' for a joke</li></ul>",
    "help"
);

const notRecognised = new message (
    "Ah man! I'm not sure what you're trying to say! 😕 Enter one of the keywords from above or type 'help' for a list of options"
);

const notImplemented = new message (
    "💯😜🃏🐱‍👤 I haven't got here yet but hold tight!"
);

const questions = [
    welcomeMessage,
    new message("Let's find you a holiday! 🏝😎 First off, would you prefer a 'hot', 'cold', 'mild', 'relaxing', 'snow', 'adventure' or 'beach' holiday?"),
    new message("Ok, do you like to cook? 👩‍🍳 Which board would you choose; 'full', 'half' or 'none'?"),
    new message("All right then, how many ⭐s does your hotel need to have? '1', '2', '3', '4' or '5'? You can enter more than one value, seperateed by a space 🙂"),
    new message("Finally, please enter a price range 💲! Please ensure you enter two numbers between 100 and 1000, seperated by a dash - e.g. 150-450"),
    new message("Question 5"),
]; // Price range 100 - 1000



export { 
    welcomeMessage,
    errorMessage,
    helpMessage, 
    notImplemented,
    message, 
    questions,
    notRecognised,
 }

 // Array of Questions and valid answers
 // check user input and move stage if valid
 // Keep array of stages in responses.jsx
 // Add new stage each time
 // Can go back by 1
 // Use stage array to get the correct question

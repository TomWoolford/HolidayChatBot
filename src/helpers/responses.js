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
    new message("Question 1"),
    new message("Question 2"),
    new message("Question 3"),
    new message("Question 4"),
    new message("Question 5"),
];



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

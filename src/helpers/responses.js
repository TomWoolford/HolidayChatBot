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
    "<p><ul><li>Type 'help' to view this again</li><li>Type 'holiday' to get help finding a holiday</li><li>Type 'joke' for a joke</li></ul></p>",
    "help"
);

const questions = [
    welcomeMessage,
    new message("Question 1"),
    new message("Question 2"),
    new message("Question 3"),
    new message("Question 4"),
    new message("Question 5"),
];

const getNextMessage = (stage, input) => {
    // check the stage and if a valid input
    // if yes then return the next question
    if (input.toLowerCase() === "help") return helpMessage;
}

const getNewStage = message => questions.findIndex(x => x.msg === message);

const checkStageInput = (stage, input) => {
    switch (stage) {
        case 0: 
            if (input.toLowerCase() === "yes" || input.toLowerCase() === "no") {

            }
    }
}

export { 
    welcomeMessage,
    errorMessage,
    message, 
    questions,
    getNextMessage,
    getNewStage,
 }

 // Array of Questions and valid answers
 // check user input and move stage if valid
 // Keep array of stages in responses.jsx
 // Add new stage each time
 // Can go back by 1
 // Use stage array to get the correct question

import { Message } from "./classes";

const welcomeMessage = new Message (
    "Welcome! 😊 How can we help you today? Type 'help' for a list of options, or type 'holiday' to begin.",
);

const errorMessage = new Message (
    "Oh no! Something went wrong 😢 Please refresh the page and try again.", 
);

const helpMessage = new Message (
    "Try typing one of the below commands or keep an eye out for the keywords in single quotes ' '" +
    "<ul><li>Type 'help' to view this again</li><li>Type 'holiday' to get help finding a holiday</li><li>Type 'joke' for a joke</li>" +
    "<li>Type 'repeat' to view the current question</li><li>Type 'restart' to start over</li></ul>",
    "help"
); // Add back, repeat?

const notRecognised = new Message (
    "Ah man! I'm not sure what you're trying to say! 😕 Enter one of the keywords from above or type 'help' for a list of options"
);

const invalidNumber = new Message (
    "One or more of the numbers you entered are invalid! 🙈 Ensure you enter a number(s) that lies within the stated range."
);

const invalidString = new Message(
    "It doesn't look like that is one of the specified keywords above 🤔 try entering one of those and check your spelling 😊"
);

const invalidArrayString = new Message(
    "Whoops! 🤭 One or more of the words you entered are not valid! Make sure it's spelt correctly and give it another go!"
);

const notImplemented = new Message (
    "💯😜🃏🐱‍👤 I haven't got here yet but hold tight!"
);

// Update here when new filters are added - include key in Message to ensure <small> renders
const partialText = "not try typing 'temp', 'location', 'category', 'stars', 'price' or 'all' to view the matches to your individual preferences. <small>Note: 'all' will display every match in each preference!</small>";


const noResults = new Message (
    `We're so sorry but your preferences had no exact matches 😢 Why ${partialText}`, "partial"
);

const partialMatches = new Message (
    `We hope you are satisfied with your results 😎 If ${partialText}`, "partial"
);

const noRepeat = new Message(
    "You have finished the survey! 💪 Check out your awesome results or type 'restart' to start again."
);

const questions = [
    welcomeMessage,
    new Message("Let's find you a holiday! 🏝😎 First off, would you prefer a 'hot', 'cold' or 'mild' holiday?"),
    new Message("Ok, What's your favourite backdrop? 🗻 'mountain', 'city' or 'sea'? If you can't decide you can enter more than one 😁"),
    new Message("Nice! What do you ❤ doing on holiday? Are you an 'adventure', 'lazy' or 'sightseeing' kind of person?"),
    new Message("All right then, how many ⭐s does your hotel need to have? '3', '4' or '5'? You can enter more than one value, seperateed by a space 🙂"),
    new Message("Finally, please enter a price (per night) range 💲! You can enter one number; a maximum price, or two numbers as a price range. Please ensure the numbers are between '25' and '300', seperated by a dash - e.g. 150 - 250"),
    new Message("Awesome! Thank you for completing the questionnaire 😊 Give us a second to calculate your best matches! 🧮"),
];

export { 
    welcomeMessage,
    errorMessage,
    helpMessage, 
    notImplemented,
    questions,
    notRecognised,
    invalidNumber,
    noResults, 
    partialMatches,
    noRepeat, 
    invalidArrayString,
    invalidString
 }

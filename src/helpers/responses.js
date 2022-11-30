import { Message } from "./classes";

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

const noResults = new Message (
    "We're so sorry but your preferences had no exact matches 😢 Why not try typing 'price', 'board', 'stars' or 'type' to view the matches to your individual preferences."
);

const partialMatches = new Message (
    "We hope you are satisfied with your results 😎 If not try typing 'price', 'board', 'stars' or 'type' to view the matches to your individual preferences."
);

const questions = [
    welcomeMessage,
    new Message("Let's find you a holiday! 🏝😎 First off, would you prefer a 'hot', 'cold', 'mild', 'relaxing', 'snow', 'adventure' or 'beach' holiday?"),
    new Message("Ok, do you like to cook? 👩‍🍳 Which board would you choose; 'full', 'half' or 'none'?"),
    new Message("All right then, how many ⭐s does your hotel need to have? '1', '2', '3', '4' or '5'? You can enter more than one value, seperateed by a space 🙂"),
    new Message("Finally, please enter a price range 💲! You can enter one number; a maximum price, or two numbers as a price range. Please ensure the numbers are between '100' and '1000', seperated by a dash - e.g. 150 - 450"),
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
 }

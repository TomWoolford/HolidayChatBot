import { questions, message, welcomeMessage, errorMessage, helpMessage, notImplemented, notRecognised } from "./responses";

const fakeAPICall = async () => new Promise(res => setTimeout(res, 1500));

const getNextMessage = async (stage, input) => {
    await fakeAPICall(); // To simulate a call to a db
    const inputTrimed = input.trim();
    
    if (inputTrimed === "help") return helpMessage;

    if (inputTrimed === "holiday") return checkStageInput(stage, inputTrimed);

    if (inputTrimed === "joke") return notImplemented;

    return notRecognised;
}

const getNewStage = message => questions.findIndex(x => x.msg === message.msg);

const checkStageInput = (stage, input) => {
    switch (stage) {
        case 0: // display question 1 
            return questions[1];
        case 1: 
            // Check for the answers 
            // Make sure we have a valid answer
            // Store it somewhere 
            // if we good, carry on my wayward son
    }
}

const getKeyWords = () => {
    //'(\w*?)' - regex for anything in ''
}

export {
    getNextMessage,
    getNewStage,
}
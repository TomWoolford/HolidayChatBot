import { questions, 
    invalidNumber, 
    helpMessage, 
    notImplemented, 
    notRecognised } from "./responses";
import { Answer } from "./classes";

const answer = new Answer();

const fakeAPICall = async () => new Promise(res => setTimeout(res, 1500));

const getNextMessage = async (stage, input) => {
    await fakeAPICall(); // To simulate a call to a db
    const inputTrimed = input.trim();
    
    if (inputTrimed === "help") return helpMessage;

    if (inputTrimed === "holiday" || stage > 0) return checkStageInput(stage, inputTrimed);

    if (inputTrimed === "joke") return notImplemented;

    return notRecognised;
}

const getNewStage = message => questions.findIndex(x => x.msg === message.msg);

const checkStageInput = (stage, input) => {
    switch (stage) {
        case 0: // display question 1 
            return questions[1];
        case 1:
        case 2: // type and board
            const validAnswers = getKeyWords(questions[stage].msg);
            const idx = validAnswers.indexOf(input);

            if (idx > -1) {
                if (stage === 1) answer.type = validAnswers[idx];
                if (stage === 2) answer.board = validAnswers[idx];

                return questions[++stage];
            }
            return notRecognised;
        case 3:
        case 4: // stars and price
            const nums = input.split(/[\s|-]/g);
            const values = [...new Set(nums.map(num => parseInt(num)))]; // Remove duplicates

            if (!values.some(value => isNaN(value))) {
                if (stage === 3 && !values.some(value => value < 0 || value > 5)) {
                    answer.stars = values;
                    return questions[++stage];
                }
                if (stage === 4 && !values.some(value => value < 100 || value > 1000) && values.length === 2) {
                    answer.price = values;
                    return questions[++stage];
                }
            }
            return invalidNumber;
        case 5: 
            console.log(answer);
            return notImplemented;
        default:
            return notRecognised;
    }
}

const getKeyWords = msg => [...msg.matchAll(/'(\w*?)'/g)].map(match => match[1]);

const getNumbers = msg => [...msg.matchAll(/[\d+]/g)].map(match => match[0]);

export {
    getNextMessage,
    getNewStage,
}
import { questions, 
    invalidNumber, 
    helpMessage, 
    notImplemented, 
    notRecognised,
    partialMatches,
} from "./responses";
import { answer, matches, calculateResults, generateMatchList, clearAll } from "./resultHandler";
import { getKeyWords, fakeAPICall } from "./helpers";

const getNextMessage = async (stage, input) => {
    await fakeAPICall(1000); // To simulate a call to a db
    const inputTrimed = input.trim();
    
    if (inputTrimed === "help") return [helpMessage];

    if (inputTrimed === "joke") return [notImplemented];

    if (inputTrimed === "repeat" && stage !== 5) return [questions[stage]];

    if (inputTrimed === "restart") {
        clearAll();
        return [questions[0]];
    }

    if (stage === 5) return getPartialList(input);

    if (inputTrimed === "holiday" || stage > 0) return checkStageInput(stage, inputTrimed);

    return [notRecognised];
}

const checkStageInput = (stage, input) => {
    switch (stage) {
        case 0: // display question 1 
            return [questions[1]];
        case 1:
        case 2: // type and board
            const validAnswers = getKeyWords(questions[stage].msg);
            const idx = validAnswers.indexOf(input);
            
            if (idx > -1) {
                if (stage === 1) answer.type = validAnswers[idx];
                if (stage === 2) answer.board = validAnswers[idx];

                return [questions[++stage]];
            }
            return [notRecognised];
        case 3:
        case 4: // stars and price
            const validInputs = getKeyWords(questions[stage].msg);
            const inputsConverted = validInputs.map(input => parseInt(input)); // Assumes a properly formed question with '' with a valid number inside - should try - catch in production
            
            const lower = Math.min(...inputsConverted); 
            const upper = Math.max(...inputsConverted);

            const nums = input.split(/[\s|-]/g).filter(num => {return num !== ' ' && num !== ''});
            const values = [...new Set(nums.map(num => parseInt(num)))]; // Remove duplicates

            if (!values.some(value => isNaN(value)) || values.length === 0) {
                if ((!values.some(value => value < lower || value > upper)) || stage === 4 && (values.length > 2 || values[0] > values[1])) {
                    const key = stage === 3 ? "stars" : "price";
                    answer[key] = values;
                    return [questions[++stage]];
                }
            }
            return [invalidNumber];
        default:
            return [notRecognised];
    }
}

const getPartialList = (input) => {
    const keys = getKeyWords(partialMatches.msg);
    if (keys.some(key => key === input))
        return generateMatchList(matches[`${input}Matches`], true, input);

    return [notRecognised];
}

export {
    getNextMessage,
}
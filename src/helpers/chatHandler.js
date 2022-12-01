import { questions, 
    invalidNumber, 
    helpMessage, 
    notImplemented, 
    notRecognised,
    partialMatches,
    noRepeat,
} from "./responses";
import { answer, matches, generateMatchList, clearAll, calculateResults } from "./resultHandler";
import { getKeyWords, fakeAPICall } from "./helpers";

const getNextMessage = async (stage, input) => {
    await fakeAPICall(1000); // To simulate a call to a db

    const inputTrimed = input ? input.trim() : "";
    const help = getKeyWords(helpMessage.msg);

    if (help.some(key => key === inputTrimed))
        return getHelp(inputTrimed, stage);
        
    return await checkStageInput(stage, inputTrimed);
}

const getHelp = async (input, stage) => {
    switch (input) {
        case 'help':
            return [helpMessage];
        case 'holiday':
            return stage === 0 ? await checkStageInput(stage, input) : [questions[0]];
        case 'joke':
            return [notImplemented];
        case 'repeat':
            return stage !== 5 ? [questions[stage]] : [noRepeat];
        case 'restart':
            clearAll();
            return [questions[0]];
        default:
            return [notRecognised];
    }
}

const checkStageInput = async (stage, input) => {
    switch (stage) {
        case 0: // display question 1 if holiday
            if (input === 'holiday') 
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
        case 5: 
            return await getResultsList(input);
        default:
            return [notRecognised];
    }
}

const getResultsList = async (input = "") => {
    const keys = getKeyWords(partialMatches.msg);
    
    if (input === "")
        return await calculateResults();

    if (keys.some(key => key === input))
        return generateMatchList(matches[`${input}Matches`], true, input);

    return [notRecognised];
}

export {
    getNextMessage,
}
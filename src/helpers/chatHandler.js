import { questions, 
    invalidNumber, 
    helpMessage, 
    notImplemented, 
    notRecognised,
    partialMatches,
    noRepeat,
    invalidString,
    invalidArrayString,
    saveMessage,
} from "./responses";
import { answer, matches, generateMatchList, clearAll, calculateResults } from "./resultHandler";
import { getKeyWords, fakeAPICall, splitAndRemoveSpace } from "./helpers";
import { Message } from "./classes";

const getNextMessage = async (stage, input) => {
    await fakeAPICall(1000); // To simulate a call to a db

    const inputTrimed = input ? input.trim() : "";
    const help = getKeyWords(helpMessage.msg);

    if (help.some(key => key === inputTrimed))
        return getHelp(inputTrimed, stage);
        
    return await checkStageInput(stage, inputTrimed);
}

// Return the correct help message
const getHelp = async (input, stage) => {
    switch (input) {
        case 'help':
            return [helpMessage];
        case 'holiday':
            return stage === 0 ? await checkStageInput(stage, input) : [questions[0]];
        case 'joke':
            return await getJoke();
        case 'repeat':
            return stage !== 6 ? [questions[stage]] : [noRepeat];
        case 'save':
            downloadChat();
            return [saveMessage];
        case 'restart':
            clearAll();
            return [questions[0]];
        default:
            return [notRecognised];
    }
}

// Handle the answers and next questions
const checkStageInput = async (stage, input) => {
    switch (stage) {
        case 0: // display question 1 if holiday
            if (input === 'holiday') 
                return [questions[1]];
        case 1: // Temp
        case 3: // Category both single string answers
            let validAnswers = getKeyWords(questions[stage].msg);
            const idx = validAnswers.indexOf(input);
            
            if (idx > -1) {
                if (stage === 1) answer.temp = validAnswers[idx];
                if (stage === 3) answer.category = validAnswers[idx];

                return [questions[++stage]];
            }
            return [invalidString];
        case 2: // Location string array
            const locations = getKeyWords(questions[stage].msg);
            const inputSplit = [...new Set(splitAndRemoveSpace(input))];

            // Check each input matches a valid answer 
            if (inputSplit.every(el => locations.some(key => el === key))) {
                answer.location = inputSplit;
                return [questions[++stage]];
            }
            return [invalidArrayString];
        case 4: // stars and price both number arrays
        case 5:
            const validInputs = getKeyWords(questions[stage].msg);
            const inputsConverted = validInputs.map(input => parseInt(input)); 
            
            const lower = Math.min(...inputsConverted); 
            const upper = Math.max(...inputsConverted);

            const nums = splitAndRemoveSpace(input);
            const values = [...new Set(nums.map(num => parseInt(num)))]; // Remove duplicates

            if (!values.some(value => isNaN(value)) || values.length === 0) {
                if ((!values.some(value => value < lower || value > upper)) || stage === 4 && (values.length > 2 || values[0] > values[1])) {
                    const key = stage === 4 ? "stars" : "price";
                    answer[key] = values;
                    return [questions[++stage]];
                }
            }
            return [invalidNumber];
        case 6: 
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

const downloadChat = () => {
    const el = document.createElement("a");
    
    const txt = getTextFromHMTL();
    const file = new Blob(txt, {type: "text/plain", endings: "native"});

    // Create and click <a> tag to dl file
    el.href = URL.createObjectURL(file);
    el.download = `holiday-chat-${new Date().toLocaleString('en-GB')}`;
    document.body.appendChild(el);
    el.click();
    el.remove();
    
    return;
}

const getTextFromHMTL = () => {
    var chat = document.getElementsByClassName('content');
    let txtArray = [`Conversation log ${new Date().toLocaleString('en-GB')}\n\n`];
    console.log(chat[0].children);
    for (const child of chat[0].children) // Ignore the empty div
        if (child.nodeName !== 'DIV')
            txtArray = [...txtArray, `${child.className.includes("bot") ? "Chat Agent" : "You"}: ${child.innerText}\n\n`];
        
    return txtArray;
}

const getJoke = async () => {
    const data = await fetch("https://icanhazdadjoke.com/", {
        headers: {
            "Accept": "application/json",
            "User-Agent": "My Library-(https://github.com/TomWoolford/HolidayChatBot)",
        }, 
        method: "GET"
    }).catch(err => {
        return new Message(
            "I'm afraid we ran into a problem ???? please try again, or type a different command"
        );
    });   

    const joke = await data.json();

    return [new Message(`${joke.joke} ????????????`)];
}

export {
    getNextMessage,
}
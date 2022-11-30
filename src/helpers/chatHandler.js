import { questions, 
    invalidNumber, 
    helpMessage, 
    notImplemented, 
    notRecognised } from "./responses";
import { Answer, Message } from "./classes";

const answer = new Answer();

const fakeAPICall = async s => new Promise(res => setTimeout(res, s));

const calculateResults = async () => {
    // Should validate answer here and get an answer to any blank questions
    const { _type: type, _board: board, _price: price, _stars: stars } = answer;

    await fakeAPICall(1500);
    const allHolidays = await fetch('/data.json', {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
    });
    const holidaydata = await allHolidays.json();

    const typeMatches = holidaydata.filter(hol => hol.type === type);
    const boardMatches = holidaydata.filter(hol => hol.board === board);
    const priceMatches = holidaydata.filter(hol => {
        return [...price].length === 1 ? hol.price === price : hol.price >= price[0] && hol.price <= price[1];
    });
    const starsMatches = holidaydata.filter(hol => [...stars].some(star => star === hol.stars));

    const allMatches = [...typeMatches, ...boardMatches, ...priceMatches, ...starsMatches];
    const bestMatches = priceMatches.filter(match => {
        return match.type === type && match.board === board && [...stars].some(star => star === match.stars);
    })

    console.log({allMatches, bestMatches});

    return generateMatchList(bestMatches);
}

const generateMatchList = (matches) => {
    if (matches.length === 0) {
        return [new Message("We're so sorry but your preferences had no exact matches 😢")];
    }
    // need to add a 0 check and then handle partial returns
    const firstMessage = new Message(`We found <span>${matches.length}</span> exact matches!`, "matches");
    const results = matches.map(res => {
        return new Message(
            `<a href="#">The ${getAdjective(res.type)} ${res.city} city in ${res.country}</a> 
            <table class="result-table">
                <tr>
                    <th>Hotel</th>
                    <td>${res.hotel}</td>
                </tr>
                <tr>
                    <th>Stars</th>
                    <td>${'⭐'.repeat(res.stars)}</td>
                </tr>
                <tr>
                    <th>Board</th>
                    <td>${res.board}</td>
                </tr>
                <tr>
                    <th>Price</th>
                    <td>£${res.price}</td>
                </tr>
            </table>`,
            "result"
        );
    });

    return [firstMessage, ...results];
}

const getAdjective = type => {
    switch (type) {
        case 'hot':
            return 'sunny';
        case 'cold':
            return 'frosty';
        case 'adventure':
            return 'exciting';
        case 'relaxing':
            return 'tranquil';
        case 'beach':
            return 'carefree';
        case 'snow':
            return 'majestic';
        case 'mild':
            return 'temperate'
        case 'sightseeing':
            return 'beautiful';
        default:
            return 'incredible';
    }
}

const getNextMessage = async (stage, input) => {
    await fakeAPICall(1500); // To simulate a call to a db
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
                    return questions[++stage];
                }
            }
            return invalidNumber;
        default:
            return notRecognised;
    }
}

const getKeyWords = msg => [...msg.matchAll(/'(\w*?)'/g)].map(match => match[1]);

const getFirstResponse = () => questions[0];

export {
    getNextMessage,
    getNewStage,
    getFirstResponse,
    calculateResults,
}
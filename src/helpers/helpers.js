import { questions } from "./responses";

const isValidInput = input => input !== "" && input !== null && input !== typeof undefined;

const fakeAPICall = async s => new Promise(res => setTimeout(res, s));

const getKeyWords = msg => [...msg.matchAll(/'(\w*?)'/g)].map(match => match[1]);

const getNewStage = message => questions.findIndex(x => x.msg === message.msg);

const getFirstResponse = () => questions[0];

const lastElement = arr => [...arr][arr.length - 1]; 

const splitAndRemoveSpace = str => str.split(/[\s,-]/g).filter(word => {return word !== ' ' && word !== ''});

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

export {
    isValidInput,
    fakeAPICall,
    getKeyWords,
    getNewStage,
    getFirstResponse,
    getAdjective, 
    lastElement,
    splitAndRemoveSpace,
};
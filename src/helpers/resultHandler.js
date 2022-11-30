import { Answer, Message } from "./classes";
import { noResults, partialMatches } from "./responses";
import { getAdjective, fakeAPICall } from "./helpers";

const answer = new Answer();
const matches = {
    typeMatches: [],
    boardMatches: [],
    priceMatches: [],
    starsMatches: [],
    allMatches: [],
}

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

    matches.typeMatches = holidaydata.filter(hol => hol.type === type);
    matches.boardMatches = holidaydata.filter(hol => hol.board === board);
    matches.priceMatches = holidaydata.filter(hol => {
        return [...price].length === 1 ? hol.price <= price : hol.price >= price[0] && hol.price <= price[1];
    });
    matches.starsMatches = holidaydata.filter(hol => [...stars].some(star => star === hol.stars));

    matches.allMatches = [...matches.typeMatches, ...matches.boardMatches, ...matches.priceMatches, ...matches.starsMatches];
    const bestMatches = matches.priceMatches.filter(match => {
        return match.type === type && match.board === board && [...stars].some(star => star === match.stars);
    })

    return generateMatchList(bestMatches);
}

const generateMatchList = (matches, isPartial = false, type = "") => {
    if (matches.length === 0) {
        return [noResults];
    }
    
    const firstMessage = new Message(
        `We found <span>${matches.length}</span> ${!isPartial ? 'exact' : ''} matches${!isPartial ? '!' : ` for your ${type} preference.`}`, 
        "matches"
    );
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

    return [firstMessage, ...results, partialMatches];
}

const clearAll = () => {
    answer.reset();
    
    matches.typeMatches = [];
    matches.boardMatches = [];
    matches.priceMatches = [];
    matches.starsMatches = [];
    matches.allMatches = [];
}

export { 
    answer,
    matches, 
    calculateResults, 
    generateMatchList,
    clearAll,
}
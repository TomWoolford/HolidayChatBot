import { Answer, Message } from "./classes";
import { noResults, partialMatches } from "./responses";
import { getAdjective, fakeAPICall } from "./helpers";

const answer = new Answer();
const matches = {
    tempMatches: [],
    locationMatches: [],
    categoryMatches: [],
    priceMatches: [],
    starsMatches: [],
    allMatches: [],
}

const calculateResults = async () => {
    const { _temp: temp, _location: location, _category: category, _price: price, _stars: stars } = answer;
    
    await fakeAPICall(1500);
    // Get fake data from json file
    const allHolidays = await fetch('/dataset.json', {
            headers: {
                "Content-temp": "application/json",
                "Accept": "application/json"
            },
    });
    const holidaydata = await allHolidays.json();

    // update match object with relevant filters
    matches.tempMatches = holidaydata.filter(hol => hol.TempRating === temp);
    matches.locationMatches = holidaydata.filter(hol => 
        location.some(loc => hol.Location.some(hl => hl === loc))
    );
    matches.categoryMatches = holidaydata.filter(hol => hol.Category === category);
    matches.priceMatches = holidaydata.filter(hol => {
        return [...price].length === 1 ? hol.PricePerNight <= price : hol.PricePerNight >= price[0] && hol.PricePerNight <= price[1];
    });
    matches.starsMatches = holidaydata.filter(hol => [...stars].some(star => star === hol.StarRating));

    matches.allMatches = [...new Set([...matches.tempMatches, ...matches.locationMatches, ...matches.priceMatches, ...matches.starsMatches])];
    
    const bestMatches = holidaydata.filter(match => {
        return match.TempRating === temp && 
            location.some(loc => match.Location.some(ml => ml === loc)) && 
            match.Category === category && 
            [...price].length === 1 ? match.PricePerNight <= price : match.PricePerNight >= price[0] && match.PricePerNight <= price[1] && 
            [...stars].some(star => star === match.StarRating);
    });
    console.log({...matches, bestMatches})

    return generateMatchList(bestMatches);
}

const generateMatchList = (matches, isPartial = false, type = "") => {
    if (matches.length === 0) {
        return [noResults];
    }
    
    const firstMessage = new Message(
        `We found <span>${matches.length}</span> ${!isPartial ? 'exact' : ''} matches${!isPartial ? '!' : ` for your ${type} preference.`}`, 
        "matches important"
    );
    const results = matches.map(res => {
        console.log(res);
        return new Message(
            `<a href="#">The ${getAdjective(res.TempRating)} ${res.City} city in ${res.Country}</a> 
            <table class="result-table">
                <tr>
                    <th>Hotel</th>
                    <td>${res.HotelName}</td>
                </tr>
                <tr>
                    <th>Stars</th>
                    <td>${'⭐'.repeat(res.StarRating)}</td>
                </tr>
                <tr>
                    <th>Location</th>
                    <td>${res.Location.join(', ')}</td>
                </tr>
                <tr>
                    <th>Category</th>
                    <td>${res.Category}</td>
                </tr>
                <tr>
                    <th>Continent</th>
                    <td>${res.Continent}</td>
                </tr>
                <tr>
                    <th>Price</th>
                    <td>£${res.PricePerNight}</td>
                </tr>
            </table>`,
            "result"
        );
    });

    return [firstMessage, ...results, partialMatches];
}

const clearAll = () => {
    answer.reset();
    
    matches.tempMatches = [];
    matches.locationMatches = [];
    matches.categoryMatches = [];
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
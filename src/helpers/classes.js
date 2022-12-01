class Message {
    constructor(msg, key = "", isUser = false) {
        this.msg = msg;
        this.key = key;
        this.isUser = isUser;
    }
};

class Answer {    
    /**
     * @param {string} temp
     */
    set temp(temp) {
        this._temp = temp;
    }
    /**
     * @param {string[]} location
     */
    set location(location) {
        this._location = location;
    }
    /**
     * @param {number[]} stars
     */
    set stars(stars) {
        this._stars = stars;
    }
    /**
     * @param {number[]} price
     */
    set price(price) {
        this._price = price;
    }

    reset() {
        this._location = [];
        this._price = [];
        this._stars = [];
        this._temp = "";
    }
};

export { Message, Answer }
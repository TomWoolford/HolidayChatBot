class Message {
    constructor(msg, key = "", isUser = false) {
        this.msg = msg;
        this.key = key;
        this.isUser = isUser;
    }
};

class Answer {    
    /**
     * @param {string} type
     */
    set type(type) {
        this._type = type;
    }
    /**
     * @param {string} board
     */
    set board(board) {
        this._board = board;
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
        this._board = "";
        this._price = [];
        this._stars = [];
        this._type = "";
    }
};

export { Message, Answer }
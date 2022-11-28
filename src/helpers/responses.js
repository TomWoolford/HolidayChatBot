class message {
    constructor(msg, isUser) {
        this.msg = msg;
        this.isUser = isUser;
    }
}

const welcomeMessage = new message (
    "Welcome! 😊 How can we help you today? Type 'help' for a list of options, or type 'find' to begin.",
    false
);

const errorMessage = new message (
    "Oh no! Something went wrong 😢 Please refresh the page and try again.", 
    false,
);

export { 
    welcomeMessage,
    errorMessage,
    message
 }
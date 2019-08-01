//declaire variables / objects
const user = {
    wins: 0,
    losses: 0,
    guessesLeft: 15,
    previousGuesses: []
};
const words = ["dirt","stone","cobblestone","sand","obsidian","mycelium",];
const letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

//delaire variables related to the computer chosing a word
let lines = [];
let chosenWord = "";

//creates the lines array for the current word
function setupNewWord(){
    chosenWord = words[Math.floor(Math.random() * words.length)];
    lines = [];
    for (let i = 0; i<chosenWord.length;i++){
        lines.push("_");
    }
}

//load up the necicary things to make the game playable
setupNewWord();
updatePage();

//when someone presses a button
document.onkeyup = function(event){
    let key = event.key.toLocaleLowerCase();
    if(letters.includes(key)){
        checkKey(key);
    } else {

    }
    updatePage()
}

//check if the key pressed it the correct one or not
function checkKey(key){
    if(chosenWord.includes(key)){
        if(!lines.includes(key)){
            for(let i = 0; i<chosenWord.length;i++){
                if(key === chosenWord[i]){
                    lines[i] = key;
                }
            }
        }
    } else {
        if(!user.previousGuesses.includes(key)){
            user.previousGuesses.push(key);
            handleMissedGuess()
        }
    }
}

//handle any missed guess count change
function handleMissedGuess(){
    user.guessesLeft--;
    if(user.guessesLeft < 1){
        setupNewWord();
        user.previousGuesses = [];
        user.guessesLeft = 15;
    }
}


//display info on the page
function updatePage(){
    console.log(
        `
        word: ${chosenWord}
        lines: ${lines.join("")}

        wins: ${user.wins}
        losses: ${user.losses}
        triesLeft: ${user.guessesLeft}
        previous Guesses: ${user.previousGuesses}
        `
    )
}
//declaire variables / objects
const user = {
    wins: 0,
    losses: 0,
    guessesLeft: 15,
    previousGuesses: []
};
const words = ["dirt","stone","cobblestone","sand","obsidian","mycelium","creeper","skeleton","cow","wither","grass","iron","gold","diamond","redstone","coal","pickaxe","wood","wool"];
const letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

//delaire variables related to the computer chosing a word
let lines = [];
let chosenWord = null;
let previousWord = null;

//get the elements of the html file
const previousWordDiv = document.getElementById("previous-word-text");
const chatWindowDiv = document.getElementById("chat-window");

//creates the lines array for the current word
function setupNewWord(){
    if(chosenWord !== null) previousWord = chosenWord;
    chosenWord = words[Math.floor(Math.random() * words.length)];
    lines = [];
    for (let i = 0; i<chosenWord.length;i++){
        lines.push("_");
    }
    if (previousWord !== null) {
        previousWordDiv.innerHTML = `
        <h2>
            Previous Word: ${previousWord}
        </h2>
        `;
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
            if(lines.join("") === chosenWord){
                winningGame();
            }
        }
    } else {
        if(!user.previousGuesses.includes(key)){
            user.previousGuesses.push(key);
            handleMissedGuess();
        }
    }
}

//handle any missed guess count change
function handleMissedGuess(){
    user.guessesLeft--;
    if(user.guessesLeft < 1){
        setupNewWord();
        user.losses++;
        user.previousGuesses = [];
        user.guessesLeft = 15;
    }
}

// if the user wins the game do the below
function winningGame(){
    user.wins++;
    setupNewWord();
    user.previousGuesses = [];
    user.guessesLeft = 15;
}

//display info on the page
function updatePage(){
    chatWindowDiv.innerHTML = `
        <h3>
            ${lines.join(" ")} <br><br>
            Wins: ${user.wins}<br>
            Losses: ${user.losses}<br>
            Attempts Remaining: ${user.guessesLeft}<br><br>
            Guesses: ${user.previousGuesses.join(" ")}
        </h3>
    `;
}

let playerScore = 0;
let computerScore = 0;
let roundsPlayed = 0;

// Store the player's and computer's selections
let playerSelection = null;
let computerSelection = null;

// UI 
document.addEventListener("click", gameSelection);

function gameSelection(event) {
    const element = event.target;

    // button : values
    const playerSelections = {
        "Adnan": "Adnan",
        "Moe": "Moe",
        "Evi": "Evi",
        "Parsa": "Parsa",
        "Gladwin": "Gladwin",
        "Jasir": "Jasir"
    };

    const selectedPlayer = playerSelections[element.id];
    
    if (selectedPlayer) {
        console.log(`Player selected: ${selectedPlayer}`);
        playerSelection = selectedPlayer;
        playRound(playerSelection);
    }
}

function computerPlay(excludeSelection) {
    let options = ["Adnan", "Moe", "Evi", "Parsa", "Gladwin", "Jasir"];
    
    // Remove the player's selection from the options
    if (excludeSelection) {
        const index = options.indexOf(excludeSelection);
        if (index > -1) {
            options.splice(index, 1);
        }
    }

    const randomIndex = Math.floor(Math.random() * options.length);
    computerSelection = options[randomIndex]; 
    console.log(`Computer selected: ${computerSelection}`);
    return computerSelection;
}

function playRound(playerSelection) {
    computerSelection = computerPlay(playerSelection);
    
    const allButtons = {
        "Adnan": {
            selected: document.querySelector("#Adnan"),
            compSelected: document.querySelector("#Adnanc")
        },
        "Moe": {
            selected: document.querySelector("#Moe"),
            compSelected: document.querySelector("#Moec")
        },
        "Evi": {
            selected: document.querySelector("#Evi"),
            compSelected: document.querySelector("#Evic")
        },
        "Parsa": {
            selected: document.querySelector("#Parsa"),
            compSelected: document.querySelector("#Parsac")
        },
        "Gladwin": {
            selected: document.querySelector("#Gladwin"),
            compSelected: document.querySelector("#Gladwinc")
        },
        "Jasir": {
            selected: document.querySelector("#Jasir"),
            compSelected: document.querySelector("#Jasirc")
        }
    };

    // Reset all buttons to lit-down
    for (const [buttonId, { selected, compSelected }] of Object.entries(allButtons)) {
        selected.classList.remove('lit-up');
        selected.classList.add('lit-down');
        compSelected.classList.remove('lit-up');
        compSelected.classList.add('lit-down');
    }

    // Set the selected buttons for the player and computer
    if (playerSelection) {
        allButtons[playerSelection].selected.classList.add('lit-up');
        allButtons[playerSelection].selected.classList.remove('lit-down');
    }
    
    if (computerSelection) {
        allButtons[computerSelection].compSelected.classList.add('lit-up');
        allButtons[computerSelection].compSelected.classList.remove('lit-down');
    }

    // Determine the winner
    let winner = '';
    if (playerSelection && computerSelection) {
        if (playerSelection === computerSelection) {
            winner = 'tie';
        } else {
            winner = Math.random() < 0.5 ? 'player' : 'computer';
        }
    }

    // Update scores
    if (winner === 'player') {
        playerScore++;
        roundsPlayed++;
    } else if (winner === 'computer') {
        computerScore++;
        roundsPlayed++;
    }

    // Display the winner and update textContent
    const resultElement = document.querySelector("#result");
    if (playerScore + computerScore === 5) {
        if (playerScore < computerScore) {
            resultElement.textContent = `You lost! Player: ${playerScore} | Computer: ${computerScore}`;
        } else if (playerScore > computerScore) {
            resultElement.textContent = `You won! Player: ${playerScore} | Computer: ${computerScore}`;
        } else {
            resultElement.textContent = `It's a tie! Player: ${playerScore} | Computer: ${computerScore}`;
        }
        setTimeout(resetGame, 2000);
    } else {
        if (winner === 'player') {
            resultElement.textContent = `${playerSelection} knocked out ${computerSelection}`;
        } else if (winner === 'computer') {
            resultElement.textContent = `${computerSelection} knocked out ${playerSelection}`;
        } else {
            resultElement.textContent = "It's a tie!";
        }
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    roundsPlayed = 0;
    playerSelection = null;
    computerSelection = null;

    const resultElement = document.querySelector("#result");
    resultElement.textContent = "Who will win?";
}

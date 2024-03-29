function getComputerChoice() {
    const options = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random()*3)
    return options[randomIndex];
}

function getPlayerChoice() {
    let userInput;
    while (true) {
        userInput = prompt("Please enter either rock, paper, or scissors:").toLowerCase();

        if (userInput === "scissor") {
            userInput = "scissors";
        }

        if (userInput === "rock" || userInput === "paper" || userInput === "scissors") {
            break;
        } else {
            alert("Invalid input. Please try again."); 
        }
    }
    return userInput;
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return "tied";
    }
    else if (
        (playerSelection === "rock" && computerSelection === "scissors") || 
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
    ) {
        return "player";
        // return "you win! " + playerSelection + " beats " + computerSelection + ".";
    } else {
        return "computer";
        // return "computer wins! " + computerSelection + " beats " + playerSelection + ".";
    }
}


function playGame() {
    let userwins = 0;
    let cpuwins = 0;

    for (let i = 0; i < 5; i++) {
        const playerSelection = getPlayerChoice();
        const computerSelection = getComputerChoice();
        const result = playRound(playerSelection, computerSelection)

        if (result === "player") {
            userwins++;
            console.log(`Round ${i + 1}: Player wins. ${playerSelection} beats ${computerSelection}.`)
        }
        else if (result === "computer") {
            cpuwins++;
            console.log(`Round ${i + 1}: CPU wins. ${computerSelection} beats ${playerSelection}.`)
        }
        else {
            console.log(`Round ${i + 1}: It is a tie! Both chose ${computerSelection}.`)
        }
    }

    if (userwins > cpuwins) {
        console.log(`\nYou win the game! Player Score: ${userwins}, Computer Score: ${cpuwins}`);
    } else if (userwins < cpuwins) {
        console.log(`\nComputer wins the game! Player Score: ${userwins}, Computer Score: ${cpuwins}`);
    } else {
        console.log(`\nIt's a tie game! Player Score: ${userwins}, Computer Score: ${cpuwins}`);
    }
}

playGame();
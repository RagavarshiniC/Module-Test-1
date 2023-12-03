document.addEventListener("DOMContentLoaded", function () {
    const RulesButton = document.getElementById("rulesButton");
    const closeButton = document.querySelector(".closeButton");
    const gameRules = document.getElementById("rulespopup");
    const UserSelection = document.querySelector(".userselection");
    const userscore = document.getElementById("yscore");
    const pcscore = document.getElementById("comScore");
    const pcwin_s = document.querySelector(".pcwin_s");
    const pcwin_r = document.querySelector(".pcwin_r");
    const pcwin_p = document.querySelector(".pcwin_p");
    const resetgame = document.querySelectorAll(".replay");
    const userwin_r = document.querySelector(".userwin_r");
    const userwin_s = document.querySelector(".userwin_s");
    const userwin_p = document.querySelector(".userwin_p");
    

    let playerScore = parseInt(localStorage.getItem("playerScore")) || 0;
    let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;

    userscore.textContent = playerScore;
    pcscore.textContent = computerScore;


    RulesButton.addEventListener("click", toggleGameRules);
    closeButton.addEventListener("click", hideGameRules);
    function toggleGameRules() {
        gameRules.classList.toggle("show");
    }

    function hideGameRules() {
        gameRules.classList.remove("show");
    }
    const nextButtons = document.querySelectorAll(".userwin_r .next,.userwin_s .next, .userwin_p .next");
    nextButtons.forEach(button => button.addEventListener("click",()=> redirectToHurray()));

    function redirectToHurray() {
        window.location.href = "Hurray.html";
    }
   
    resetgame.forEach(button => button.addEventListener("click", resetGame));

    const playerChoices = document.querySelectorAll(".choicerock, .choicescissor, .choicepaper");
    playerChoices.forEach(choice => choice.addEventListener("click", () => handlePlayerChoice(choice)));

    function handlePlayerChoice(choice) {
        const playerChoice = choice.getAttribute("data-choice");
        const computerChoice = getComputerChoice();
        const winner = determineWinner(playerChoice, computerChoice);

        updateScoreDisplay(winner);
        updateResultsDisplay(playerChoice, computerChoice, winner);
    }
    

    function getComputerChoice() {
        const choices = ["rock", "paper", "scissors"];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    function determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return "tie";
        } else if (
            (playerChoice === "rock" && computerChoice === "paper") ||
            (playerChoice === "scissors" && computerChoice === "rock") ||
            (playerChoice === "paper" && computerChoice === "scissors")
        ) {
            return "computer";
        } else {
            return "player";
        }
    }

    function updateScoreDisplay(winner) {
        if (winner === "player") {
            playerScore++;
            userscore.textContent = playerScore;
            localStorage.setItem("playerScore", playerScore);
        } else if (winner === "computer") {
            computerScore++;
            pcscore.textContent = computerScore;
            localStorage.setItem("computerScore", computerScore);
        }
        
    }

    

    function updateResultsDisplay(playerChoice, computerChoice, winner) {
        UserSelection.style.display = "none";
        document.querySelectorAll(".tieRock, .tieScissor, .tiePaper, .pcwin_s, .pcwin_r, .pcwin_p, .userwin_r, .userwin_s, .userwin_p")
            .forEach(element => element.style.display = "none");
       
    const TieRock = document.querySelector(".tieRock");
    const TieScissor = document.querySelector(".tieScissor");
    const TiePaper = document.querySelector(".tiePaper");

        if (winner === "tie") {
            if (playerChoice === "rock") {
                TieRock.style.display = "flex";
            } else if (playerChoice === "scissors") {
                TieScissor.style.display = "flex";
            } else if (playerChoice === "paper") {
                TiePaper.style.display = "flex";
            }
        } else if (winner === "player") {
            showYouWinSection(playerChoice, computerChoice);
        } else if (winner === "computer") {
            showComputerWinSection(playerChoice, computerChoice);
        }
    }

    function showComputerWinSection(playerChoice, computerChoice) {
        UserSelection.style.display = "none";
        document.querySelectorAll(".tieRock, .tieScissor, .tiePaper")
            .forEach(element => element.style.display = "none");
        

        if (playerChoice === "paper" && computerChoice === "scissors") {
            pcwin_s.style.display = "flex";
        } else if (playerChoice === "scissors" && computerChoice === "rock") {
            pcwin_r.style.display = "flex";
        } else if (playerChoice === "rock" && computerChoice === "paper") {
            pcwin_p.style.display = "flex";
        }
    }
    function showYouWinSection(playerChoice, computerChoice) {
        UserSelection.style.display = "none";
        document.querySelectorAll(".tieRock, .tieScissor, .tiePaper")
            .forEach(element => element.style.display = "none");
    

        if (playerChoice === "rock" && computerChoice === "scissors") {
            userwin_r.style.display = "flex";
        } else if (playerChoice === "paper" && computerChoice === "rock") {
            userwin_p.style.display = "flex";
        } else if (playerChoice === "scissors" && computerChoice === "paper") {
            userwin_s.style.display = "flex";
        }

        if (userwin_r.style.display === "flex" || userwin_s.style.display === "flex" || userwin_p.style.display === "flex") {
            RulesButton.classList.add("rules-shifted");
        } else {
            RulesButton.classList.remove("rules-shifted");
        }
    }


    function resetGame() {
            UserSelection.style.display = "flex";
            document.querySelectorAll(".tieRock, .tieScissor, .tiePaper, .pcwin_s, .pcwin_r, .pcwin_p, .userwin_r, .userwin_s, .userwin_p")
            .forEach(element => element.style.display = "none");
          
            RulesButton.classList.remove("rules-shifted");
        };
    
});

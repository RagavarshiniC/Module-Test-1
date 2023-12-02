document.addEventListener("DOMContentLoaded", function () {
    const RulesButton = document.getElementById("rulesButton");
    const closeButton = document.querySelector(".closeButton");
    const gameRules = document.getElementById("rulespopup");
    const UserSelection = document.querySelector(".userselection");
    const userscore = document.getElementById("yscore");
    const pcscore = document.getElementById("comScore");
    const tieRockDiv = document.querySelector(".tieRock");
    const tieScissorDiv = document.querySelector(".tieScissor");
    const tiePaperDiv = document.querySelector(".tiePaper");
    const pcwin_s = document.querySelector(".pcwin_s");
    const pcwin_r = document.querySelector(".pcwin_r");
    const pcwin_p = document.querySelector(".pcwin_p");
    const replayButtons = document.querySelectorAll(".replay");
    const userwin_r = document.querySelector(".userwin_r");
    const userwin_s = document.querySelector(".userwin_s");
    const userwin_p = document.querySelector(".userwin_p");
    const rockNextButton = document.querySelector(".userwin_r .next");
    const paperNextButton = document.querySelector(".userwin_s .next");
    const scissorsNextButton = document.querySelector(".userwin_p .next");

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
    
    if (rockNextButton) {
        rockNextButton.addEventListener("click", function () {
            window.location.href = "Hurray.html";
        });
    }

    if (paperNextButton) {
        paperNextButton.addEventListener("click", function () {
            window.location.href = "Hurray.html";
        });
    }

    if (scissorsNextButton) {
        scissorsNextButton.addEventListener("click", function () {
            window.location.href = "Hurray.html";
        });
    }

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
        
        tieRockDiv.style.display = "none";
        tieScissorDiv.style.display = "none";
        tiePaperDiv.style.display = "none";
        pcwin_s.style.display = "none";
        pcwin_r.style.display = "none";
        pcwin_p.style.display = "none";

        if (winner === "tie") {
            if (playerChoice === "rock") {
                tieRockDiv.style.display = "flex";
            } else if (playerChoice === "scissors") {
                tieScissorDiv.style.display = "flex";
            } else if (playerChoice === "paper") {
                tiePaperDiv.style.display = "flex";
            }
        } else if (winner === "player") {
            showYouWinSection(playerChoice, computerChoice);
        } else if (winner === "computer") {
            showComputerWinSection(playerChoice, computerChoice);
        }
    }

    function showComputerWinSection(playerChoice, computerChoice) {
        UserSelection.style.display = "none";
        tieRockDiv.style.display = "none";
        tieScissorDiv.style.display = "none";
        tiePaperDiv.style.display = "none";

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
        tieRockDiv.style.display = "none";
        tieScissorDiv.style.display = "none";
        tiePaperDiv.style.display = "none";

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


    replayButtons.forEach(button => {
        button.addEventListener("click", function () {
            UserSelection.style.display = "flex";
            tieRockDiv.style.display = "none";
            tieScissorDiv.style.display = "none";
            tiePaperDiv.style.display = "none";
            pcwin_s.style.display = "none";
            pcwin_r.style.display = "none";
            pcwin_p.style.display = "none";
            userwin_r.style.display = "none";
            userwin_s.style.display = "none";
            userwin_p.style.display = "none";
            RulesButton.classList.remove("rules-shifted");
        });
    });
});
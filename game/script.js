var player_choice, bot_choice, phase, player_number, bot_number, winner, ultimate_winner;
/* DATAS */
document.getElementById("totalhead").innerHTML = localStorage.getItem("totalhead");
document.getElementById("totaltail").innerHTML = localStorage.getItem("totaltail");
if (localStorage.getItem("play") != 0) {
    phase = 1;
    document.getElementById("phase1").style.display = "block";
} else {
    phase = 0;
    document.getElementById("phase1").style.display = "none";
}
/* PHASE:TOSS */
function generate_random_number(a, b){
    return Math.floor(Math.random() * (b - a + 1)) + a;
}
function choose_head(){
    player_choice = "head";
    bot_choice = "tail";
    document.getElementById("phase1").style.display = "none";
    document.getElementById("phase2").style.display = "block";
    localStorage.setItem("totalhead", (localStorage.getItem("totalhead") == null ? 0 : parseInt(localStorage.getItem("totalhead"))) + 1);
    phase = 2;
}
function choose_tail(){
    player_choice = "tail";
    bot_choice = "head";
    document.getElementById("phase1").style.display = "none";
    document.getElementById("phase2").style.display = "block";
    localStorage.setItem("totaltail", (localStorage.getItem("totaltail") == null ? 0 : parseInt(localStorage.getItem("totaltail"))) + 1);
    phase = 2;
}
function player_number_choice(number){
    player_number = number;
    document.getElementById("phase2").style.display = "none";
    document.getElementById("phase3").style.display = "block";
    phase = 3;
    bot_number = generate_random_number(1, 5);
    let sum = player_number + bot_number;
    if (sum % 2 == 0) {
        if (player_choice == "tail") {
            winner = "player";
            document.querySelector(".phase3des").innerText = `You Won! Bot chosen ${bot_number}`;
            localStorage.setItem("totalwin", (localStorage.getItem("totalwin") == null ? 0 : parseInt(localStorage.getItem("totalwin"))) + 1);
        } else {
            winner = "bot";
            document.querySelector(".phase3des").innerText = `You Lost! Bot chosen ${bot_number}`;
            localStorage.setItem("totallost", (localStorage.getItem("totallost") == null ? 0 : parseInt(localStorage.getItem("totallost"))) + 1);
        }
    } else {
        if (player_choice == "head") {
            winner = "player";
            document.querySelector(".phase3des").innerText = `You Won! Bot chosen ${bot_number}`;
            localStorage.setItem("totalwin", (localStorage.getItem("totalwin") == null ? 0 : parseInt(localStorage.getItem("totalwin"))) + 1);
        } else {
            winner = "bot";
            document.querySelector(".phase3des").innerText = `You Lost! Bot chosen ${bot_number}`;
            localStorage.setItem("totallost", (localStorage.getItem("totallost") == null ? 0 : parseInt(localStorage.getItem("totallost"))) + 1);
        }
    }
    document.getElementById("totalwin").innerHTML = localStorage.getItem("totalwin");
    document.getElementById("totallost").innerHTML = localStorage.getItem("totallost");
}
/* PHASE:DECESION */
function next(){
    phase = 4;
    document.getElementById("phase3").style.display = "none";
    document.getElementById("phase4").style.display = "block";
    document.getElementById("battingchoice").innerHTML = localStorage.getItem("battingchoice");
    document.getElementById("ballingchoice").innerHTML = localStorage.getItem("ballingchoice");
    document.querySelector(".phase4inps").style.display = "flex";
    if (winner == "player") {
        document.querySelector(".phase4des").innerText = "Choose Batting or Balling!"
        document.querySelector(".phase4bat").style.display = "block";
        document.querySelector(".phase4ball").style.display = "block";
        document.querySelector(".phase4next").style.display = "none";
    } else {
        document.querySelector(".phase4bat").style.display = "none";
        document.querySelector(".phase4ball").style.display = "none";
        document.querySelector(".phase4next").style.display = "block";
        if (generate_random_number(1, 2) == 1) {
            bot_choice = "batting"
            player_choice = "balling"
        } else {
            bot_choice = "balling"
            player_choice = "batting"
        }
        document.querySelector(".phase4des").innerText = `Bot choosed ${bot_choice}`
    }
}
function next_game(){
    phase = 5;
    document.getElementById("phase4").style.display = "none";
    document.getElementById("phase5").style.display = "block";
    GAME();
}
function choose_batting() {
    phase = 5;
    localStorage.setItem("battingchoice", (localStorage.getItem("battingchoice") == null ? 0 : parseInt(localStorage.getItem("battingchoice"))) + 1);
    document.getElementById("phase4").style.display = "none";
    document.getElementById("phase5").style.display = "block";
    bot_choice = "balling"
    player_choice = "batting"
    GAME();
}
function choose_balling() {
    phase = 5;
    localStorage.setItem("ballingchoice", (localStorage.getItem("ballingchoice") == null ? 0 : parseInt(localStorage.getItem("ballingchoice"))) + 1);
    document.getElementById("phase4").style.display = "none";
    document.getElementById("phase5").style.display = "block";
    bot_choice = "batting"
    player_choice = "balling"
    GAME();
}
/* PHASE:GAME PHASE */
function cstatus(message) {
    document.querySelector(".phase5des").innerText = message;
}
function updateList(thelist, value) {
    // Initialize the list with "0 0 0 0 0 0" if empty
    if (thelist.length === 0) {
        thelist.push(...[0, 0, 0, 0, 0, 0]);
    }
    
    // Add the new value to the end
    thelist.push(value);

    // Ensure the list always contains only the last 6 values
    while (thelist.length > 6) {
        thelist.shift(); // Remove the first element if list exceeds size 6
    }

    // Return the updated list in the desired format
    return thelist.map((element) => `${element}`).join(' ');
}

function choose_number(number) {
    var century_counter, half_century_counter, hat_trick, high_score;
    player_number = parseInt(number);
    bot_number = generate_random_number(1, 6);
    if (player_choice == "batting") {
        if (player_number == bot_number) {
            /* OUT */
            wickets -= 1;
            century_counter = 0;
            half_century_counter = 0;
            cstatus(`Player lost a wicket, The bot balled ${bot_number}`)
            if (wickets <= 0) {
                if (game == 1) {
                    game = 2;
                    player_choice = "balling";
                    bot_choice = "batting";
                    target = runs + 1;
                    high_score = runs;
                    if (high_score > parseInt(localStorage.getItem("highscore"))) {
                        localStorage.setItem("highscore", (localStorage.getItem("highscore") == null ? 0 : high_score));
                    }
                    runs = 0;
                    wickets = 10;
                    document.querySelector(".player").innerText = "Bot"
                    document.querySelector(".bot").innerText = "Player"
                    document.querySelector(".phase5title").innerText = "Choose ball."
                    document.querySelector(".targettxt").innerText = `Target: ${target}`;
                    over = [];
                    cstatus(`Player wickets are down! Bot will go for the target of ${target} runs!`)
                } else {
                    if (target > runs) {
                        ultimate_winner = "bot";
                        let result = confirm("GG! The bot has won the game!");
                        if (result) {
                            localStorage.setItem("totalmatchplayed", (localStorage.getItem("totalmatchplayed") == null ? 0 : parseInt(localStorage.getItem("totalmatchplayed"))) + 1);
                            localStorage.setItem("totalmatchlost", (localStorage.getItem("totalmatchlost") == null ? 0 : parseInt(localStorage.getItem("totalmatchlost"))) + 1);
                            window.location.href = "/."; // Replace with your desired URL
                        }
                    }
                }
            }
            document.getElementById("score").innerHTML = `${runs} - ${10 - wickets}`;
        } else {
            runs += player_number;
            half_century_counter += player_number;
            century_counter += player_number;
            if (half_century_counter >= 50) {
                localStorage.setItem("halfcentury", (localStorage.getItem("halfcentury") == null ? 0 : parseInt(localStorage.getItem("halfcentury"))) + 1);
                half_century_counter -= 50;
            }
            if (century_counter >= 100) {
                localStorage.setItem("century", (localStorage.getItem("century") == null ? 0 : parseInt(localStorage.getItem("century"))) + 1);
                century_counter -= 100;
            }
            cstatus(`The player scored ${player_number} runs and bot balled ${bot_number}`)
            document.getElementById("overs").innerHTML = updateList(over, player_number);
            document.getElementById("score").innerHTML = `${runs} - ${10 - wickets}`;
            /* CHECK FOR VICTORY */
            if (game == 2 && target <= runs) {
                ultimate_winner = "player";
                let result = confirm("Bravo! You have won the game");
                if (result) {
                    localStorage.setItem("totalmatchplayed", (localStorage.getItem("totalmatchplayed") == null ? 0 : parseInt(localStorage.getItem("totalmatchplayed"))) + 1);
                    localStorage.setItem("totalmatchwon", (localStorage.getItem("totalmatchwon") == null ? 0 : parseInt(localStorage.getItem("totalmatchwon"))) + 1);
                    window.location.href = "/."; // Replace with your desired URL
                }
            }
        }
    } else { /* Bot is Batting */
        if (player_number == bot_number) {
            /* OUT */
            wickets -= 1;
            if (hat_trick < 3){
                hat_trick += 1;
            }
            if (hat_trick == 3){
                localStorage.setItem("hattrick", (localStorage.getItem("hattrick") == null ? 0 : parseInt(localStorage.getItem("hattrick"))) + 1);
                hat_trick = 0;
            }
            cstatus(`Bot lost a wicket, The player balled ${player_number}`)
            if (wickets <= 0) {
                if (game == 1) {
                    game = 2;
                    player_choice = "batting";
                    bot_choice = "balling";
                    target = runs + 1;
                    runs = 0;
                    wickets = 10;
                    document.querySelector(".player").innerText = "Player"
                    document.querySelector(".bot").innerText = "Bot"
                    document.querySelector(".phase5title").innerText = "Choose run."
                    document.querySelector(".targettxt").innerText = `Target: ${target}`;
                    over = [];
                    cstatus(`Bot wickets are down! Player will go for the target of ${target} runs!`)
                } else {
                    if (target > runs) {
                        ultimate_winner = "player";
                        let result = confirm("Bravo! You have won the game");
                        if (result) {
                            localStorage.setItem("totalmatchplayed", (localStorage.getItem("totalmatchplayed") == null ? 0 : parseInt(localStorage.getItem("totalmatchplayed"))) + 1);
                            localStorage.setItem("totalmatchwon", (localStorage.getItem("totalmatchwon") == null ? 0 : parseInt(localStorage.getItem("totalmatchwon"))) + 1);
                            window.location.href = "/."; // Replace with your desired URL
                        }
                    }
                }
            }
            document.getElementById("score").innerHTML = `${runs} - ${10 - wickets}`;
        } else {
            runs += bot_number;
            if (hat_trick > 0) {
                hat_trick = 0;
            }
            cstatus(`The bot scored ${bot_number} runs and player balled ${player_number}`)
            document.getElementById("overs").innerHTML = updateList(over, bot_number);
            document.getElementById("score").innerHTML = `${runs} - ${10 - wickets}`;
            /* CHECK FOR VICTORY */
            if (game == 2 && target <= runs) {
                ultimate_winner = "bot";
                let result = confirm("GG! The bot has won the game");
                if (result) {
                    localStorage.setItem("totalmatchplayed", (localStorage.getItem("totalmatchplayed") == null ? 0 : parseInt(localStorage.getItem("totalmatchplayed"))) + 1);
                    localStorage.setItem("totalmatchlost", (localStorage.getItem("totalmatchlost") == null ? 0 : parseInt(localStorage.getItem("totalmatchlost"))) + 1);
                    window.location.href = "/."; // Replace with your desired URL
                }
            }
        }
    }
}
function GAME() {
    var over = [];
    var target, runs = 0, wickets = 10, game = 1;
    globalThis.over = over;
    globalThis.target = target;
    globalThis.runs = runs;
    globalThis.wickets = wickets;
    globalThis.game = game;
    document.querySelector(".phase5des").style.display = "flex"
    if (player_choice == "batting"){
        document.querySelector(".phase5title").innerText = "Choose run."
    } else {
        document.querySelector(".phase5title").innerText = "Choose ball."
    }
    player_number = 0;
    bot_number = 0;
    target = 0;
    document.querySelector(".targettxt").innerText = "Making target..."
    if (player_choice=="batting") {
        document.querySelector(".player").innerText = "Player"
        document.querySelector(".bot").innerText = "Bot"
    } else {
        document.querySelector(".player").innerText = "Bot"
        document.querySelector(".bot").innerText = "Player"
    }
}

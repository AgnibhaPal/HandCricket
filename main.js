localStorage.setItem("play", 0);
function play(){
    localStorage.setItem("play", 1);
    window.location.href = "game/game.html";
}
const ids = ["totalmatchplayed", "totalmatchwon", "totalmatchlost","winrate", "century", "halfcentury","hattrick","highscore"];
localStorage.setItem("winrate", (localStorage.getItem("winrate") == null ? 0 : Math.floor((parseInt(localStorage.getItem("totalmatchwon"))/parseInt(localStorage.getItem("totalmatchplayed"))*100))));
ids.forEach((id, index) => {
    const element = document.getElementById(id);
    if (element) {
        if (localStorage.getItem(id) == null){
            element.innerHTML = "0";
        } else {
            element.innerHTML = localStorage.getItem(id);
        }      
    }
});
var highScore = 0;
var scoreEntry;
jQuery("#scoresbtn").on("click", function() {
 jQuery("#content").empty();
 jQuery("#content").append(scoreEntry);
});
jQuery("#creditsbtn").on("click", function() {
 jQuery("#content").empty();
 jQuery("#content").append(
 "<div>" + "Game created by Bob!" + "</div>"
 );
});
jQuery("#helpbtn").on("click", function() {
 jQuery("#content").empty();
 jQuery("#content").append(
 "<ul>"
 + "<li>" + "Press SPACE to bounce away" + "</li>"
 + "<li>" + "Avoid the incoming pipes" + "</li>"
 + "</ul>"
);
});

function registerScore (score) {
  var playerName = prompt("What's your name?");
  if (score > highScore) {
    highScore = score;
    scoreEntry = "<li>" + playerName + ":" + score.toString() + "</li>";  
  }
}

document.addEventListener(
  "DOMContentLoaded",
  function() {
    var canvas;
    canvas = document.getElementById("html-canvas");

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight; 

    var game = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    var bound = Math.min(canvas.width, canvas.height);
    var size = bound / 3;

    var turn = true;
    var gameEnd = false;

    var ctx = canvas.getContext("2d");
    
    function drawBoard() {
        //Add code to draw the board here
        ctx.clearRect(0, 0, canvas.width, canvas.height); //clear it
        
        bound = Math.min(canvas.width, canvas.height);
        size = bound / 3;

        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.strokeStyle = "black";
  
        //find our first point (draw the two vertical lines first)
        ctx.moveTo(size, 0);
        ctx.lineTo(size, bound);
        ctx.moveTo(size * 2, 0);
        ctx.lineTo(size * 2, bound);
        ctx.moveTo(0, size);
        ctx.lineTo(bound, size);
        ctx.moveTo(0, size * 2);
        ctx.lineTo(bound, size * 2);
  
        ctx.stroke();
    };

    drawBoard();

    canvas.addEventListener("click", e => {
        //game end code here 

        var xcoords = e.clientX;
        var ycoords = e.clientY;
  
        //check to see if we're in our tic-tac-toe box.
        if (xcoords > 0 && xcoords < bound && ycoords > 0 && ycoords < bound) {
          //we're in the bound, check to see what square we're in
          x = Math.floor(xcoords / size);
          y = Math.floor(ycoords / size);

          console.log("Clicked in square " + x + "-"  + y)

          //code to draw the marker
           //check to see if we haven't already clicked there
        if (game[y][x] == 0) {
          //check to see who's turn it is and draw the appropriate mark.
          if (turn == true) {
            game[y][x] = 1; //mark the spot as being taken. 

            //draw an X
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.strokeStyle = "black";

            ctx.moveTo(x * size + 10, y * size + 10);
            ctx.lineTo((x + 1) * size - 10, (y + 1) * size - 10);
            ctx.moveTo(x * size + 10, (y + 1) * size - 10);
            ctx.lineTo((x + 1) * size - 10, y * size + 10);
            ctx.closePath();
            ctx.stroke();

          };
          if (turn == false) {
            game[y][x] = 2; //mark the spot as being taken.

            //draw an O
            var radius = size / 2 - 10;
            ctx.beginPath();
            ctx.arc(
              x * size + size / 2,
              y * size + size / 2,
              radius,
              0,
              2 * Math.PI
            );
            ctx.strokeStyle = "black";
            ctx.lineWidth = 5;
            ctx.closePath();
            ctx.stroke();
          };

          turn = !turn; //change whose turn it is
          
          //place win code here
                    var winner  = checkWin(game) //ask our function if someone has won
          if (winner == 1) {
            drawText("X's win!");
          }
          if (winner ==2) {
            drawText("O's win!");
          }
          if (winner == 3) {
            drawText("Draw");
          }
          };
        };
    });

    function drawText(text) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); //clear it
        fontsize = 800;
        ctx.font = fontsize + "px Arial";
        while (ctx.measureText(text).width > bound - 10) {
          fontsize -= 100;
          ctx.font = fontsize + "px Arial";
        }
        ctx.fillText(text, 5, bound / 2);
        gameEnd = true;
    }

}, false)

function checkWin(board) {
    //add code to check if the game is over here 
       var endcount = 0;
  //check win/end conditions
  for (var i = 0; i < 3; i++) {
    //check column
    if (
      board[i][0] != 0 && //has someone played in this square. 
      board[i][1] == board[i][0] && // has the same person played in all the other squares in the column? 
      board[i][2] == board[i][0]
    ) {
      return board[i][0];
    }
    //check row
    if (
      board[0][i] != 0 &&
      board[1][i] == board[0][i] &&
      board[2][i] == board[0][i]
    ) {
      return board[0][i];
    }
    //check how many suqares in column have a mark
    for (var j = 0; j < 3; j++) {
      if (board[i][j] != 0) {
        endcount++;
      }
    }
  }
  //check our diagonals
  if (
    board[0][0] != 0 &&
    board[1][1] == board[0][0] &&
    board[2][2] == board[0][0]
  ) {
    return board[1][1];
  }
  if (
    board[0][2] != 0 &&
    board[1][1] == board[0][2] &&
    board[2][0] == board[0][2]
  ) {
    return board[1][1];
  }

  //check for draw
  if (endcount == 9) {
    return 3;
  }

  return 0; //keep going
};
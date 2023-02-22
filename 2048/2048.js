var board;
var score = 0;
var fila = 4;
var columna = 4;


var un_mute = document.getElementById('un-mute');

function toggleMute() {
    var myAudio = new myAudio('audio_file.mp3');
    myAudio.muted = !myAudio.muted;
 }

window.onload = function () {
    setGame();
    //var audio = new Audio('audio_file.mp3');
    //audio.play();
    
}

function setGame() {
     board = [
         [2, 4, 8, 16],
         [32, 64, 128, 256],
         [512, 1024, 2048, 4096],
         [8192, 4, 8, 8]
   ];

   

    for (let f = 0; f < fila; f++) {
        for (let c = 0; c < columna; c++) {
            let tile = document.createElement("div");
            tile.id = f.toString() + "-" + c.toString();
            let num = board[f][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; 
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {
            tile.classList.add("x" + num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}






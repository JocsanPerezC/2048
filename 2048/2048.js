var board;
var score = 0;
var filas = 4;
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
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columna; c++) {
            let tile = document.createElement("div");
            tile.id = f.toString() + "-" + c.toString();
            let num = board[f][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();
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

document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
        setTwo();
    }
    else if (e.code == "ArrowRight") {
        slideRight();
        setTwo();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        setTwo();

    }
    else if (e.code == "ArrowDown") {
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score;
})

function filterZero(filas){
    return filas.filter(num => num != 0); 
}

function slide(filas) {
    //[0, 2, 2, 2] 
    filas = filterZero(filas); //[2, 2, 2]
    for (let i = 0; i < filas.length-1; i++){
        if (filas[i] == filas[i+1]) {
            filas[i] *= 2;
            filas[i+1] = 0;
            score += filas[i];
        }
    } //[4, 0, 2]
    filas = filterZero(filas); //[4, 2]
   
    
    while (filas.length < columna) {
        filas.push(0);
    } //[4, 2, 0, 0]
    return filas;
}

function slideLeft() {
    for (let r = 0; r < filas; r++) {
        let filas = board[r];
        filas = slide(filas);
        board[r] = filas;
        for (let c = 0; c < columna; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < filas; r++) {
        let filas = board[r];         //[0, 2, 2, 2]
        filas.reverse();              //[2, 2, 2, 0]
        filas = slide(filas)            //[4, 2, 0, 0]
        board[r] = filas.reverse();   //[0, 0, 2, 4];
        for (let c = 0; c < columna; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < columna; c++) {
        let filas = [board[0][c], board[1][c], board[2][c], board[3][c]];
        filas = slide(filas);

        for (let r = 0; r < filas; r++){
            board[r][c] = filas[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columna; c++) {
        let filas = [board[0][c], board[1][c], board[2][c], board[3][c]];
        filas.reverse();
        filas = slide(filas);
        filas.reverse();

        for (let r = 0; r < filas; r++){
            board[r][c] = filas[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
      

        let r = Math.floor(Math.random() * filas);
        let c = Math.floor(Math.random() * columna);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < filas; r++) {
        for (let c = 0; c < columna; c++) {
            if (board[r][c] == 0) { 
                return true;
            }
        }
    }
    return false;
}



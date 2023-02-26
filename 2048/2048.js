var board;
var score = 0;
var filas = 4;
var columnas = 4;

window.onload = function() {
    setGame();
}

function setGame() {

    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
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
            tile.classList.add("x"+num.toString());
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

function filterZero(fila){
    return fila.filter(num => num != 0); 
}

function slide(fila) {
    //[0, 2, 2, 2] 
    fila = filterZero(fila); //[2, 2, 2]
    for (let i = 0; i < fila.length-1; i++){
        if (fila[i] == fila[i+1]) {
            fila[i] *= 2;
            fila[i+1] = 0;
            score += fila[i];
        }
    } //[4, 0, 2]
    fila = filterZero(fila); //[4, 2]
    while (fila.length < columnas) {
        fila.push(0);
    } //[4, 2, 0, 0]
    return fila;
}

function slideLeft() {
    for (let f = 0; f < filas; f++) {
        let fila = board[f];
        fila = slide(fila);
        board[f] = fila;
        for (let c = 0; c < columnas; c++){
            let tile = document.getElementById(f.toString() + "-" + c.toString());
            let num = board[f][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let f = 0; f < filas; f++) {
        let fila = board[f];         //[0, 2, 2, 2]
        fila.reverse();              //[2, 2, 2, 0]
        fila = slide(fila)            //[4, 2, 0, 0]
        board[f] = fila.reverse();   //[0, 0, 2, 4];
        for (let c = 0; c < columnas; c++){
            let tile = document.getElementById(f.toString() + "-" + c.toString());
            let num = board[f][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < columnas; c++) {
        let fila = [board[0][c], board[1][c], board[2][c], board[3][c]];
        fila = slide(fila);

        for (let r = 0; r < filas; r++){
            board[r][c] = fila[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columnas; c++) {
        let fila = [board[0][c], board[1][c], board[2][c], board[3][c]];
        fila.reverse();
        fila = slide(fila);
        fila.reverse();

        for (let f = 0; f < filas; f++){
            board[f][c] = fila[f];
            let tile = document.getElementById(f.toString() + "-" + c.toString());
            let num = board[f][c];
            updateTile(tile, num);
        }
    }
    tile.slideInDown;
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        let f = Math.floor(Math.random() * filas);
        let c = Math.floor(Math.random() * columnas);
        if (board[f][c] == 0) {
            board[f][c] = 2;
            let tile = document.getElementById(f.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function hasEmptyTile() {
    let count = 0;
    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
            if (board[f][c] == 0) { 
                return true;
            }
        }
    }
    return false;
}

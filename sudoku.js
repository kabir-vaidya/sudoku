let board = [
    [1, 0, 0, 4, 8, 9, 0, 0, 6],
    [7, 3, 0, 0, 5, 0, 0, 4, 0],
    [4, 6, 0, 0, 0, 1, 2, 9, 5],
    [3, 8, 7, 1, 2, 0, 6, 0, 0],
    [5, 0, 1, 7, 0, 3, 0, 0, 8],
    [0, 4, 6, 0, 9, 5, 7, 1, 0],
    [9, 1, 4, 6, 0, 0, 0, 8, 4],
    [0, 2, 0, 0, 4, 0, 0, 3, 7],
    [8, 0, 3, 5, 1, 2, 0, 0, 4],
];

let rowHash = new Array(9).fill(0).map(() => new Array(9).fill(0));;
let colHash = new Array(9).fill(0).map(() => new Array(9).fill(0));;
let row = -1;
let col = -1;
let grid = new Array(9).fill(0).map(() => new Array(9).fill(0));

function initHash(){
    for(let row=0; row<9; row++){
        for(let col = 0; col<9; col++){
            let val = board[row][col];
            if(val!=0){
                val -=1;
                colHash[col][val] = 1;
                rowHash[row][val] = 1;
                setGrid(row, col, val, 1);
            }
        }
    }
}

function getGrid(row, col){
    let gridNo = -1;
    if(row<=2 && col <= 2) gridNo = 0;
    else if(row<=2 && col <= 5) gridNo = 1;
    else if(row<=2 && col <= 8) gridNo = 2;    
    else if(row<=5 && col <= 2) gridNo = 3;    
    else if(row<=5 && col <= 5) gridNo = 4;    
    else if(row<=5 && col <= 8) gridNo = 5;    
    else if(row<=8 && col <= 2) gridNo = 6;    
    else if(row<=8 && col <= 5) gridNo = 7;    
    else if(row<=8 && col <= 8) gridNo = 8;
    return gridNo;
}

function setGrid(row, col, val, result){
    let gridNo = getGrid(row, col);  
    grid[gridNo][val] = result;
}

function checkRow(row, val){
    if(rowHash[row][val] == 0) return true;
    return false;
}

function checkCol(col, val){

    if(colHash[col][val] == 0) return true;
    return false;
}

function checkGrid(row, col, val){
    
    let gridNo = getGrid(row, col);
    if(grid[gridNo][val] == 0) return true;
    return false;
}



function setBoard(row, col) {
    initHash();
    if(row == 9 ) {
        console.log(board);
        return true;
    }

    if (board[row][col]==0){
        for(let val = 0; val<9; val++){    
            if(checkCol(col, val) && checkRow(row, val) && checkGrid(row, col, val)){
                colHash[col][val] = 1;
                rowHash[row][val] = 1;
                setGrid(row, col, val, 1);
                board[row][col] = val+1;
                let newRow=row, newCol;
                if(col == 8){
                    newRow = row+1;
                    newCol = 0;
                } else newCol+=1;
                if(!setBoard(row, col)) {
                    board[row][col] = 0;
                    colHash[col][val] = 0;
                    rowHash[row][val] = 0;
                    setGrid(row, col, val, 0);    
                } else return true;
                }
        }
    } else {
        if(col == 8){
           return setBoard(row+1, 0);
        } else return setBoard(row, col+1);
    }
    return false;
}

if(setBoard(0,0)) console.log("Solvable")
else console.log("Unsolvable");
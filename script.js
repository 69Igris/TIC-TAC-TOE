const gameCells = document.querySelectorAll('.cell')
const player1 = document.querySelector('.player1')
const player2 = document.querySelector('.player2')
const restartBtn = document.querySelector('.restartBtn')
const alertbox = document.querySelector('.alertbox')


let currentplayer = 'X';
let nextplayer = 'O';
let playerTurn = currentplayer

player1.textContent =`Player 1: ${currentplayer}`
player2.textContent = `Player 2: ${currentplayer}`

const startGame = () =>{
    gameCells.forEach(cell =>{
        cell.addEventListener('click',handleClick)
    })
}

const handleClick = (e) =>{
    if(e.target.textContent==''){
        e.target.textContent = playerTurn}
        if(checkWin()){
            // console.log(`${playerTurn} is a Winner!`)
            showAlert(`${playerTurn} is a Winner!`)
            disablrCells()
        }
        else if(checkTie()){
            // console.log(`It's a Draw!`)
            showAlert(`It's a Draw!`)
            disablrCells()
        }
        else{
            changePlayerTurn()
            showAlert(`Turn for Player: ${playerTurn}`)
        }
}


const changePlayerTurn = () => {
    if(playerTurn === currentplayer){
        playerTurn = nextplayer
    }
    else{
        playerTurn = currentplayer
    }
}


const checkWin = () =>{
    const winningConditions = 
    [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    for(let i = 0; i < winningConditions.length; i++){
        const[pos1,pos2,pos3] = winningConditions[i]
        if(gameCells[pos1].textContent===gameCells[pos2].textContent && gameCells[pos2].textContent===gameCells[pos3].textContent && gameCells[pos1].textContent!==''){
            return true
        }
    }
    return false
}

const checkTie = () =>{
    let emptyCellCounts = 0;
    gameCells.forEach(cell => {
        if(cell.textContent===''){
            emptyCellCounts++
        }
    })
    return emptyCellCounts===0 && !checkWin()
}

const disablrCells = () =>{
    gameCells.forEach(element => {
        element.removeEventListener('click',handleClick)
        element.classList.add('disabled')
    });
}

const restartGame = () =>{
    gameCells.forEach(element => {
        element.textContent = ''
        element.classList.remove('disabled')
    })
    startGame()
}

const showAlert =(msg)=>{
    alertbox.style.display = 'block';
    alertbox.textContent = msg
    setTimeout(()=>{
        alertbox.style.display = 'none'
    },3000)
}


restartBtn.addEventListener('click',restartGame)


startGame();



import { useState } from "react"
import Card from "../Card/Card.jsx"
import './Grid.css';
import checkWinner from "../../helpers/checkWinner.js";


function Grid({numberOfCards}){

    const [board, setBoard] = useState(Array(numberOfCards).fill(""));

    const [turn,setTurn] = useState(true);

    const [winner, setWinner] = useState(null);

    const [isDraw,setIsDraw] = useState(false);

    function play(idx){
        if(turn == true){
            board[idx]='O';
        }
        else{
            board[idx]='X';
        }

        setBoard([...board]);
        setTurn(!turn);

        let win = checkWinner(board,(turn)? 'O':'X');
        if(win){
            setWinner(win);
        }
        else if(!board.includes('')){
            setIsDraw(true);
        }
    }

    function reset(){
        setBoard(Array(numberOfCards).fill(""));
        setTurn(true);
        setWinner(null);
        setIsDraw(false);
    }


    return(
        <div className="grid-wrapper">
            {
                winner && (
                    <>
                        <h2 className="turn-highlight">Winner is {winner}</h2>
                        <button className="reset" onClick={reset}>Reset Game</button>
                    </>
                )
            }

            {
                isDraw && (
                    <>
                        <h2 className="turn-highlight">It's a Draw</h2>
                        <button className="reset" onClick={reset}>Reset Game</button>
                    </>
                )
            }
            {
                !isDraw && !winner && (
                    <>
                        <h1 className="turn-highlight">Current Turn: {(turn)? 'O' : 'X'}</h1>
                    </>
                )
            }

            <div className="grid">
                {board.map((ele,idx)=> <Card gameEnd={winner? true:false} key={idx} player={ele}  index={idx}  onPlay={play}/>)}
            </div>
        </div>
    )
}


export default Grid;
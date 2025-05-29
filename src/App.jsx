import { useState } from 'react'
import './App.css'
import Square from './components/Square'
import confetti from 'canvas-confetti';


const TURNS = {
	X: 'x',
	O: 'o'
}

const WINNER_COMBOS = [
	[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0, 4,8], [2, 4, 6]
]; 

function App() {

	// Creamos el useState que este 'controlando' el tablero.
	const [board, setBoard] = useState(Array(9).fill(null));

	// Creamos el useState que este 'controlando' de quien es el turno
	const [turn, setTurn] = useState(TURNS.X);

	// Creamos el useState que este 'controlando' si hay algun ganador
	const [winner, setWinner] = useState(null); // null no hay ganador. false hay un empate

	const resetGame = () => {
		setBoard(Array(9).fill(null));
		setTurn(TURNS.X);
		setWinner(null);
	}

	// Funcion para chequear si hay ganador
	const checkWinner = (boardToCheck) => {
		for (const combo of WINNER_COMBOS) {
			const [a,b,c] = combo
			if (
				boardToCheck[a] &&
				boardToCheck[a] === boardToCheck[b] &&
				boardToCheck[a] === boardToCheck[c]
			) {
				return  boardToCheck[a];
			}
		}
		//Si no hay ganador
		return null;
	}

	const checkEndGame = (newBoard) => {
		return newBoard.every((square) => square != null)
	}

	// Funcion para actualizar el tablero cada vez que se hace click sobre un cuadrado.
	const updateBoard = (index) =>{
		// no actualizamos esta posicion si ya tiene algo
		if (board[index] || winner) return

		// escribimos en el tablero o la X u la O.
		const newBoard = [...board] // se hace la copia para evitar modificar el original
		newBoard[index] = turn;
		setBoard(newBoard);
		
		// actualizamos el turno
		const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
		setTurn(newTurn)

		// revisamos si hay ganador
		const newWinner = checkWinner(newBoard)
		if(newWinner) {
			confetti()
			setWinner(newWinner);
		} else if (checkEndGame(newBoard)) {
			setWinner(false);
		}
    }
	
	return (
		<main className='board'>
			<h1>TIC TAC TOE</h1>
			<section className='game'>
				{board.map((e, index) => {
				return (
					<Square 
						key={index}
						index={index}
						updateBoard={updateBoard}
					>
						{board[index]}
					</Square>
				)
			})
		}
		</section>

		<section className='turn'>
			<Square isSelected={turn === TURNS.X}>
				{TURNS.X}
			</Square>
			<Square isSelected={turn === TURNS.O}>
				{TURNS.O}
			</Square>
		</section>

		{winner !== null && (
			<section className='winner'>
				<div className='text'>
					<h2>
						{winner === false ? 'Empate' : 'Gano ' + winner}
					</h2>

					<footer>
						<button onClick={resetGame}>Empezar de nuevo!</button>
					</footer>
				</div>
			</ section>
		)}
		</main>
	)
}

export default App
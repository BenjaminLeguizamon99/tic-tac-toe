import { useState } from 'react'
import './App.css'
import Square from './components/Square'
import confetti from 'canvas-confetti';
import WinnerModal from './components/WinnerModal.jsx'
import {TURNS} from './constants.js'
import { checkWinner, checkEndGame } from './logic/board.js';

function App() {

	// Creamos el useState que este 'controlando' el tablero.
	const [board, setBoard] = useState(()=> {
		const boardFromStorage = window.localStorage.getItem('board')
		return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
	});

	// Creamos el useState que este 'controlando' de quien es el turno
	const [turn, setTurn] = useState(() => {
		const turnFromStorage = window.localStorage.getItem('turn')
		return turnFromStorage ?? TURNS.X
	});

	// Creamos el useState que este 'controlando' si hay algun ganador
	const [winner, setWinner] = useState(null); // null no hay ganador. false hay un empate

	const resetGame = () => {
		setBoard(Array(9).fill(null));
		setTurn(TURNS.X);
		setWinner(null);

		window.localStorage.removeItem('board');
		window.localStorage.removeItem('turn')
	}

	// Funcion para actualizar el tablero cada vez que se hace click sobre un cuadrado.
	const updateBoard = (index) => {
		// no actualizamos esta posicion si ya tiene algo
		if (board[index] || winner) return

		// escribimos en el tablero o la X u la O.
		const newBoard = [...board] // se hace la copia para evitar modificar el original
		newBoard[index] = turn;
		setBoard(newBoard);

		// actualizamos el turno
		const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
		setTurn(newTurn)

		// Guardamos partida con el localStorage
		window.localStorage.setItem('board', JSON.stringify(newBoard))
		window.localStorage.setItem('turn', newTurn)
		// revisamos si hay ganador
		const newWinner = checkWinner(newBoard)
		if (newWinner) {
			confetti()
			setWinner(newWinner);
		} else if (checkEndGame(newBoard)) {
			setWinner(false);
		}
	}

	return (
		<main className='board'>
			<h1>TIC TAC TOE</h1>
			<button onClick={resetGame} className='btn-reset'>Reset del juego</button>
			<section className='game'>
			{/*Podemos hacer que todo esto sea un componente TO-DO */}
				{board.map((e, index) => {
					return (
						<Square
							key={index}
							index={index}
							updateBoard={updateBoard}
						>
							{board[index]}
						</Square>
					)})
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
			<WinnerModal winner={winner} resetGame={resetGame} />
		</main>
	)
}

export default App
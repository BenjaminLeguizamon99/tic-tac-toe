import { WINNER_COMBOS } from '../constants.js'

// Funcion para chequear si hay ganador
export const checkWinner = (boardToCheck) => {
	for (const combo of WINNER_COMBOS) {
		const [a, b, c] = combo
		if (
			boardToCheck[a] &&
			boardToCheck[a] === boardToCheck[b] &&
			boardToCheck[a] === boardToCheck[c]
		) {
			return boardToCheck[a];
		}
	}
	//Si no hay ganador
	return null;
}


export const checkEndGame = (newBoard) => {
	return newBoard.every((square) => square != null) // Revisamos si hay un empate si no hay mas espacios vacios en el tablero.
	
}
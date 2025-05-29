import { useState } from 'react';
import '../App.css';
import confetti from 'canvas-confetti'

function Square({ children, updateBoard, index, isSelected }) {

    const handleClick = () => {
        updateBoard(index);
    }

    const className = `square ${isSelected ? 'is-selected' : ''}`

    return (
        <div className={className} onClick={handleClick}>
                {children}
        </div>
    )
}

export default Square;
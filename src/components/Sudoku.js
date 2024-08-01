import React, { useState } from 'react';
import '../styles/Sudoku.css';

const generateNewBoard = () => {
  const emptyBoard = Array(9).fill().map(() => Array(9).fill(null));

  const isValidPlacement = (board, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) return false;
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) return false;
      }
    }

    return true;
  };

  const solver = (board) => {
    const findEmpty = (board) => {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (board[i][j] === null) return [i, j];
        }
      }
      return null;
    };

    const empty = findEmpty(board);
    if (!empty) return true;

    const [row, col] = empty;
    const numbers = Array.from({ length: 9 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
    for (let num of numbers) {
      if (isValidPlacement(board, row, col, num)) {
        board[row][col] = num;
        if (solver(board)) return true;
        board[row][col] = null;
      }
    }
    return false;
  };

  const newBoard = emptyBoard.map((row) => row.slice());
  solver(newBoard);

  // Remove some values to create the puzzle (difficulty level can be adjusted here)
  for (let i = 0; i < 81; i++) {
    if (Math.random() < 0.5) {
      const row = Math.floor(i / 9);
      const col = i % 9;
      newBoard[row][col] = null;
    }
  }

  return newBoard;
};

const isValidSudoku = (board) => {
  const isValid = (arr) => {
    const filtered = arr.filter((num) => num !== null);
    return new Set(filtered).size === filtered.length;
  };

  for (let i = 0; i < 9; i++) {
    if (!isValid(board[i])) return false;
    if (!isValid(board.map((row) => row[i]))) return false;
  }

  for (let row = 0; row < 9; row += 3) {
    for (let col = 0; col < 9; col += 3) {
      const block = [];
      for (let r = row; r < row + 3; r++) {
        for (let c = col; c < col + 3; c++) {
          block.push(board[r][c]);
        }
      }
      if (!isValid(block)) return false;
    }
  }

  return true;
};

const solveSudoku = (board) => {
  const findEmpty = (board) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === null) return [i, j];
      }
    }
    return null;
  };

  const isValidPlacement = (board, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) return false;
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) return false;
      }
    }

    return true;
  };

  const solver = (board) => {
    const empty = findEmpty(board);
    if (!empty) return true;

    const [row, col] = empty;
    for (let num = 1; num <= 9; num++) {
      if (isValidPlacement(board, row, col, num)) {
        board[row][col] = num;
        if (solver(board)) return true;
        board[row][col] = null;
      }
    }
    return false;
  };

  const newBoard = board.map((row) => row.slice());
  solver(newBoard);
  return newBoard;
};

const Sudoku = () => {
  const [board, setBoard] = useState(generateNewBoard());

  const handleChange = (row, col, value) => {
    if (value === '') value = null;
    if (value !== null) value = parseInt(value);

    const newBoard = board.map((r, rIdx) =>
      r.map((cell, cIdx) => (rIdx === row && cIdx === col ? value : cell))
    );
    setBoard(newBoard);
  };

  const checkBoard = () => {
    if (isValidSudoku(board)) {
      alert('The board is valid!');
    } else {
      alert('The board is invalid!');
    }
  };

  const solveBoard = () => {
    const solvedBoard = solveSudoku(board);
    setBoard(solvedBoard);
  };

  const generateBoard = () => {
    const newBoard = generateNewBoard();
    setBoard(newBoard);
  };

  return (
    <div>
      <h2>Sudoku Game</h2>
      <div className="sudoku-board">
        {board.map((row, rIdx) => (
          <div key={rIdx} className="sudoku-row">
            {row.map((cell, cIdx) => (
              <input
                key={cIdx}
                type="text"
                value={cell === null ? '' : cell}
                onChange={(e) => handleChange(rIdx, cIdx, e.target.value)}
                maxLength="1"
                className="sudoku-cell"
              />
            ))}
          </div>
        ))}
      </div>
      <div className="sudoku-buttons">
        <button onClick={checkBoard}>Check Board</button>
        <button onClick={solveBoard}>Solve Board</button>
        <button onClick={generateBoard}>Generate New Board</button>
      </div>
    </div>
  );
};

export default Sudoku;

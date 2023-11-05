import React, { useState } from 'react';

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [nextValue, setNextValue] = useState(calculateNextValue(squares));
  const winner = calculateWinner(squares);

  function selectSquare(square) {
    if (squares[square] || winner) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[square] = nextValue;
    setSquares(newSquares);
    setNextValue(calculateNextValue(newSquares));
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setNextValue(calculateNextValue(Array(9).fill(null)));
  }

  function renderSquare(i) {
    return (
      <button
        key={i}
        className="w-16 h-16 bg-gray-200 border border-gray-300 text-3xl font-bold focus:outline-none"
        onClick={() => selectSquare(i)}
      >
        {squares[i]}
      </button>
    );
  }

  const boardRows = Array.from({ length: 3 }, (_, row) => (
    <div key={row} className="grid grid-cols-3 gap-2 mb-2">
      {Array.from({ length: 3 }, (_, col) => (
        <div key={col} className="relative">
          {renderSquare(row * 3 + col)}
          <div
            className="absolute w-px bg-gray-300"
            style={{ left: 'calc(100% - 1px)' }}
          />
        </div>
      ))}
    </div>
  ));
  
  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded bg-gray-100">
      <div className="mb-4 text-center font-bold text-xl">
        STATUS: {calculateStatus(winner, squares, nextValue)}
      </div>
      {boardRows}
      <div className="flex justify-center items-center mt-2">
        <button
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          onClick={restart}
        >
          Restart
        </button>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <Board />
      </div>
    </div>
  );
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;

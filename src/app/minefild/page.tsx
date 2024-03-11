"use client";

import { useEffect, useState } from "react";

interface IMineBoard {
  isShow: boolean
  cell: number
}

interface IMinefieldReturn {
  seed: number,
  height: number,
  width: number,
  mines: number
  board: IMineBoard[][];
}

export default function Minefield() {

  const [seed, setSeed] = useState<number>()
  const [minefield, setMinefield] = useState<IMinefieldReturn>()

  function createMinefield(
    seed: number,
    height: number,
    width: number,
    mines: number,
  ): IMinefieldReturn {
    function random() {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    }

    const board: IMineBoard[][] = [[{ cell: 0, isShow: false }]]
    for (let i = 0; i < height; i++) {
      board[i] = [];
      for (let j = 0; j < width; j++) {
        board[i][j] = { cell: 0, isShow: false }
      }
    }

    let minesPlaced = 0;
    while (minesPlaced < mines) {
      const x = Math.floor(random() * width);
      const y = Math.floor(random() * height);

      if (board[y][x].cell !== -1) {
        board[y][x].cell = -1;
        minesPlaced++;
      }
    }

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (board[i][j].cell === -1) {
          for (
            let y = Math.max(0, i - 1);
            y <= Math.min(height - 1, i + 1);
            y++
          ) {
            for (
              let x = Math.max(0, j - 1);
              x <= Math.min(width - 1, j + 1);
              x++
            ) {
              if (board[y][x].cell !== -1) {
                board[y][x].cell++;
              }
            }
          }
        }
      }
    }

    return {
      seed,
      width,
      height,
      mines,
      board,
    };
  }


  // const handleClick = (rowIndex: number, cellIndex: number) => {
  //   if (minefield) {
  //     const newMineBoard: IMinefieldReturn = minefield
  //     newMineBoard.board[rowIndex][cellIndex].isShow = true
  //     setMinefield(newMineBoard)
  //   }
  // }

  const handleClick = (rowIndex: number, cellIndex: number): void => {
    if (minefield) {
      setMinefield((prevMinefield: IMinefieldReturn | undefined): IMinefieldReturn | undefined => {
        if (prevMinefield) {
          const newMinefield: IMinefieldReturn = { ...prevMinefield };
          newMinefield.board = prevMinefield.board.map((row: IMineBoard[], i: number): IMineBoard[] =>
            i === rowIndex
              ? row.map((cell: IMineBoard, j: number): IMineBoard =>
                j === cellIndex ? { ...cell, isShow: true } : cell
              )
              : row
          );
          return newMinefield;
        } else {
          return prevMinefield; // Caso o prevMinefield seja undefined, retorna ele mesmo
        }
      });
    }
  };

  const createCell = (cellObj: IMineBoard, cellIndex: number, rowIndex: number) => {
    const evenRow = rowIndex % 2 === 0 && cellIndex % 2 === 0 ? 'bg-red-800' : 'bg-red-900'
    const oddRow = rowIndex % 2 !== 0 && cellIndex % 2 !== 0 ? 'bg-red-800' : 'bg-red-900'

    return (
      <>
        {cellObj.isShow ?
          <div
            className='
          w-8
          h-8            
          text-center 
          flex 
          items-center 
          justify-center'
          >{cellObj.cell}</div>
          : <button
            type="button"
            key={cellIndex}
            className={`
          w-8
          h-8            
          ${rowIndex % 2 === 0 ? evenRow : oddRow} 
          text-center 
          flex 
          items-center 
          justify-center`}
            onClick={() => handleClick(rowIndex, cellIndex)}
          >
          </button>}
      </>
    );
  };

  const creategame = (seed: number) => {
    const mine: IMinefieldReturn = createMinefield(seed, 16, 18, 40);
    setMinefield(mine)
  }

  const renderBoard = () => {
    return <>
      {
        minefield &&
        minefield.board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center items-center">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex}>
                {createCell(cell, cellIndex, rowIndex)}
              </div>
            ))}
          </div>
        ))
      }
    </>
  }

  useEffect(() => {
    const randomSeed = Math.floor(Math.random() * 10000)
    setSeed(randomSeed)
  }, [])

  // logs
  useEffect(() => {
    console.log("🚀 ~ minefield:", minefield)
  }, [minefield])


  return (
    <div className="minefield m-20">
      {
        !minefield &&
        <div className="space-x-4">
          <button type="button" onClick={() => seed && creategame(seed)}>
            Iniciar
          </button>
          <input
            className="text-red-950"
            type="number"
            name="seed"
            onKeyDown={
              e => e.key === 'Enter' && seed && creategame(seed)}
            onChange={
              e => setSeed(parseInt(e.currentTarget.value))} />
        </div>
      }
      {renderBoard()}
    </div>

  );
}

{/* {minefield &&
  minefield.board.map((row, rowIndex) => (
    <div key={rowIndex} className="flex justify-center items-center">
      {row.map((cell, cellIndex) => (
        <div key={cellIndex}>
          {createCell(cell, cellIndex, rowIndex)}
        </div>
      ))}
    </div>
  ))
} */}
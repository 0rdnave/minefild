"use client";

import { useEffect, useState } from "react";
import { Virus2 } from "react-bootstrap-icons";

interface IMinefildCell {
  isShow: boolean;
  cell: number;
}

interface IMinefield {
  seed: number;
  height: number;
  width: number;
  mines: number;
  board: IMinefildCell[][];
}

export default function Minefield() {
  const [seed, setSeed] = useState<number>();
  const [minefield, setMinefield] = useState<IMinefield>();
  const [isShowing, setIssShowing] = useState(true);

  function createMinefield(
    seed: number,
    height: number,
    width: number,
    mines: number
  ): IMinefield {
    function random() {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    }

    const board: IMinefildCell[][] = [[{ cell: 0, isShow: false }]];
    for (let i = 0; i < height; i++) {
      board[i] = [];
      for (let j = 0; j < width; j++) {
        board[i][j] = { cell: 0, isShow: false };
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

  const handleClick = (rowIndex: number, cellIndex: number): void => {
    if (minefield) {
      setMinefield(
        (prevMinefield: IMinefield | undefined): IMinefield | undefined => {
          if (prevMinefield) {
            const newMinefield: IMinefield = { ...prevMinefield };
            if (
              newMinefield.board[rowIndex] &&
              newMinefield.board[rowIndex][cellIndex]
            ) {
              newMinefield.board[rowIndex][cellIndex].isShow = true;
            }
            return newMinefield;
          }
        }
      );
    }
    return;
  };

  const createCell = (
    cellObj: IMinefildCell,
    cellIndex: number,
    rowIndex: number
  ) => {
    let cellColor = ''
    const evenRowHide =
      rowIndex % 2 === 0 && cellIndex % 2 === 0 ? "bg-lime-400" : "bg-lime-500";
    const oddRowHide =
      rowIndex % 2 !== 0 && cellIndex % 2 !== 0 ? "bg-lime-400" : "bg-lime-500";

    const evenRowShow =
      rowIndex % 2 === 0 && cellIndex % 2 === 0 ? "bg-yellow-200/80" : "bg-yellow-200/90";
    const oddRowShow =
      rowIndex % 2 !== 0 && cellIndex % 2 !== 0 ? "bg-yellow-200/80" : "bg-yellow-200/90";

    switch (cellObj.cell) {
      case 1:
        cellColor = 'text-white'
        break;
      case 2:
        cellColor = 'text-blue-600'
        break;
      case 3:
        cellColor = 'text-purple-600'
        break;
      case 4:
        cellColor = 'text-green-800'
        break;
      case 5:
        cellColor = 'text-blue-800'
        break;
      case 6:
        cellColor = 'text-purple-800'
        break;
      case 7:
        cellColor = 'text-orange-700'
        break;
      case 8:
        cellColor = 'text-red-600'
        break;

      default:
        cellColor = 'text-black'
        break;
    }

    return (
      <>
        {cellObj.isShow ? (
          <div
            className={`
            w-8
            h-8            
            text-center 
            flex 
            items-center 
            justify-center
            font-extrabold
            ${cellColor}
            ${rowIndex % 2 === 0 ? evenRowShow : oddRowShow}`}
          >
            {cellObj.cell > 0 ? cellObj.cell : cellObj.cell < 0 ?
              <Virus2 />
              : ''}
          </div>
        ) : (
          <button
            type="button"
            key={cellIndex}
            className={`
              w-8
              h-8            
              ${rowIndex % 2 === 0 ? evenRowHide : oddRowHide} 
              text-center 
              flex 
              items-center 
              justify-center
              shadow-lg drop-shadow-md
              `}
            onClick={() => handleClick(rowIndex, cellIndex)}
          ></button>
        )}
      </>
    );
  };

  const creategame = (seed: number) => {
    const mine: IMinefield = createMinefield(seed, 16, 18, 40);
    setMinefield(mine);
  };

  const renderBoard = () => {
    return (
      <>
        {minefield &&
          minefield.board.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center items-center">
              {row.map((cell, cellIndex) => (
                <div key={cellIndex}>
                  {createCell(cell, cellIndex, rowIndex)}
                </div>
              ))}
            </div>
          ))}
      </>
    );
  };

  useEffect(() => {
    const randomSeed = Math.floor(Math.random() * 10000);
    setSeed(randomSeed);
  }, []);

  // logs
  useEffect(() => {
    console.log("🚀 ~ minefield:", minefield);
  }, [minefield]);

  const showAndHide = () => {
    setIssShowing(!isShowing)
    setMinefield((oldMinefield: IMinefield | undefined): IMinefield | undefined => {
      if (oldMinefield) {
        const updatedBoard = oldMinefield.board.map(row =>
          row.map(cell => ({ ...cell, isShow: isShowing }))
        );

        return {
          ...oldMinefield,
          board: updatedBoard
        };
      }
      return undefined;
    });
  };

  return (
    <div className="minefield m-20 flex flex-col justify-items-center">
      {!minefield && (
        <div className="space-x-4">
          <button type="button" onClick={() => seed && creategame(seed)}>
            Iniciar
          </button>
          <input
            className="text-red-950"
            type="number"
            name="seed"
            onKeyDown={(e) => e.key === "Enter" && seed && creategame(seed)}
            onChange={(e) => setSeed(parseInt(e.currentTarget.value))}
          />
        </div>
      )}
      {renderBoard()}
      {minefield && <button onClick={showAndHide}> {!isShowing ? 'Esconder campo' : 'Mostrar campo'}</button>}
    </div>
  );
}

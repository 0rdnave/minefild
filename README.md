# MineFild
[![react-version]][react-download] [![next-version]][next-download] [![node-version]][node-download] [![typescript-version]][typescript-download] [![yarn-version]][yarn-download] [![tailwind-version]][tailwind-download] [![react-bootstrap-icons-version]][react-bootstrap-icons-download] 

[Portuguese](/README_pt-br.md)

Project aimed at studying programming logic using a copy of the Minesweeper game as a basis.

### TODO List for this project:

1. **Board:**
   - [X] Create a game board with cells representing mines and their neighbors.
   - [X] Define the size of the board (size selection function).
   - [X] Generate mines randomly on the board.
   - [X] Create a seed system for generating boards.

2. **User Interface (UI):**
   - [X] Draw the board on the screen so the player can interact.
   - [X] Display the number of neighboring mines in each revealed cell.
   - [X] Allow the player to click on cells to reveal their content.

3. **Game Rules:**
   - [ ] Implement the rules of Minesweeper, where the player must avoid clicking on cells with mines.
   - [ ] Allow the player to mark cells suspected to contain mines.

4. **Game Logic:**
   - [ ] Create functions to check if a cell is empty, contains a mine, or has neighboring mines.
   - [ ] Implement the logic to automatically reveal neighboring cells when an empty cell is discovered.
   - [ ] Check if all non-mined cells have been discovered to determine the player's victory.

5. **State Management:**
   - [ ] Maintain control of the game state, including discovered, flagged, and undiscovered cells.
   - [ ] Implement the functionality to restart the game.

6. **Scoring:**
   - [ ] Record and display the player's score (e.g., elapsed time, number of cells discovered, etc.).
   - [ ] Implement a ranking or high score system.

7. **Customization:**
   - [ ] Allow the player to choose the difficulty level (number of mines, board size, etc.).
   - [ ] Add customization options, such as changing the style of the board or the images of the cells.

8. **Testing:**
   - [ ] Test the game to ensure all functionalities are working correctly.
   - [ ] Handle edge cases, such as very large or very small boards.

9. **Polishing:**
    - [ ] Improve the user interface to make the game more intuitive and enjoyable to play.
    - [ ] Fix any bugs or performance issues.




[react-download]: https://react.dev/learn/start-a-new-react-project
[next-download]: https://nextjs.org/docs/getting-started/installation
[node-download]: https://nodejs.org/download/release/v20.11.0/
[typescript-download]: https://www.typescriptlang.org/download
[yarn-download]: https://classic.yarnpkg.com/en/docs/install#windows-stable
[tailwind-download]: https://tailwindcss.com/docs/installation
[react-bootstrap-icons-download]: https://www.npmjs.com/package/react-bootstrap-icons/v/1.11.3

[react-version]: https://img.shields.io/badge/React-v18-blue
[next-version]: https://img.shields.io/badge/Next-v14.1.3-blue
[node-version]: https://img.shields.io/badge/node-20.11.0-blue
[typescript-version]: https://img.shields.io/badge/Typescript-v5-blue
[tailwind-version]: https://img.shields.io/badge/Tailwind-v3.3.0-blue
[yarn-version]: https://img.shields.io/badge/yarn-1.22.19-blue
[react-bootstrap-icons-version]: https://img.shields.io/badge/React_bootstrap_icons-v1.11.3-blue

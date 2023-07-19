import {getIndex} from "../components/ui_components/Grid/CellObject";

export default function generateMaze(cells, width, height) {

    let visited = [];
    for (let i = 0; i < height; i++) {
        let row = []
        for (let j = 0; j < width; j++) {
            row.push(false);
        }
        visited.push(row)
    }

    function getNeighbors(row, col) {
        let neighbors = []
        if (row > 0 && !visited[row - 1][col]) {
            neighbors.push(cells[getIndex(row - 1, col, width)])
        }
        if (row < height - 1 && !visited[row + 1][col]) {
            neighbors.push(cells[getIndex(row + 1, col, width)])
        }
        if (col > 0 && !visited[row][col - 1]) {
            neighbors.push(cells[getIndex(row, col - 1, width)])
        }
        if (col < width - 1 && !visited[row][col + 1]) {
            neighbors.push(cells[getIndex(row, col + 1, width)])
        }
        return neighbors;
    }

    function randomIntFromInterval(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    let stack = []
    stack.push(cells[0])
    let currentCell = cells[0];
    while (true) {
        visited[currentCell.row][currentCell.col] = true
        let neighbors = getNeighbors(currentCell.row, currentCell.col);
        if (neighbors.length !== 0) {
            let rand = randomIntFromInterval(0, neighbors.length - 1);
            let nextCell = neighbors[rand]
            // if (!currentCell.isEnd && !nextCell.isEnd) {


                if (currentCell.row - nextCell.row === -1) {
                    currentCell.barriers.bottom = false;
                    nextCell.barriers.top = false;
                } else if (currentCell.row - nextCell.row === 1) {
                    currentCell.barriers.top = false;
                    nextCell.barriers.bottom = false;
                } else if (currentCell.col - nextCell.col === -1) {
                    currentCell.barriers.right = false;
                    nextCell.barriers.left = false;
                } else if (currentCell.col - nextCell.col === 1) {
                    currentCell.barriers.left = false;
                    nextCell.barriers.right = false;
                }
            // }
            stack.push(currentCell)
            currentCell = nextCell;
        } else if (stack.length > 0) {
            currentCell = stack.pop()
        } else {
            break
        }
    }
    return [...cells]

}
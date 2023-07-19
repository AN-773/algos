import {getIndex} from '../../components/ui_components/Grid/CellObject'
import deepCloneArray from "../../utiles/DeepClone";

export default function BFSAlgo({cells, width, height, startIndex, endIndex}) {

  let frames = []
  let visitedCells = []
  for (let i = 0; i < height; i++) {
    let row = []
    for (let j = 0; j < width; j++) {
      row.push(false);
    }
    visitedCells.push(row)
  }
  let visitedQueue = []

  function getNeighbors(row, col) {
    let cell = null;
    let stack = [];
    if (row !== 0) {
      cell = cells[getIndex(row - 1, col, width)]
      if (!visitedCells[row - 1][col] && !cell.barriers.bottom)
        stack.push(cell);
    }
    if (col !== 0) {
      cell = cells[getIndex(row, col - 1, width)];
      if (!visitedCells[row][col - 1] && !cell.barriers.right)
        stack.push(cell);
    }
    if (col !== width - 1) {
      cell = cells[getIndex(row, col + 1, width)];
      if (!visitedCells[row][col + 1] && !cell.barriers.left)
        stack.push(cell);
    }

    if (row !== height - 1) {
      cell = cells[getIndex(row + 1, col, width)];
      if (!visitedCells[row + 1][col] && !cell.barriers.top)
        stack.push(cell);
    }
    return stack;
  }

  this.start = function start() {
    // let reachedPaths = []
    let cell = cells.find((c) => c.isStart)
    let path = [];
    visitedQueue.push({cell: cell, parent: undefined, length: 1, reached: false});
    while (visitedQueue.length > 0) {
      path = visitedQueue.shift()
      cell = path.cell
      if (visitedCells[cell.row][cell.col] === true)
        continue;
      if (cell.isEnd) {
        path.reached = true
        let parent = path.parent.cell;
        if (parent) {
          cells[getIndex(parent.row, parent.col, width)].isHead = true
        }
        const snapshot = deepCloneArray(cells)
        frames.push({cells: snapshot, editorLineNumbers: {stack: 0}})
        // reachedPaths.push(path);
        break;
      }
      visitedCells[cell.row][cell.col] = true
      cells[getIndex(cell.row, cell.col, width)].circleColor = "chartreuse";
      const snapshot = deepCloneArray(cells)
      frames.push({cells: snapshot, editorLineNumbers: {stack: 0}})
      cells[getIndex(cell.row, cell.col, width)].circleColor = "#61dafb";
      for (const neighbor of getNeighbors(cell.row, cell.col)) {
        visitedQueue.push({cell: neighbor, parent: path, length: path.length + 1})
      }
    }
    /*cells.forEach((c) => c.visited = false)
    if (reachedPaths.length === 0) {
      frames.push({cells: deepCloneArray(cells), editorLineNumbers: {stack: 0}})
      return frames
    }
    let currentPath = reachedPaths[0];
    let lastPath = [];
    while (currentPath !== undefined) {
      lastPath.unshift(currentPath.cell);
      currentPath = currentPath.parent;
    }
    for (const p of lastPath) {
      cells[getIndex(p.row, p.col, width)].visited = true
    }
    frames.push({cells: deepCloneArray(cells), editorLineNumbers: {stack: 0}})*/
    return frames;
  }
}
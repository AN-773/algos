import deepCloneArray from "../../utiles/DeepClone";
import CellObject, {getIndex} from "../../components/ui_components/Grid/CellObject";
import Algorithm from "../Algorithm";

export type DFSData = {
  cells: CellObject[],
  width: number,
  height: number,
  startIndex: number,
  endIndex: number
}

export type DFSFrame = {
  cells: CellObject[],
  editorLineNumbers: { stack: number, recursive: number }
}

export default class DFSAlgo extends Algorithm<DFSFrame, DFSData> {


  start(data) {
    let frames: DFSFrame[] = []
    let {cells, width, height, startIndex} = data;
    let visited: boolean[][] = [];
    for (let i = 0; i < height; i++) {
      let row: boolean[] = []
      for (let j = 0; j < width; j++) {
        row.push(false);
      }
      visited.push(row)
    }
    let stack: { cell: CellObject, neighbors: CellObject[] }[] = [];
    let currentCellObj = {
      cell: cells[startIndex],
      neighbors: this.getNeighbors(visited, cells, Math.floor(startIndex / width), startIndex % width, width, height)
    }
    while (true) {
      if (!visited[currentCellObj.cell.row][currentCellObj.cell.col]) {
        visited[currentCellObj.cell.row][currentCellObj.cell.col] = true;
        currentCellObj.cell.circleColor = "chartreuse"
      }
      frames.push({cells: deepCloneArray(cells), editorLineNumbers: {stack: 0, recursive: 0}})
      currentCellObj.cell.circleColor = "#61dafb"
      if (currentCellObj.cell.isEnd) {
        break;
      }
      let neighbors = currentCellObj.neighbors
      if (neighbors.length > 0) {
        stack.push(currentCellObj);
        let next = neighbors.pop();
        currentCellObj = {
          cell: next!,
          neighbors: this.getNeighbors(visited, cells, next!.row, next!.col, width, height)
        }
      } else if (stack.length !== 0) {
        currentCellObj.cell.circleColor = "red"
        frames.push({cells: deepCloneArray(cells), editorLineNumbers: {stack: 0, recursive: 0}})
        currentCellObj.cell.circleColor = ""
        currentCellObj = stack.pop()!;
      } else {
        break;
      }
    }
    return frames
  }

  getNeighbors(visitedList: boolean[][], cells: CellObject[], row: number, col: number, width, height): CellObject[] {

    function shuffle(array: any[]) {
      let currentIndex = array.length, randomIndex;

      while (currentIndex !== 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }

      return array;
    }

    let cell: CellObject;
    let stack: CellObject[] = [];
    let top = () => {
      if (row !== 0) {
        cell = cells[getIndex(row - 1, col, width)]
        if (!visitedList[row - 1][col] && !cell.barriers.bottom)
          stack.push(cell);
      }
    }
    let left = () => {
      if (col !== 0) {
        cell = cells[getIndex(row, col - 1, width)];
        if (!visitedList[row][col - 1] && !cell.barriers.right)
          stack.push(cell);
      }
    }
    let right = () => {
      if (col !== width - 1) {
        cell = cells[getIndex(row, col + 1, width)];
        if (!visitedList[row][col + 1] && !cell.barriers.left)
          stack.push(cell);
      }
    }
    let bottom = () => {
      if (row !== height - 1) {
        cell = cells[getIndex(row + 1, col, width)];
        if (!visitedList[row + 1][col] && !cell.barriers.top)
          stack.push(cell);
      }
    }
    let comps = [top, right, left, bottom];
    shuffle(comps)
    for (const comp of comps) {
      comp();
    }
    return stack;
  }
}


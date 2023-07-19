type Barrier = {
  top: boolean,
  bottom: boolean,
  left: boolean,
  right: boolean
}
export default class CellObject {

  constructor(public row: number, public col: number,
              public isStart: boolean, public isEnd: boolean,
              public isWeight: boolean, public barriers: Barrier,
              public circleColor: string) {
  }
}

export function createCells(width: number, height: number, start: number, end: number) {
  const cells: CellObject[] = [];
  for (let i = 0; i < width * height; i++) {
    cells.push(new CellObject(Math.floor(i / width), i % width,
      i === start, i === end, false,
      {top: true, bottom: true, left: true, right: true},
      ""));
  }
  return cells
}

export function getIndex(row: number, col: number, width: number) {
  return row * width + col;
}

import "./grid.scss"
import {DndContext, useDraggable, useDroppable} from "@dnd-kit/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFlag, faPlay} from "@fortawesome/free-solid-svg-icons";
import {restrictToFirstScrollableAncestor} from "@dnd-kit/modifiers";
import deepCloneArray from "../../../utiles/DeepClone";

export const Start = (props) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: "grid-start",
  });
  const style = {
    transform: (transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : ""),
    width: "100%",
    height: "100%"
  };


  return (
    <div ref={setNodeRef} {...listeners} {...attributes} id={"grid-start"} style={style}>
      <FontAwesomeIcon icon={faPlay}/>
      {props.children}
    </div>
  );
}

export const End = (props) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: "grid-end",
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    width: "100%", height: "100%"
  } : undefined;


  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      <FontAwesomeIcon icon={faFlag}/>
      {props.children}
    </div>
  );
}

export const Cell = ({cellObject: {row, col, isStart, isEnd, isWeight, barriers, circleColor}}) => {
  const {isOver, setNodeRef} = useDroppable({
    id: `${row}-${col}`,
  });

  let className = "cell " + (isOver && !isStart && !isEnd ? "droppable" : "");
  //Barriers
  const {top, bottom, left, right} = barriers;
  if (top) {
    className = className + " top-barrier"
  }
  if (bottom) {
    className = className + " bottom-barrier"
  }
  if (left) {
    className = className + " left-barrier"
  }
  if (right) {
    className = className + " right-barrier"
  }

  if (row === 0) {
    className = className + " first-row"
  }

  if (col === 0) {
    className = className + " first-col"
  }

  if (isStart) {
    className = className + " start"
  } else if (isEnd) {
    className = className + " end";
  } else if (isWeight) {
    className = className + " weight";
  }

  let circleComp = (<div className={`w-[10px] h-[10px] border-solid rounded-full`}
                         style={{borderColor: circleColor, borderWidth:1}}></div>)

  return (<div ref={setNodeRef} className={className}>
    {isStart ? <Start/> : isEnd ? <End/> : circleColor ? circleComp : null}
  </div>)

}

export default function Grid({data, onChange}) {

  function getIndex(row, col) {
    return Number(row) * data.width + Number(col);
  }

  function handleDragEnd(event) {
    if (event.over && event.active) {
      const [row, col] = event.over.id.split("-")
      const i = getIndex(row, col)
      if (data.cells[i].isStart || data.cells[i].isEnd)
        return
      if (event.active.id === "grid-start") {
        let newCells = deepCloneArray(data.cells, (cell) => {
          cell.circleColor = undefined
          return {...cell}
        })
        newCells[data.startIndex].isStart = false
        newCells[i].isStart = true
        onChange({...data, cells: newCells, startIndex: i})
      } else if (event.active.id === "grid-end") {
        let newCells = deepCloneArray(data.cells, (cell) => {
          cell.circleColor = undefined
          return {...cell}
        })
        newCells[data.endIndex].isEnd = false
        newCells[i].isEnd = true
        onChange({...data, cells: newCells, endIndex: i})
      }
    }
  }

  if (!data)
    return (<div>No data</div>)
  return (
    <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToFirstScrollableAncestor]}>
      <div className={"grid"}>
        {data.cells.reduce((rows, currentValue) => {
          if (rows.row !== undefined) {
            let arr = []
            arr.push(Array(rows))
            rows = arr
          }
          let rowIndex = currentValue.row;
          let row = [];
          if (rows.length > rowIndex) {
            row = rows[rowIndex];
          } else {
            rows.push(row);
          }
          row.push(currentValue)
          return rows
        }).map((row, index) => {
          return (<div key={`row-${index}`} className={"row"}>
            {row.map((cell) => {
              return (
                <Cell key={`${cell.row}-${cell.col}`}
                      cellObject={cell}/>
              )
            })}
          </div>)
        })}
      </div>
    </DndContext>
  )

}
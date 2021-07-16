import { FC } from "react";
import { PointCoords, Pokemon } from "../context/AppContext";
import { checkPointInLine } from "../utils/game";
import LineCard from "./LineCard";

type LineRowProps = {
  cards: Pokemon[] | number[];
  connectingLinePoints: PointCoords[];
  rowIndex: number;
};

const LineRow: FC<LineRowProps> = ({
  connectingLinePoints,
  cards,
  rowIndex,
}) => {
  return (
    <>
      {cards.map((_, colIndex) => (
        <LineCard
          key={`card-${colIndex}`}
          rowIndex={rowIndex}
          colIndex={colIndex}
          point={checkPointInLine(connectingLinePoints, { rowIndex, colIndex })}
        />
      ))}
    </>
  );
};

export default LineRow;

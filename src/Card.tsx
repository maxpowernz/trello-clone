import { useAppState } from "AppStateContext";
import { CardDragItem } from "DragItem";
import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import { useItemDrag } from "utils/useItemDrag";
import { CardContainer } from "./styles";

interface CardProps {
  text: string;
  index: number;
  id: string;
  isPreview?: boolean;
  columnId: string;
}

export const Card = ({ text, id, columnId, index }: CardProps) => {
  const { dispatch } = useAppState();
  const { drag } = useItemDrag({ type: "CARD", id, index, text, columnId });
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "CARD",
    hover(item: CardDragItem) {
      if (item.id === id) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      const sourceColumn = item.columnId;
      const targetColumn = columnId;

      dispatch({
        type: "MOVE_TASK",
        payload: { dragIndex, hoverIndex, sourceColumn, targetColumn },
      });

      item.index = hoverIndex;
      item.columnId = targetColumn;
    },
  });

  drag(drop(ref));

  return <CardContainer ref={ref}>{text}</CardContainer>;
};

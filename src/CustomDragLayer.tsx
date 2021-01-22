import { useDragLayer, XYCoord } from "react-dnd";
import React from "react";
import { Column } from "./Column";
import { CustomDragLayerContainer } from "./styles";
import { DragItem } from "DragItem";
import { Card } from "Card";

export const CustomDragLayer: React.FC = () => {
  const { isDragging, item, currentOffset } = useDragLayer((moniter) => ({
    item: moniter.getItem() as DragItem,
    isDragging: moniter.isDragging(),
    currentOffset: moniter.getSourceClientOffset(),
  }));

  if (!isDragging) return null;

  return (
    <CustomDragLayerContainer>
      <div style={getItemStyles(currentOffset)}>
        {item.type === "COLUMN" ? (
          <Column id={item.id} text={item.text} index={item.index} isPreview={true} />
        ) : (
          <Card
            columnId={item.columnId}
            isPreview={true}
            index={0}
            key={item.id}
            text={item.text}
            id={item.id}
          />
        )}
      </div>
    </CustomDragLayerContainer>
  );
};

function getItemStyles(currentOffset: XYCoord | null): React.CSSProperties {
  if (!currentOffset) {
    return {
      display: "none",
    };
  }

  const { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
    WebkitTransform: transform,
  };
}

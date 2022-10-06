import { DraggableItemTypes } from "components/DraggableItemTypes";
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { rememberOrder, updateElementsOrderToApi } from "redux/managedListActions";


export function CardContainerDraggableElement({ children, uid, onMoveElement }) {

  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DraggableItemTypes.TimeboxListElement,
      item: () => {
        dispatch(rememberOrder());
        return { uid };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { uid: droppedUid, } = item
        const didDrop = monitor.didDrop()
        if (didDrop) {
          dispatch(updateElementsOrderToApi('abc'))
        } else {
          onMoveElement(droppedUid, uid)
        }
      },
    }),
    [uid, onMoveElement],
  )

  const [, drop] = useDrop(
    () => ({
      accept: DraggableItemTypes.TimeboxListElement,
      hover({ uid: draggedUid }) {
        if (draggedUid !== uid) {
          onMoveElement(draggedUid, uid)
        }
      },
    }),
    [onMoveElement],
  )
  const opacity = isDragging ? 0 : 1

  return (<div ref={(node) => drag(drop(node))}
    style={{ opacity }}
    className="w-full lg:w-6/12 xl:w-6/12 px-4">
    {children}
  </div>

  );
}

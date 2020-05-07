import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Wrapper = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 10px;
  background: ${({ isDragging }) => (isDragging ? "lightgreen" : "white")};
  display: flex;
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background: orange;
  border-radius: 3px;
  margin-right: 8px;
`;

const Task = ({ task, index }) => {
  return (
    <div>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <Wrapper
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {/* <Handle {...provided.dragHandleProps} /> */}
            {task.content}
          </Wrapper>
        )}
      </Draggable>
    </div>
  );
};

export default Task;

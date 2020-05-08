import React from "react";
import styled from "styled-components";
import Task from "../Task";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Wrapper = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background 0.2s ease;
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? "skyblue" : "red"};
  min-height: 200px;
  flex-grow: 1;
  border: 3px dashed black;
`;

const Card = ({ column, columnid, ind }) => {
  return (
    <div>
      <Draggable draggableId={columnid} index={ind}>
        {(provided, snapshot) => (
          <Wrapper
            {...provided.draggableProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Title {...provided.dragHandleProps}>{column.name}</Title>
            <Droppable droppableId={columnid} type="task">
              {(provided, snapshot) => (
                <TaskList
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {column.items.map((task, index) => (
                    <Task task={task} key={task._id} index={index} />
                  ))}
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </Wrapper>
        )}
      </Draggable>
    </div>
  );
};

export default Card;

import React, { useState } from "react";
import { initialData } from "./data/data";
import { Container, Row, Column } from "./components/Globals/Grid";
import Card from "./components/Card";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const [data, setData] = useState(initialData);

  const onDragStart = () => {
    document.body.style.color = "orange";
    document.body.style.transition = "background-color 0.2s ease";
  };

  const onDragUpdate = (update) => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(data.tasks).length
      : 0;
    document.body.style.backgroundColor = `rgba(153,141,217,${opacity})`;
  };

  const onDragEnd = (result) => {
    document.body.style.color = "inherit";
    document.body.style.backgroundColor = "inherit";

    const { source, destination, draggableId } = result;
    console.log(result);

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // const column = data.columns[source.droppableId];

    // const newTaskIds = Array.from(column.taskIds);
    // newTaskIds.splice(source.index, 1);
    // newTaskIds.splice(destination.index, 0, draggableId);

    // const newColumn = {
    //   ...column,
    //   taskIds: newTaskIds,
    // };

    // const newData = {
    //   ...initialData,
    //   columns: {
    //     ...initialData.columns,
    //     [newColumn.id]: newColumn,
    //   },
    // };

    // setData(newData);
    const start = data.columns[source.droppableId];

    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newData = {
        ...initialData,
        columns: {
          ...initialData.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newData);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    console.log(startTaskIds);

    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newStateData = {
      ...initialData,
      columns: {
        ...initialData.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setData(newStateData);
  };

  return (
    <Container>
      <Row>
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
          return (
            <DragDropContext
              onDragEnd={(result) => onDragEnd(result)}
              onDragStart={onDragStart}
              onDragUpdate={onDragUpdate}
              key={column.id}
            >
              <Column sm="6" lg="4">
                <Card column={column} tasks={tasks} />{" "}
              </Column>
            </DragDropContext>
          );
        })}
      </Row>
    </Container>
  );
}

export default App;

const initial = {
  tasks: {
    "task-1": { id: "task-1", content: "Remove Gargage" },
    "task-2": { id: "task-2", content: "Watch my show" },
    "task-3": { id: "task-3", content: "Take out gargage" },
    "task-4": { id: "task-4", content: "Cook dinner" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      Title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
  },
  columnOrder: ["column-1"],
};

const result = {
  draggableId: "task-1",
  type: "TYPE",
  reason: "Drop",
  source: {
    droppableId: "column-1",
    index: 0,
  },
  destination: {
    droppableId: "column-1",
    index: 1,
  },
};

const draggableSnapshot = {
  isDragging: true,
  draggingOver: "column-1",
};

const droppableSnapshot = {
  isDraggingOver: true,
  isDraggingOverWith: "task-1",
};

// video #7
// https://www.youtube.com/watch?v=xebzlZsValk&list=PLBguFN_KEgLimbYj8UgDmjKjLYalq63FQ&index=7
const start = {
  draggableId: "task-1",
  type: "TYPE",
  source: {
    droppableId: "column-1",
    index: 0,
  },
};

const update = {
  ...start,
  destination: {
    droppableId: "column-1",
    index: 1,
  },
};

const end = {
  ...update,
  reason: "DROP",
};

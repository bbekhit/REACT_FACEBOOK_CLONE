import React, { useEffect, useState } from "react";
import { getPosts } from "../../redux/actions/postActions";
import { connect } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import Spinner from "../Spinner/Spinner";

const PostListDND = ({ posts, getPosts }) => {
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);

  const columnsFromBackend = {
    [uuid()]: {
      name: "Requested",
      items: posts,
    },
    [uuid()]: {
      name: "To do",
      items: [],
    },
    [uuid()]: {
      name: "In Progress",
      items: [],
    },
    [uuid()]: {
      name: "Done",
      items: [],
    },
  };
  const [columns, setColumns] = useState(columnsFromBackend);

  useEffect(() => {
    getPosts(skip, limit);
  }, [getPosts]);

  useEffect(() => {
    setColumns(columnsFromBackend);
  }, [posts]);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      // one column
      const column = columns[source.droppableId]; // get the column
      const copiedItems = [...column.items]; // make a copy of the items inside the column
      const [removed] = copiedItems.splice(source.index, 1); // return array of removed item
      console.log("removed", removed);
      console.log("source", source);
      console.log("destination", destination);

      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  if (posts.length === 0) {
    return <Spinner />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100vw",
        margin: "0 auto",
        border: "1px dashed black",
      }}
    >
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "1px dashed red",
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8, border: "1px dashed green" }}>
                <Droppable droppableId={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500,
                          border: "1px dashed orange",
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item._id}
                              draggableId={item._id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      border: "1px dashed purple",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {/* {item.content} */}
                                    {item.title}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.post,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getPosts,
})(PostListDND);

import React, { useEffect, useState } from "react";
import { getPosts } from "../../../redux/actions/postActions";
import { connect } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import Spinner from "../../Spinner/Spinner";
import { Row, Column, Container } from "./Grid";
import Card from "./Card";

const DND = ({ getPosts, posts }) => {
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [homeIndex, setHomeIndex] = useState(null);

  const columnsFromBackend = {
    "column-1": {
      name: "Requested",
      items: posts,
    },
    "column-2": {
      name: "To do",
      items: [],
    },
  };
  const columnOrder = ["column-1", "column-2"];

  const [columns, setColumns] = useState(columnsFromBackend);

  useEffect(() => {
    getPosts(skip, limit);
  }, [getPosts]);

  useEffect(() => {
    setColumns(columnsFromBackend);
  }, [posts]);

  const onDragEnd = (result, columns, setColumns) => {
    // one-way
    // setHomeIndex(null);
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

  return (
    <div>
      <Container>
        <Row>
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <Column lg="3" key={columnId}>
                  <Card column={column} columnid={columnId} />
                </Column>
              );
            })}
          </DragDropContext>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.post,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getPosts,
})(DND);

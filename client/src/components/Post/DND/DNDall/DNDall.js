// import React, { useEffect, useState } from "react";
// import { getPosts } from "../../../../redux/actions/postActions";
// import { connect } from "react-redux";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import uuid from "uuid/v4";
// import Spinner from "../../../Spinner/Spinner";
// import { Row, Column, Container } from "../Grid";
// import Card from "../DNDall/Cardall";

// const DND = ({ getPosts, posts }) => {
//   const [limit, setLimit] = useState(5);
//   const [skip, setSkip] = useState(0);

//   // const columnsFromBackend = {
//   //   "column-1": {
//   //     name: "Requested",
//   //     items: posts,
//   //   },
//   //   "column-2": {
//   //     name: "To do",
//   //     items: [],
//   //   },
//   // };
//   const initialData = {
//     columns: {
//       "column-1": {
//         name: "Requested",
//         items: posts,
//       },
//       "column-2": {
//         name: "To do",
//         items: [],
//       },
//     },
//     columnOrder: ["column-1", "column-2"],
//   };
//   const [data, setData] = useState(initialData);

//   // const [columns, setColumns] = useState(columnsFromBackend.columns);

//   // const columnOrder = ["column-1", "column-2"];

//   useEffect(() => {
//     getPosts(skip, limit);
//   }, [getPosts]);

//   useEffect(() => {
//     setData(initialData);
//   }, [posts]);

//   const onDragEnd = (result) => {
//     const { columns } = data;
//     // one-way
//     // setHomeIndex(null);
//     if (!result.destination) return;
//     const { source, destination, type, draggableId } = result;

//     if (type === "column") {
//       // const newColumnOrder = Array.from(order);
//       // console.log(newColumnOrder);
//       // console.log(newColumnOrder.splice(source.index, 1));
//       // console.log(newColumnOrder.splice(destination.index, 0, draggableId));
//       // console.log("des", destination);
//       // console.log("sor", source);
//       // newColumnOrder.splice(source.index, 1);
//       // newColumnOrder.splice(destination.index, 0, draggableId);
//       // setOrder(newColumnOrder);
//       // console.log(newColumnOrder);
//       // console.log(draggableId);
//     }

//     if (source.droppableId !== destination.droppableId) {
//       const sourceColumn = columns[source.droppableId];
//       const destColumn = columns[destination.droppableId];
//       const sourceItems = [...sourceColumn.items];
//       const destItems = [...destColumn.items];
//       const [removed] = sourceItems.splice(source.index, 1);
//       destItems.splice(destination.index, 0, removed);
//       setColumns({
//         ...columns,
//         [source.droppableId]: {
//           ...sourceColumn,
//           items: sourceItems,
//         },
//         [destination.droppableId]: {
//           ...destColumn,
//           items: destItems,
//         },
//       });
//       setData({
//         ...initialData,
//         [source.droppableId]: {
//           ...sourceColumn,
//           items: sourceItems,
//         },
//         [destination.droppableId]: {
//           ...destColumn,
//           items: destItems,
//         },
//       });
//     } else {
//       // one column
//       const column = columns[source.droppableId]; // get the column
//       const copiedItems = [...column.items]; // make a copy of the items inside the column
//       const [removed] = copiedItems.splice(source.index, 1); // return array of removed item
//       console.log("removed", removed);
//       console.log("source", source);
//       console.log("destination", destination);

//       copiedItems.splice(destination.index, 0, removed);
//       setColumns({
//         ...columns,
//         [source.droppableId]: {
//           ...column,
//           items: copiedItems,
//         },
//       });
//     }
//   };

//   return (
//     <div>
//       <Container>
//         <Row>
//           <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
//             <Droppable
//               droppableId="all-columns"
//               direction="horizontal"
//               type="column"
//             >
//               {(provided, snapshot) => (
//                 <div
//                   {...provided.droppableProps}
//                   ref={provided.innerRef}
//                   style={{ display: "flex", maxWidth: "50vw" }}
//                 >
//                   {data.columns.map(([columnid, column], index) => {
//                     const ind = data.columnOrder.indexOf(columnid);
//                     return (
//                       <Column lg="3" key={columnid}>
//                         <Card column={column} columnid={columnid} ind={ind} />
//                       </Column>
//                     );
//                   })}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           </DragDropContext>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   posts: state.post,
//   auth: state.auth,
// });
// export default connect(mapStateToProps, {
//   getPosts,
// })(DND);

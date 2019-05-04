import React from "react";

const ListEntry = props => (
  <div>
    {console.log('in listentry', props.id)}
    <button onClick={() => props.delete(props.id)}>DONE</button> {props.todo}
  </div>
);

export default ListEntry;

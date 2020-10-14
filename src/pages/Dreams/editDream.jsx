import React, { Component } from "react";
import FormDream from "../../components/Forms/FormDream";

const editDream = (props) => {
  return (
    <div>
      <FormDream action="edit" id={props.match.params.id} />
    </div>
  );
};

export default editDream;

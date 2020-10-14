import React, { Component } from "react";
import FormConcept from "../../components/Forms/FormConcept";

const editConcept = (props) => {
  return (
    <div>
      <FormConcept action="edit" id={props.match.params.id} />
    </div>
  );
};

export default editConcept;

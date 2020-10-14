import React from "react";

const ConceptCard = (props) => {
  return (
    <div>
      <img src={props.image} alt={props.name} />
      <p>{props.name}</p>
    </div>
  );
};

export default ConceptCard;

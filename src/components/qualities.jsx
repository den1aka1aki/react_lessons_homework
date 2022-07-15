import React from "react";

const Qualities = ({qualities}) => {
  return qualities.map((quality) => (
    <span key={quality.name} className={"badge m-1 bg-" + quality.color}>
      {quality.name}{" "}
    </span>
  ));
};

export default Qualities;

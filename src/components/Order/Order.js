import React from "react";
import classes from "./Order.css";

const order = props => (
  <div className={classes.Order}>
    <p>Ingredients:</p>
    <p>
      {Object.keys(props.ingredients).map(ingredient => (
        <span
          key={ingredient}
          style={{
            textTransform: "capitalize",
            display: "inline-block",
            margin: "5px",
            padding: "1px 5px 1px 5px",
            border: "1px solid #aaa"
          }}
        >
          {ingredient} ({props.ingredients[ingredient]})
        </span>
      ))}
    </p>
    <p>
      Price: <strong>${props.price.toFixed(2)}</strong>
    </p>
  </div>
);

export default order;

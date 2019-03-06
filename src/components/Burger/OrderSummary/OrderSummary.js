import React from "react";

const orderSummary = props => {
  const ingredintSummary = Object.keys(props.ingredients).map(x => {
    return (
      <li key={x}>
        <span style={{ textTransform: "capitalize" }}>{x}</span>:{" "}
        {props.ingredients[x]}
      </li>
    );
  });
  return (
    <>
      <h3>Your orders</h3>
      <p>A delicious burger</p>
      <ul>{ingredintSummary}</ul>
      <p>Continue to checkout</p>
    </>
  );
};

export default orderSummary;

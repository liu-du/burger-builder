import React from "react";
import Button from "../../UI/Button/Button";

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
      <ul style={{ listStyle: "none" }}>{ingredintSummary}</ul>
      <p>
        <strong>Total Price: {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button clicked={props.purchaseCancelled} btnType="Danger">
        CANCEL
      </Button>
      <Button clicked={props.purchaseContinued} btnType="Success">
        CONTINUE
      </Button>
    </>
  );
};

export default orderSummary;

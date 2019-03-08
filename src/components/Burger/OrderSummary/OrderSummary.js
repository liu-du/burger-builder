import React, { Component } from "react";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  render() {
    const ingredintSummary = Object.keys(this.props.ingredients).map(x => {
      return (
        <li key={x}>
          <span style={{ textTransform: "capitalize" }}>{x}</span>:{" "}
          {this.props.ingredients[x]}
        </li>
      );
    });
    return (
      <>
        <h3>Your orders</h3>
        <p>A delicious burger</p>
        <ul style={{ listStyle: "none" }}>{ingredintSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button clicked={this.props.purchaseCancelled} btnType="Danger">
          CANCEL
        </Button>
        <Button clicked={this.props.purchaseContinued} btnType="Success">
          CONTINUE
        </Button>
      </>
    );
  }
}

export default OrderSummary;

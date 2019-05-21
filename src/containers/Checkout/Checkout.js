import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/ChekcoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace(this.props.match.url + "/contact-data");
  };

  render() {
    let summary = (
      <CheckoutSummary
        ingredients={this.props.ings}
        checkoutCancelled={this.checkoutCancelledHandler}
        checkoutContinued={this.checkoutContinuedHandler}
      />
    );
    if (
      !this.props.ings ||
      Object.keys(this.props.ings)
        .map(key => this.props.ings[key])
        .reduce((x, y) => x + y, 0) === 0 ||
      this.props.purchased
    ) {
      summary = <Redirect to="/" />;
    }
    return (
      <div>
        {summary}
        <Route
          path={this.props.match.url + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);

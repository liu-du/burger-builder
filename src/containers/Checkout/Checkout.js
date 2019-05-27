import React from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/ChekcoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

const checkout = props => {
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace(props.match.url + "/contact-data");
  };

  let summary = (
    <CheckoutSummary
      ingredients={props.ings}
      checkoutCancelled={checkoutCancelledHandler}
      checkoutContinued={checkoutContinuedHandler}
    />
  );
  if (
    !props.ings ||
    Object.keys(props.ings)
      .map(key => props.ings[key])
      .reduce((x, y) => x + y, 0) === 0 ||
    props.purchased
  ) {
    summary = <Redirect to="/" />;
  }
  return (
    <div>
      {summary}
      <Route path={props.match.url + "/contact-data"} component={ContactData} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(checkout);

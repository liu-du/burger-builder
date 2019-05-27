import React, { useState, useEffect } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

const burgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);
  useEffect(() => {
    props.onInitIngredients();
  }, []);

  const purchaseHandler = () => {
    if (props.isAuth) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push("/checkout");
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const updatePurchaseState = () => {
    const sum = Object.keys(props.ings)
      .map(ingredient => props.ings[ingredient])
      .reduce((x, y) => x + y, 0);
    return sum > 0;
  };

  const disableInfo = { ...props.ings };
  for (let key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }
  let orderSummary = null;
  let burger = props.error ? (
    <p style={{ textAlign: "center" }}>Ingredients can't be loaded</p>
  ) : (
    <Spinner />
  );

  if (props.ings) {
    orderSummary = (
      <OrderSummary
        ingredients={props.ings}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        price={props.totalPrice}
      />
    );

    burger = (
      <>
        <Burger ingredients={props.ings} />
        <BuildControls
          ingredientsAdded={props.onIngredientAdded}
          ingredientsRemoved={props.onIngredientRemoved}
          disabled={disableInfo}
          price={props.totalPrice}
          purchasable={updatePurchaseState()}
          ordered={purchaseHandler}
          isAuth={props.isAuth}
        />
      </>
    );
  }

  return (
    <>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </>
  );
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredientName =>
      dispatch(actionCreators.addIngredient(ingredientName)),
    onIngredientRemoved: ingredientName =>
      dispatch(actionCreators.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actionCreators.initIngredients()),
    onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
    onSetAuthRedirectPath: path =>
      dispatch(actionCreators.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(burgerBuilder, axios));

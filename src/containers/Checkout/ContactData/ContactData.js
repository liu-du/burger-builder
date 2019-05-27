import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";
import { checkValidity } from "../../../shared/utility";

const contactData = props => {
  const inputState = (placeholder, configType = "text", value = "") => ({
    minLength = 0,
    maxLength = Number.POSITIVE_INFINITY
  }) => ({
    elementType: "input",
    elementConfig: {
      type: configType,
      placeholder: placeholder
    },
    value: value,
    validation: {
      required: true,
      minLength: minLength,
      maxLength: maxLength
    },
    valid: false,
    touched: false
  });

  const selectState = (options = [], value = "") => {
    return {
      elementType: "select",
      elementConfig: {
        options: options
      },
      value: value,
      validation: {}
    };
  };

  const [orderForm, setOrderForm] = useState({
    name: inputState("Your name")({ minLength: 2 }),
    street: inputState("Street")({ minLength: 2, maxLength: 5 }),
    zipCode: inputState("Zip code")({ minLength: 1, maxLength: 8 }),
    country: inputState("Country")({ minLength: 1 }),
    email: inputState("test@test.com")({ minLength: 3 }),
    deliveryMethod: selectState(
      [
        { value: "fastest", displayValue: "Fastest" },
        { value: "cheapest", displayValue: "Cheapest" }
      ],
      "fastest"
    )
  });

  const orderHandler = event => {
    event.preventDefault();
    const formData = Object.keys(orderForm).reduce(
      (acc, key) => ({
        ...acc,
        [key]: orderForm[key].value
      }),
      {}
    );
    const order = {
      ingredients: props.ingredients,
      price: props.price,
      orderData: formData,
      userId: props.userId
    };
    props.onOrderBurger(order, props.token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    setOrderForm(updatedOrderForm);
  };

  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key]
    });
  }
  let form = (
    <div className={classes.ContactData}>
      <h4>Enter you Contact Data</h4>
      <form onSubmit={orderHandler}>
        {formElementsArray.map(el => (
          <Input
            key={el.id}
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            invalid={!el.config.valid}
            shouldValidate={el.config.validation}
            touched={el.config.touched}
            changed={event => inputChangedHandler(event, el.id)}
          />
        ))}
        <Button btnType="Success">Order</Button>
      </form>
    </div>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  return form;
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actionCreators.purchaseBurger(orderData, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(contactData, axios));

import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderForm: {
        name: this.inputState("Your name")({ minLength: 2 }),
        street: this.inputState("Street")({ minLength: 2, maxLength: 5 }),
        zipCode: this.inputState("Zip code")({ minLength: 1, maxLength: 8 }),
        country: this.inputState("Country")({ minLength: 1 }),
        email: this.inputState("test@test.com")({ minLength: 3 }),
        deliveryMethod: this.selectState(
          [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ],
          "fastest"
        )
      },
      loading: false
    };
  }

  inputState(placeholder, configType = "text", value = "") {
    return ({ minLength = 0, maxLength = Number.POSITIVE_INFINITY }) => ({
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
  }

  selectState(options = [], value = "") {
    return {
      elementType: "select",
      elementConfig: {
        options: options
      },
      value: value,
      validation: {}
    };
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.minLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = Object.keys(this.state.orderForm).reduce(
      (acc, key) => ({
        ...acc,
        [key]: this.state.orderForm[key].value
      }),
      {}
    );
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        console.log(response);
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  inputChangedHandler = (event, inputIdentifier) => {
    console.log(event.target.value);
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    console.log(updatedFormElement);
    this.setState({ orderForm: updatedOrderForm });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <div className={classes.ContactData}>
        <h4>Enter you Contact Data</h4>
        <form onSubmit={this.orderHandler}>
          {formElementsArray.map(el => (
            <Input
              key={el.id}
              elementType={el.config.elementType}
              elementConfig={el.config.elementConfig}
              value={el.config.value}
              invalid={!el.config.valid}
              shouldValidate={el.config.validation}
              touched={el.config.touched}
              changed={event => this.inputChangedHandler(event, el.id)}
            />
          ))}
          <Button btnType="Success">Order</Button>
        </form>
      </div>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return form;
  }
}

export default ContactData;

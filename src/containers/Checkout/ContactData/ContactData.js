import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "test",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Jimmy",
        address: {
          street: "victoria",
          zipCode: "2069",
          country: "Australia"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fatest"
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

  render() {
    let form = (
      <div className={classes.ContactData}>
        <h4>Enter you Contact Data</h4>
        <form>
          <input type="text" name="name" placeholder="Your name" />
          <input type="text" name="email" placeholder="Email" />
          <input type="text" name="street" placeholder="Street" />
          <input type="text" name="postal" placeholder="Postal Code" />
          <Button btnType="Success" clicked={this.orderHandler}>
            Order
          </Button>
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

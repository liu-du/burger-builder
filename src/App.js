import React, { Component } from "react";
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions/index";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() =>
  import("./containers/Checkout/Checkout")
);
const asyncOrders = asyncComponent(() => import("./containers/Orders/Orders"));
const asyncAuth = asyncComponent(() => import("./containers/Auth/Auth"));

class App extends Component {
  componentDidMount() {
    this.props.onAutoSignIn();
  }
  render() {
    let routes = null;
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/orders" component={asyncOrders} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <BrowserRouter>
        <Layout>{routes}</Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onAutoSignIn: () => {
    dispatch(actionCreators.authCheckState());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

import React, { useEffect, Suspense } from "react";
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions/index";

const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));
const Orders = React.lazy(() => import("./containers/Orders/Orders"));
const Auth = React.lazy(() => import("./containers/Auth/Auth"));

const app = props => {
  useEffect(() => {
    props.onAutoSignIn();
  }, []);
  let routes = null;
  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/orders" render={props => <Orders {...props} />} />
        <Route path="/checkout" render={props => <Checkout {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={props => <Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/auth" render={props => <Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </BrowserRouter>
  );
};

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
)(app);

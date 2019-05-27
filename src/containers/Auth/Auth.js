import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import * as actionCreators from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { checkValidity } from "../../shared/utility";

const auth = props => {
  const [isSignup, setIsSignup] = useState(false);
  const [signupForm, setSignupForm] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email Address"
      },
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password"
      },
      value: "",
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  });

  useEffect(() => {
    if (props.buildingBurger && props.authRedictPath !== "/") {
      props.onSetAuthRedirectPath("/");
    }
  }, []);

  const inputChangeHandler = (event, inputIdentifier) => {
    const updatedSignupForm = {
      ...signupForm
    };
    const updatedFormElement = {
      ...updatedSignupForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedSignupForm[inputIdentifier] = updatedFormElement;
    setSignupForm(updatedSignupForm);
  };

  const submitHandler = event => {
    event.preventDefault();
    props.onAuth(signupForm.email.value, signupForm.password.value, isSignup);
  };

  const switchAuthModelHandler = () => {
    setIsSignup(!isSignup);
  };

  const formElementArray = [];
  for (let key in signupForm) {
    formElementArray.push({
      id: key,
      config: signupForm[key]
    });
  }

  const form = formElementArray.map(formElement => (
    <Input
      key={formElement.id}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      elementType={formElement.config.elementType}
      value={formElement.config.value}
      changed={event => inputChangeHandler(event, formElement.id)}
      elementConfig={formElement.config.elementConfig}
    />
  ));

  return props.loading ? (
    <Spinner />
  ) : (
    <div className={classes.Auth}>
      {props.isAuth ? <Redirect to={props.authRedirectPath} /> : null}
      {props.error ? <p>{props.error.message}</p> : null}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">{isSignup ? "Sign Up" : "Sign In"}</Button>
      </form>
      <Button clicked={switchAuthModelHandler} btnType="Info">
        {"Switch to " + (isSignup ? "Sign In" : "Sign Up")}
      </Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actionCreators.auth(email, password, isSignup)),
    onSetAuthRedirectPath: path =>
      dispatch(actionCreators.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(auth);

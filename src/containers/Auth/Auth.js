import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import * as actionCreators from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { checkValidity } from "../../shared/utility";

class Auth extends Component {
  state = {
    isSignup: false,
    signupForm: {
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
    }
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedictPath !== "/") {
      this.props.onSetAuthRedirectPath("/");
    }
  }

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedSignupForm = {
      ...this.state.signupForm
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
    this.setState({ signupForm: updatedSignupForm });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.signupForm.email.value,
      this.state.signupForm.password.value,
      this.state.isSignup
    );
  };

  switchAuthModelHandler = () => {
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup
      };
    });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.signupForm) {
      formElementArray.push({
        id: key,
        config: this.state.signupForm[key]
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
        changed={event => this.inputChangeHandler(event, formElement.id)}
        elementConfig={formElement.config.elementConfig}
      />
    ));

    return this.props.loading ? (
      <Spinner />
    ) : (
      <div className={classes.Auth}>
        {this.props.isAuth ? (
          <Redirect to={this.props.authRedirectPath} />
        ) : null}
        {this.props.error ? <p>{this.props.error.message}</p> : null}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">
            {this.state.isSignup ? "Sign Up" : "Sign In"}
          </Button>
        </form>
        <Button clicked={this.switchAuthModelHandler} btnType="Info">
          {"Switch to " + (this.state.isSignup ? "Sign In" : "Sign Up")}
        </Button>
      </div>
    );
  }
}

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
)(Auth);

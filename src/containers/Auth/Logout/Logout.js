import React, { useEffect } from "react";
import {} from "react-router-dom";
import * as actionCreators from "../../../store/actions/index";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const logout = props => {
  useEffect(() => {
    props.onLogout();
  }, []);
  return <Redirect to="/" />;
};

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(actionCreators.logout())
});

export default connect(
  null,
  mapDispatchToProps
)(logout);

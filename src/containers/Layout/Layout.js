import React, { useState } from "react";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

const layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return (
    <>
      <Toolbar
        drawerToggleClicked={sideDrawerToggleHandler}
        isAuth={props.isAuth}
      />
      <SideDrawer
        closed={sideDrawerClosedHandler}
        open={showSideDrawer}
        isAuth={props.isAuth}
      />
      <main className={classes.Content}>{props.children}</main>
    </>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.token !== null
});

export default connect(mapStateToProps)(layout);

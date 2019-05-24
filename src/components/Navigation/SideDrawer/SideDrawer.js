import React from "react";
import classes from "./SideDrawer.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import BackDrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) attachedClasses[1] = classes.Open;
  return (
    <>
      <BackDrop clicked={props.closed} show={props.open} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuth} />
        </nav>
      </div>
    </>
  );
};

export default sideDrawer;

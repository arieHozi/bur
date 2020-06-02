import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrowerToggle from "../Sidedrawer/DrowerToggle/DrowerToggle";

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrowerToggle clicked={props.toggelDrawer} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;

import React from "react";
import { Link } from "react-router-dom";
const Nav = (props) => {
  const loggingOUT = () => {
    props.logOut();
  };
  const dim = () => {
    let i_dim_menu = document.getElementById("i_dim_menu");
    if (i_dim_menu.title === "unclicked") {
      i_dim_menu.title = "clicked";
      document.documentElement.style.setProperty("--blue", "#282828");
      document.getElementById("fetching_out_page").style.backgroundColor =
        "var(--white)";
    } else {
      i_dim_menu.title = "unclicked";
      document.documentElement.style.setProperty("--blue", "#1877f2");
      document.getElementById("fetching_out_page").style.backgroundColor =
        "var(--black)";
    }
  };
  const clickMenu = () => {
    let menuaside_main_page = document.getElementById("menuaside_main_page");
    let i_nav_menu = document.getElementById("i_nav_menu");

    if (i_nav_menu.title === "unclicked") {
      i_nav_menu.title = "clicked";
      menuaside_main_page.style.display = "inline";
    } else {
      i_nav_menu.title = "unclicked";
      menuaside_main_page.style.display = "none";
    }
  };
  return (
    <nav id="app_nav" className="fr">
      <Link to="/">
        <i class="fas fa-home" id="i_nav_home"></i>
      </Link>
      <i onClick={loggingOUT} class="fas fa-sign-out-alt" id="i_nav_logout"></i>
      <i
        id="i_nav_menu"
        title="unclicked"
        onClick={clickMenu}
        class="fas fa-bars"
      ></i>
      <i
        id="i_dim_menu"
        class="fas fa-adjust"
        title="unclicked"
        onClick={dim}
      ></i>
      <i id="i_bell" class="fas fa-bell" title="unclicked"></i>
    </nav>
  );
};

export default Nav;
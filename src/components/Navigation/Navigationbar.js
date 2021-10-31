
import React, { useState } from "react";
import {
  NavLink
} from "react-router-dom";
import { Container,Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Navigationbar.css'
import socketIOClient from "socket.io-client";


var socket;
const Navigationbar = (prop) => {
  socket = socketIOClient("https://job-search-apic.herokuapp.com/", { transports : ['websocket'] });
  let but =null
  let auth = prop.auth
  if(auth){
    but= <Button onClick={prop.logoutHandler}> Logout </Button>
  }
  else{
    but= <Link to="./login" className="sign"> <Button> Login </Button> </Link>
  }
  return (
      <div  className="primary">
      <Container>
      <nav className="nav-flex">
        <ul id="Nav_menu">
          <li>
          <NavLink
            to="/"
            className="Nav_link"
            activeClassName="activeRoute"
          >
            Home
          </NavLink>
          </li>
          <li>
          <NavLink
            to="/experiences"
            className="Nav_link"
          >
            Experience
          </NavLink>
          </li>
          <li>
          <NavLink
            to="/about"
            className="Nav_link"
          >
            About
          </NavLink>
          </li>
          <li>
          <NavLink
            to="/myposts"
            className="Nav_link"
          >
            My Posts
          </NavLink>
          </li>
        </ul>
        <div>
          {but}
        </div>
      </nav>

      </Container>

    </div>
  )
}

export {Navigationbar, socket};

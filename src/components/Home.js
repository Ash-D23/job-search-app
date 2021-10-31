import React from "react";
import { Redirect } from "react-router-dom";
import Dashboard from './Dashboard/Dashboard'
import Login from './Login/Login'

class Home extends React.Component {

  render() {
    if(this.props.isAuth){
      return <Dashboard />
    }
    else{
      return <Login loginHandler={this.props.loginHandler} />
    }
  }
}

export default Home;

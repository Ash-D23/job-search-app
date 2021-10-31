import React from "react"
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css'

import { Navigationbar } from './components/Navigation/Navigationbar'
import { Container } from 'react-bootstrap'
import Home from './components/Home'
import About from './components/About/About'
import Experiences from './components/Experience/Experiences'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import SingleJobPost from './components/SingleJobPost/SingleJobPost'
import SingleInterviewPost from './components/SingleInterviewPost/SingleInterviewPost'
import MyPosts from './components/Myposts/Myposts'


class App extends React.Component {
  state={
    isAuth: false,
    token: null
  }

  logoutHandler = () => {
    localStorage.removeItem("token");
    this.setState({ isAuth: false, token: null });
  }

  loginHandler = (tok) => {
    this.setState({ isAuth: true, token: tok });
  }

  componentDidMount(){

    if(!this.state.isAuth){

      const tok=localStorage.getItem("token")
      if(tok){
        this.setState({ isAuth: true, token: tok });
      }
    }
  }


  render(){

  return (
    <Router >
      <div>
        <Navigationbar auth={this.state.isAuth} logoutHandler={this.logoutHandler} />
        <Container>
          <Switch>
            <Route path="/experiences">
              <Experiences isAuth={this.state.isAuth} loginHandler={this.loginHandler} />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/login">
              <Login isAuth={this.state.isAuth} loginHandler={this.loginHandler}/>
            </Route>
            <Route path="/signup">
              <SignUp  />
            </Route>
            <Route path="/myposts">
              <MyPosts isAuth={this.state.isAuth} loginHandler={this.loginHandler} />
            </Route>
            <Route
              path="/job/:postId"
              render={props => (
                <SingleJobPost isAuth={this.state.isAuth} loginHandler={this.loginHandler}
                  {...props}
                />
              )}
            />
            <Route
              path="/interview/:postId"
              render={props => (
                <SingleInterviewPost isAuth={this.state.isAuth} loginHandler={this.loginHandler}
                  {...props}
                />
              )}
            />
            <Route path="/">
              <Home isAuth={this.state.isAuth} loginHandler={this.loginHandler} />
            </Route>
          </Switch>
        </Container>

      </div>
    </Router>
  );
}
}

export default App;

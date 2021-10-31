import React from "react";

import CustomButton from '../Custom-Button/Custom-Button.component'
import { withRouter } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Loader from '../Loader/Loader';

class SignUp extends React.Component {
  state={
    name:'',
    email:'',
    password:'', 
    error: false,
    isloading: false
  }

  handleerrorClose = ()=>{
    this.setState({ error: false })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    const apicall = async (e) => {
      try {
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state)
            }
            const response = await fetch('https://job-search-apic.herokuapp.com/auth/signup', config)
            if(!response.ok){
              throw response.status
            }
            const res = await response.json();
            console.log(res)
            
            this.props.history.push('/');

        } catch (error) {
            console.log(error)
            this.setState({ error: true, isloading: false})
        }

    }
    if(this.state.name){
      this.setState({isloading: true})
      apicall(e)
    }else{
      this.setState({ error: true})
    }

  }


  render() {
    return (
      <div className="login-main">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <h3> Sign Up Form </h3>
          <div className="form-input">
          <label htmlFor="name">Name </label>
          <input
            type="text"
            id="name"
            value={this.state.name}
            onChange={(e) => this.setState({name: e.target.value})}
          />
          <label htmlFor="email">Email </label>
          <input
            type="email"
            id="email"
            value={this.state.email}
            onChange={(e) => this.setState({email: e.target.value})}
          />
          </div>
          <div className="form-input">
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            value={this.state.password}
            onChange={(e) => this.setState({password: e.target.value})}
          />
          </div>
          <CustomButton onClick={this.handleSubmit} > Sign Up </CustomButton>
          {this.state.isloading ? (<div className="login-loader"><Loader /></div> ): null}
        </form>

        <Snackbar open={this.state.error} autoHideDuration={4000} onClose={this.handleerrorClose}>
          <Alert onClose={this.handleerrorClose} severity="error">
            There was an error!
          </Alert>
        </Snackbar>

      </div>
    )
  }
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default withRouter(SignUp);

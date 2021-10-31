import React from "react";
import './Login.css'
import CustomButton from '../Custom-Button/Custom-Button.component'
import { Link, Redirect } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Loader from '../Loader/Loader';

class Login extends React.Component {
  state={
    email:'',
    password:'',
    open: false,
    error: false,
    isloading: false
  }

  handleClose = ()=>{
    this.setState({ open: false})
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
            const response = await fetch('https://job-search-apic.herokuapp.com/auth/login', config)

            if(!response.ok){
              throw new Error('Something went wrong');
            }
            const res = await response.json();

            const token = res.token
            localStorage.setItem("token",token)
            this.setState({ open: true, isloading: false})
            this.props.loginHandler(token)
            


        } catch (error) {
            console.log(error)
            
            this.setState({ error: true, isloading: false})
        }

    }
    this.setState({isloading: true})
    apicall(e)

  }
  


  render() {
    return this.props.isAuth ? (<Redirect to="/" />
    ) :(
      <div className="login-main">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <h3> Login Form </h3>
          <div className="form-input">
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
          <CustomButton> Login </CustomButton>
          <Link to="/signup" className="sign"> Sign Up </Link>

          {this.state.isloading ? (<div className="login-loader"><Loader /></div> ): null}
        </form>

        <Snackbar open={this.state.open} autoHideDuration={4000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="success">
            Succesfully logged in!
          </Alert>
        </Snackbar>

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

export default Login;

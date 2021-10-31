import React, { Component } from 'react';
import Login from '../Login/Login'
import './Singlepost.css'
import Loader from '../Loader/Loader'
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

class SinglePost extends Component {
  state={
    data: ""
  }
  componentDidMount() {
      const postId = this.props.match.params.postId;
     const apicall = async () => {
       try {
             const config = {
                 method: 'GET',
                 headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer '+ localStorage.getItem("token")
                 }
             }
             const response = await fetch(`https://job-search-apic.herokuapp.com/job/singlejob/${postId}`, config)

             const res = await response.json();

             this.setState({data: res.post})


         } catch (error) {
                 console.log(error)
         }

     }
     apicall()
 }



  render(){
    const postId = this.props.match.params.postId;

    if(!this.props.isAuth){
    return <Login loginHandler={this.props.loginHandler} />
  }
  else{
    return (
      <div className="single-post-container">
      {this.state.data ? <div className="single-post">
        <h2>{this.state.data.title}</h2>
        <p>Company: {this.state.data.Company}</p>
        <p>{this.state.data.Description}</p>
        <div className="post-date">
          <p>Date: {this.state.data.Date}</p>
          <p>Posted by: {this.state.data.creator}</p>
        </div>
        <a href={ this.state.data.link }><Button>Visit Link</Button></a>
        
      </div>  : <Loader />}

      </div>
    )
  }
}
}

export default SinglePost;

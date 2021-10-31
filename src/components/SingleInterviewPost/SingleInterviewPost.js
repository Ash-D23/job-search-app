import React, { Component } from 'react';
import Login from '../Login/Login'
import Loader from '../Loader/Loader'

class SingleInterviewPost extends Component {
  state={
    data: ""
  }

  componentDidMount() {

       const apicall = async () => {
       const post = this.props.match.params.postId;
       console.log(post)
       const url="https://job-search-apic.herokuapp.com/experience/singleinterview/"+post;
       try {
             const config = {
                 method: 'GET',
                 headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer '+ localStorage.getItem("token")
                 }
             }

             const response = await fetch(url, config)

             const res = await response.json();
             console.log(res)
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
        </div>  : <Loader />}

        </div>

      )
    }
  }
}

export default SingleInterviewPost;

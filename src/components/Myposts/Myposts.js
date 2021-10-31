import React, { Component } from 'react'
import JobPosts from '../JobPosts/JobPosts'
import InterviewPosts from '../InterviewPosts/InterviewPosts';
import './Myposts.css'
import Login from '../Login/Login';
export default class Myposts extends Component {
    render() {
        if(!this.props.isAuth){
            return <Login loginHandler={this.props.loginHandler} />
        }else{

        
        return (
            <div className="myposts">
                
                <JobPosts />
                <InterviewPosts />
            </div>
        )
        }
    }
}

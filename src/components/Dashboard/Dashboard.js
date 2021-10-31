import React from "react";
import Jobitem from '../JobItem/jobitem'
import { Modal,Button } from 'react-bootstrap'
import "./Dashboard.css"
import CreateJobModal from '../JobModal/CreateJobModal'
import CustomButton from '../Custom-Button/Custom-Button.component'
import axios from 'axios';
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";
import {socket} from '../Navigation/Navigationbar'

class Dashboard extends React.Component {
  state={
    openModal: false,
    isloading: false,
    currentpage: 0,
    joblist: []
  }

  openModalHandler = ()=>{
    this.setState({openModal:true})
  }

  closeModal = ()=>{
    this.setState({openModal:false})
  }

  getdata = ()=>{
    console.log("getting job data")
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
            const response = await fetch('https://job-search-apic.herokuapp.com/job/job', config)

            const res = await response.json();
            this.setState({joblist: res.posts.reverse()})
            this.setState({isloading: false})


        } catch (error) {
                console.log(error)
                this.setState({isloading: false})
        }

    }

    this.setState({isloading: true})
    apicall();
  }

  adddata = (data)=>{

    let arr = this.state.joblist
    arr.unshift(data)
    this.setState({joblist: arr})
    
  }



  componentDidMount() {
   /*fetch(`http://localhost:4000/job/job`)
     .then(res => res.json())
     .then(json => this.setState({ data: json }));*/

    //socket.emit("initial_job_data");
    this.getdata()
    socket.on("add_job_data", (data) => this.adddata(data))
   
 }

 /*componentDidUpdate() {

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
            const response = await fetch('http://localhost:4000/job/job', config)

            const res = await response.json();
            console.log(res.posts)
            this.setState({joblist: res.posts})


        } catch (error) {
                console.log(error)
        }

    }
    apicall()
 }
 */

  setcurrent = (num)=>{
    let totalpages = Math.ceil(this.state.joblist.length/5)
    if(num<0){
      this.setState({currentpage: 0})
    }
    else if(num>=totalpages-1){
      this.setState({currentpage: totalpages-1})
    }
    else{
      this.setState({currentpage: num})
    }
  
  }

  render() {

    const perpage=5;
    let start = this.state.currentpage*perpage;
    let end = start+perpage;

    return this.state.isloading ? (<Loader /> ) : (
    <div className="dir-container">
    <h1 className="title"> Welcome to Student Placement Cell </h1>
    <div className="button-container">
      <CustomButton onClick={this.openModalHandler}> Create Post </CustomButton>

      <Link className="signu" to="/about" ><CustomButton > Placements </CustomButton></Link>

    </div>
      {this.state.joblist ? this.state.joblist.slice(start, end).map((item, index) => (
        <Jobitem key={index} item={item} />
      )) : <p className="center">No posts to View</p>}

      <Pagination current={this.state.currentpage} setcurrent={this.setcurrent} />

      <Modal show={this.state.openModal} onHide={this.closeModal}>
        <CreateJobModal closeModal={this.closeModal} />
      </Modal>
    </div>
  );
  }
}

export default Dashboard;

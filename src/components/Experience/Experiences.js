import React from "react";
import Interviewitem from '../InterviewItem/InterviewItem'
import './Experiences.css'
import { Modal,Button } from 'react-bootstrap'
import CreateInterviewModal from '../InterviewModal/CreateInterviewModal'
import Login from '../Login/Login'
import CustomButton from '../Custom-Button/Custom-Button.component'
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";
import {socket} from '../Navigation/Navigationbar'

class Experiences extends React.Component {

  state={
    openModal: false,
    interviewlist: [],
    currentpage: 0,
    isloading: false
  }

  openModalHandler = ()=>{
    this.setState({openModal:true})
  }

  closeModal = ()=>{
    this.setState({openModal:false})
  }

  getdata = ()=>{

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
            const response = await fetch('https://job-search-apic.herokuapp.com/experience/experience', config)

            const res = await response.json();

            console.log(res)
            this.setState({interviewlist: res.posts.reverse(), isloading: false})

        } catch (error) {
            console.log(error)
            this.setState({isloading: false})
        }

    }
    this.setState({isloading: true})
    apicall()

  }

  adddata = (data)=>{
    let arr = this.state.interviewlist
    arr.unshift(data)
    this.setState({interviewlist: arr})
  }

  componentDidMount() {

    //socket.emit("initial_experience_data");
    this.getdata()
    socket.on("add_experience_data", (data) => this.adddata(data))
 }


setcurrent = (num)=>{
  let totalpages = Math.ceil(this.state.interviewlist.length/5)
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

  if(!this.props.isAuth){
    return <Login loginHandler={this.props.loginHandler} />
  }
  else{
    return this.state.isloading ? (<Loader />) : (
    <div className="dir-container">
    <h1 className="title"> Welcome to Student Placement Cell </h1>
    <div className="button-container">
      <CustomButton onClick={this.openModalHandler}> Create Post </CustomButton>
      <Link to="/about" ><CustomButton > Placements </CustomButton></Link>
    </div>
      {this.state.interviewlist ? this.state.interviewlist.slice(start, end).map((item, index) => (
        <Interviewitem key={index} item={item} />
      )) : <p className="center"> No posts to view</p>}

    <Pagination current={this.state.currentpage} setcurrent={this.setcurrent} />

      <Modal show={this.state.openModal} onHide={this.closeModal}>
        <CreateInterviewModal closeModal={this.closeModal} />
      </Modal>
    </div>
  );
}
  }
}

export default Experiences;

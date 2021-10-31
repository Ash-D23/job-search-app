import React from "react";
import './InterviewItem.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Interviewitem extends React.Component {
  render(){

    return(
      <div className="interviewlist">
        <div className="column1">
          <h2 className="interview-title">{this.props.item.title}</h2>
          <p>{this.props.item.Company}</p>
          <p>{this.props.item.Date}</p>
        </div>
        <div className="column2">
        <p>{this.props.item.Description.length > 100 ? `${this.props.item.Description.slice(0,100)}...`: this.props.item.Description}</p>
          <p>{this.props.item.Creator}</p>
          <Link to={`interview/${this.props.item._id}`} ><Button>View More</Button></Link>
        </div>
      </div>
    )
  }

}
export default Interviewitem;

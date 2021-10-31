import React from "react";
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import "./jobitem.css";

class Jobitem extends React.Component {
  render(){
    return(
      <div className="joblist">
        <div className="col1">
          <h2 className="job-title">{this.props.item.title}</h2>
          <p>{this.props.item.Company}</p>
          <p>{this.props.item.Date}</p>
        </div>
        <div className="col2">
          <p>{this.props.item.Description.length > 100 ? `${this.props.item.Description.slice(0,100)}...`: this.props.item.Description}</p>
          <p>{this.props.item.Creator}</p>
          <Link to={`job/${this.props.item._id}`} ><Button>View More</Button></Link>
        </div>
      </div>
    )
  }

}
export default Jobitem;

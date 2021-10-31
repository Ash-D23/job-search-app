import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Loader from '../Loader/Loader';
export default class JobPosts extends Component {

    state={
        isloading: false,
        jobs: []
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
                const response = await fetch('https://job-search-apic.herokuapp.com/job/jobsbyuser', config)
    
                const res = await response.json();
                console.log(res.posts)
                this.setState({jobs: res.posts.reverse()})
                this.setState({isloading: false})
    
    
            } catch (error) {
                    console.log(error)
                    this.setState({isloading: false})
            }
    
        }
    
        this.setState({isloading: true})
        apicall();
      }

    componentDidMount() {
        this.getdata()
    }

    handleDelete = (index, id)=>{

        const apicall = async () => {
            try {
                  const config = {
                      method: 'POST',
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': 'Bearer '+ localStorage.getItem("token")
                      }
                  }
                  const response = await fetch('https://job-search-apic.herokuapp.com/job/deletejob/'+id, config)
      
                  const res = await response.json();
                  console.log(res)
                  
                  let arr  = this.state.jobs
                  arr.splice(index,1)

                  this.setState({jobs: arr})
                  //this.setState({isloading: false})
      
      
              } catch (error) {
                      console.log(error)
              }
      
          }

          apicall();

    }

    render() {
        return this.state.isloading ? (<Loader />) : (
            <div>
                
                <h3 className="title"> My Job Posts </h3>
                { !this.state.jobs ? (<h3>No posts</h3>) : (
                    this.state.jobs.map((item, index)=>{
                        return (
                            <div key={index}>
                                <div className="joblist">
                                    <div className="col1">
                                    <h2 className="job-title">{item.title}</h2>
                                    <p>{item.Company}</p>
                                    <p>{item.Date}</p>
                                    </div>
                                    <div className="col2">
                                    <p>{item.Description.length > 100 ? `${item.Description.slice(0,100)}...`: item.Description}</p>
                                    <p>{item.Creator}</p>
                                        <Button onClick={() => this.handleDelete(index, item._id)}>Delete</Button>
                                    </div>
                                </div>
                                
                            </div>
                            
                        )
                    })
                )}
            </div>
        )
    }
}

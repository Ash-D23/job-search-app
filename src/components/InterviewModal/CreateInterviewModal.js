import React, { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import {socket} from '../Navigation/Navigationbar'

class CreateInterviewModal extends React.Component {
  state={
    title: '',
    company: '',
    description: ''
  }

  handleSubmit = (e)=> {

    e.preventDefault()
    console.log(this.state)

    const apicall = async () => {
      try {
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ localStorage.getItem("token")
                },
                body: JSON.stringify(this.state)

            }
            const response = await fetch('https://job-search-apic.herokuapp.com/experience/createexperience', config)

            const res = await response.json();

            socket.emit("create_experience", res);

        } catch (error) {
                console.log(error)
        }

    }
    apicall()

    this.props.closeModal()
  }
  render(){
      return(
        <>
        <Modal.Header closeButton>Create Interview Post</Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" required onChange={ e => this.setState({'title': e.target.value}) } />
            </Form.Group>
            <Form.Group>
              <Form.Label>Company</Form.Label>
              <Form.Control type="text"required onChange={ e => this.setState({'company': e.target.value}) }/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Interview Experience</Form.Label>
              <textarea className="textarea form-control" rows="3" required onChange={ e => this.setState({'description': e.target.value}) }/>
            </Form.Group>
            <Button type="submit">Create</Button>
          </Form>
        </Modal.Body>
        </>
      )

  }

}

export default CreateInterviewModal;

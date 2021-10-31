import React from "react";
import './About.css'
import Footer from '../Footer/Footer'

class About extends React.Component {
  render() {
    return (
      <div className="about-container">
        <h1 className="title">About</h1>
        <div className="about-section">
            <div className="about-col1">
              <div className="imgwrap">
                <img src="/job-search-app/about.svg" className="image" />
              </div>
            </div>
            <div className="about-col2">
              <p>Student Placement cell helps pre-final year & Final year students to know about off campus placements and learn
              about interview experiences from their aluminis who got placed in previous years and are here to mentor them.</p>
            </div>
        </div>
        <div className="companies">
          <h1 className="title">Aluminis</h1>
          <div className="card-sec">
            <div className="cards">
              <img className="cimage" src="https://avatars.dicebear.com/api/human/563.svg" />
              <h2 className="title">Akshay</h2>
              <p>Amazon</p>
            </div>

            <div className="cards">
              <img className="cimage" src="https://avatars.dicebear.com/api/human/345.svg" />
              <h2 className="title">Saina</h2>
              <p>Paypal</p>
            </div>

            <div className="cards">
              <img className="cimage" src="https://avatars.dicebear.com/api/human/234.svg" />
              <h2 className="title">Karan</h2>
              <p>Zomato</p>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default About;

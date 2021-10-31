import React from 'react'
import  './Footer.css'

function Footer() {
  return (
    <>
      <div className="container-foot">
        <h3 className="">Contact US</h3>

        <div className="foot-links">
        <ul>
          <li><a href="https://www.facebook.com/people/Ashutosh-Kumar/100007997316460" className="social-icon icon-white" ><i className="fab fa-facebook fa-2x "></i></a></li>
          <li><a href="https://www.linkedin.com/in/ashutosh18k23/" className="social-icon icon-white"><i className="fab fa-linkedin fa-2x "></i></a></li>
          <li><a href="https://github.com/Ash-D23" className="social-icon icon-white"><i className="fab fa-github fa-2x "></i></a></li>
          <li><a className="social-icon icon-white"><i className="fas fa-envelope fa-2x "></i></a></li>
        </ul>
        </div>

        <div className="foot-bottom">
          <p>Copyrights &copy; 2021 All Rights Reserved by Ashutosh.</p>
        </div>
      </div>

    </>
  )
}

export default Footer

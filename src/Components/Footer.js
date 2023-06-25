import React from 'react'
import "./footer.css"

const Footer = () => {
  return (
       
    <div className='footer-container'>
      <h5>
        &copy; {new Date().getFullYear()}
        <span> ComfySloth </span>
      </h5>
      <h5>All rights reserved</h5> 
    </div>
  )
}

export default Footer

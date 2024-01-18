import React from 'react'
import img from '../../assets/doc_home.jpg'

const BrainTumor = () => {
  return (
    <div className="assessment-page">
      <section className="hero">
        <img src={img} alt="Assessment Image" className="hero-image" />
        <div className="hero-content">
        <h1>Brain Tumor Assessment</h1>
          <p>
            Perform a comprehensive assessment for Brain Tumor. Gather patient
            information and analyze symptoms to make informed decisions and
            provide effective treatment plans.
          </p>
          <button className="start-assessment-btn">Start Assessment</button>
        </div>
      </section>
    </div>
  )
}

export default BrainTumor
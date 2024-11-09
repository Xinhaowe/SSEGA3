import React from 'react';
import "./UserProfileCard.css";

export default function WorkerProfileCard(): JSX.Element {
  return (
    <div className="card-container">
      <img
        className="round"
        src="https://static.vecteezy.com/system/resources/thumbnails/005/544/770/small/profile-icon-design-free-vector.jpg"
      />
      <h3>Jhon Smith</h3>

      <div className="buttons">
        <button className="primary">Book A Service</button>
      </div>
      <div className="skills">
        <h6>Skills</h6>
        <ul>
          <li>Plumbing</li>
          <li>Electrical</li>
          <li>Carpentry</li>
          <li>AC unit installation and repair</li>
          <li>Painting and Decorating</li>
          <li>Appliance Repair</li>
          <li>Cleaning Services</li>
        </ul>
      </div>
    </div>
  );
}

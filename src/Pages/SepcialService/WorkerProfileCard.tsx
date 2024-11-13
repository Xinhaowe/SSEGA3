import React from 'react';
import "./UserProfileCard.css";

interface Worker {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  skills: string[];
}

interface WorkerProfileCardProps {
  worker: Worker;
}

export default function WorkerProfileCard({ worker }: WorkerProfileCardProps): JSX.Element {
  return (
    <div className="card-container">
      <img
        className="round"
        src="https://static.vecteezy.com/system/resources/thumbnails/005/544/770/small/profile-icon-design-free-vector.jpg"
        alt="Profile"
      />
      <h3>{worker.firstName} {worker.lastName}</h3>
      <p>Phone: {worker.phoneNumber}</p>
      <div className="buttons">
        <button className="primary" onClick={() => window.location.href = '/BookSpecialService'}>Book A Service</button>
      </div>
      <div className="skills">
        <h6>Skills</h6>
        <ul>
          {worker.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

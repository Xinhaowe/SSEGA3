import React from 'react';
import "./UserProfileCard.css";

export default function UserProfileCard(): JSX.Element {
  return (
    <div className="card-container">
      <img
        className="round"
        src="https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg"
      />
      <h3>User Name</h3>

      <div className="buttons">
        <button className="primary">View Profile</button>
      </div>
    </div>
  );
}

import React, { useState } from "react";

export default function InfoFriend(props) {
  let { firstName, lastName, picture, email, dob, gender } = props.data;

  let [showInfo, setShowInfo] = useState(false);
  return (
    <div className="infoFriend">
      <div
        onClick={() => {
          setShowInfo(!showInfo);
        }}
      >
        <h3>
          {firstName} {lastName}
        </h3>
        <img src={picture} />
      </div>
      {showInfo && (
        <ul>
          <li>
            <p>
              <b>Email: </b>
              {email}
            </p>
          </li>
          <li>
            <p>
              <b>Dob: </b>
              {dob.slice(0, -14)}
            </p>
          </li>
          <li>
            <p>
              <b>Gender: </b>
              {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </p>
          </li>
        </ul>
      )}
    </div>
  );
}
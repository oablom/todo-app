import React, { useState } from "react";

export default function InfoFriend(props) {
  let { firstName, lastName, picture, email, dob, gender } = props.data;

  let [showInfo, setShowInfo] = useState(false);
  return (
    <>
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
            <h4>{email}</h4>
          </li>
          <li>
            <h4>{dob.slice(0, -14)}</h4>
          </li>
          <li>
            <h4>{gender.charAt(0).toUpperCase() + gender.slice(1)}</h4>
          </li>
        </ul>
      )}
    </>
  );
}

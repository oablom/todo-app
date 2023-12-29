import React, { useState } from "react";

export default function InfoFriend(props) {
  const { data, onDelete } = props;
  let { firstName, lastName, picture, email, dob, gender } = props.data;

  let [showInfo, setShowInfo] = useState(false);

  // Passes the entire friend's data to be deleted
  const handleDelete = () => {
    onDelete(data);
  };

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
              <b>DOB: </b>
              {dob.slice(0, -14)}
            </p>
          </li>
          <li>
            <p>
              <b>Gender: </b>
              {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </p>
          </li>
          <li>
            <button onClick={handleDelete}>
              <span role="img" aria-label="trash-can">
                🗑️
              </span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

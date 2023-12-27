import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";

export default function Home() {
  const [myFriends, setMyFriends] = useState(() => {
    // Retrieve myFriends from localStorage if available, otherwise use the default value
    const storedFriends = localStorage.getItem("myFriends");
    return storedFriends
      ? JSON.parse(storedFriends)
      : [
          {
            firstName: "Peter",
            lastName: "Parker",
            picture: "https://randomuser.me/api/portraits/med/men/71.jpg",
          },
          {
            firstName: "Mary",
            lastName: "Jane",
            picture: "https://randomuser.me/api/portraits/med/women/95.jpg",
          },
          {
            firstName: "Mario",
            lastName: "Mario",
            picture: "https://randomuser.me/api/portraits/med/men/41.jpg",
          },
        ];
  });

  // Function to get the latest three friends
  const getLatestFriends = () => {
    return myFriends.slice(-3); // Extracting the last 3 friends
  };

  const latestThreeFriends = getLatestFriends();

  return (
    <div className="homepage">
      <div className="tasks-homepage">
        <h2>Top 3 tasks</h2>
        <Link to="/tasks">
          <button className="nav-btn">See more</button>
        </Link>
      </div>

      <div className="habits-homepage">
        <h2>Top 3 habits</h2>

        <Link to="/habits">
          <button className="nav-btn">See more</button>
        </Link>
      </div>

      <div className="friends-homepage">
        <h2>Recently Added Friends</h2>
        <ul>
          {latestThreeFriends.map((friend, index) => (
            <li key={index}>
              <p>{`${friend.firstName} ${friend.lastName}`}</p>
              <img src={friend.picture} />
            </li>
          ))}
        </ul>
        <Link to="/friends">
          <button className="nav-btn">See More</button>
        </Link>
      </div>
    </div>
  );
}

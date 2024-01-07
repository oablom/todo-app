import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";

export default function Home() {
  const [latestTasksArray, setLatestTasksArray] = useState([]);
  const [taskArray, setTaskArray] = useState([]);
  const [showMoreIndex, setShowMoreIndex] = useState(null);
  const [habits, setHabits] = useState(() => {
    const storedHabits = localStorage.getItem("habits");
    return storedHabits
      ? JSON.parse(storedHabits)
      : [
          {
            title: "Reading",
            priority: "mid",
            streak: 2,
          },
          {
            title: "Gaming",
            priority: "low",
            streak: 0,
          },
          {
            title: "Gym",
            priority: "high",
            streak: 10,
          },
        ];
  });

  const getTopHabits = () => {
    return habits.slice(0, -3);
  };

  const topHabits = getTopHabits();
  // console.log(topHabits);
  // console.log(habits);

  // const latestTasks = [{}];
  useEffect(() => {
    let latestTasksString = localStorage.getItem("taskArray");
    let latestTasks = JSON.parse(latestTasksString);
    setLatestTasksArray(latestTasks);
  }, []);

  useEffect(() => {
  
    if (!latestTasksArray) {
      return;
    }
    let latestTaskArrayCopy = [...latestTasksArray];
    latestTaskArrayCopy = latestTaskArrayCopy.filter((task) => !task.completed);
 

    latestTasksArray.length > 3 ?
      setTaskArray(latestTaskArrayCopy.slice(0, 3)) : setTaskArray(latestTaskArrayCopy);
  }, [latestTasksArray]);

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
  useEffect(() => {
    console.log(showMoreIndex);
  }, [showMoreIndex]);

  return (
    <div className="homepage">
      <div className="tasks-homepage">
        <h2>Top 3 uncompleted tasks</h2>

        {taskArray?.map((task, index) => (
          <div
            className="task-wrapper"
            key={index}
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              padding: showMoreIndex === index ? "20px" : "10px",
              overflow: showMoreIndex === index ? "auto" : "hidden",
            }}
            onClick={(e) => {
              setShowMoreIndex((prev) => (prev === index ? null : index));
              console.log(showMoreIndex);
              e.stopPropagation();
            }}
          >
            {showMoreIndex === index ? (
              <div>
                <h3>Title:</h3>
                <div
                  className="task-text-border"
                  style={{ display: showMoreIndex === index }}
                >
                  <h3> {task.title}</h3>
                </div>
              </div>
            ) : (
              <h3>{task.title}</h3>
            )}

            {showMoreIndex === index && (
              <div>
                <h3>Description:</h3>{" "}
                <div className="task-text-border">
                  <h3>{task.description}</h3>
                </div>
                <h3>Time Estimate:</h3>{" "}
                <div className="task-text-border">
                  <h3>{task.timeEstimate} minutes</h3>
                </div>
                <h3>
                  Type of activity: <br />
                </h3>{" "}
                <div className="task-text-border">
                  <h3>{task.type}</h3>
                </div>
              </div>
            )}
          </div>
        ))}

        <Link to="/tasks">
          <button className="nav-btn">See more</button>
        </Link>
      </div>

      <div className="habits-homepage">
        <h2>Top 3 habits</h2>

        <div className="front-page-habit-wrapper">
          {topHabits.map((habit, index) => (
            <div className={`front-page-habits ${habit.priority}`} key={index}>
              {`${habit.title} - Streak: ${habit.streak}`}
            </div>
          ))}
        </div>

        <Link to="/habits">
          <button className="nav-btn">See more </button>
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

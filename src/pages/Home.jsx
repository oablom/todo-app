import TaskPage from "./TaskPage.jsx";
import { Link } from "react-router-dom";

export default function Home() {
  const topHabits = [
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

  const latestTasks = [{}];

  const myFriends = [
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
  return (
    <div className="homepage">
      <div className="tasks-homepage">
        <h2>Top 3 tasks</h2>
        <button className="nav-btn">
          <Link to="/tasks">See more</Link>
        </button>
      </div>

      <div className="habits-homepage">
        <h2>Top 3 habits</h2>
        <ul>
          {topHabits.map((habit, index) => (
            <li key={index}>
              {`${habit.title} - Priority: ${habit.priority}`}
            </li>
          ))}
        </ul>
        <button className="nav-btn">
          <Link to="/habits">See more</Link>
        </button>
      </div>

      <div className="friends-homepage">
        <h2>Recently added friends</h2>
        <ul>
          {myFriends.map((friend, index) => (
            <li key={index}>
              <p>{`${friend.firstName} ${friend.lastName}`}</p>
              <img
                src={friend.picture}
                alt={`${friend.firstName} ${friend.lastName}`}
              />
            </li>
          ))}
        </ul>
        <button className="nav-btn">
          <Link to="/friends">See all friends</Link>
        </button>
      </div>
    </div>
  );
}

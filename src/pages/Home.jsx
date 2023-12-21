import TaskPage from "./TaskPage.jsx";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>

      <h2>Top 3 tasks</h2>
      <button className="nav-btn">
        <Link to="/tasks">See more</Link>
      </button>

      <h2>Top 3 habits</h2>
      <button className="nav-btn">
        <Link to="/habits">See more</Link>
      </button>

      <h2>Recently added friends</h2>
      <button className="nav-btn">
        <Link to="/friends">See all friends</Link>
      </button>
    </div>
  );
}

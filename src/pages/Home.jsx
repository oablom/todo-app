import TaskPage from "./TaskPage.jsx";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <button className="nav-btn">
        <Link to="/tasks">Tasks</Link>
      </button>

      <button className="nav-btn">
        <Link to="/habits">Habits</Link>
      </button>
      <button className="nav-btn">
        <Link to="/friends">Friends</Link>
      </button>
    </div>
  );
}

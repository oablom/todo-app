import "./styles/style.css";
import "./styles/taskpage.css";

import TaskPage from "./pages/TaskPage";
import HabitPage from "./pages/HabitPage";
import FriendPage from "./pages/FriendPage";
import Home from "./pages/Home";
import { Routes, Route, NavLink } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <nav className="app-navigation">
        <ul>
          <NavLink to="/" activeClassName="active">
            <li>Home</li>
          </NavLink>
          <NavLink to="/tasks" activeClassName="active">
            <li>Tasks</li>
          </NavLink>
          <NavLink to="/habits" activeClassName="active">
            <li>Habits</li>
          </NavLink>
          <NavLink to="/friends" activeClassName="active">
            <li>Friends</li>
          </NavLink>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/habits" element={<HabitPage />} />
        <Route path="/friends" element={<FriendPage />} />
      </Routes>
      {/* <TaskPage />
      <HabitPage />
      <FriendPage /> */}
    </div>
  );
}

export default App;

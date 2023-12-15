import logo from "./logo.svg";
import "./styles/style.css";

import TaskPage from "./pages/TaskPage";
import HabitPage from "./pages/HabitPage";
import FriendPage from "./pages/FriendPage";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
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

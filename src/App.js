import logo from "./logo.svg";
import "./styles/style.css";
// import Habits from "./components/Habits";
// import Tasks from "./components/Tasks";
// import Friends from "./components/Friends";
import TaskPage from "./pages/TaskPage";
import HabitPage from "./pages/HabitPage";
import FriendPage from "./pages/FriendPage";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Home />
      {/* <TaskPage />
      <HabitPage />
      <FriendPage /> */}
    </div>
  );
}

export default App;

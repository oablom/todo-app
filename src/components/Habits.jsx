import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NewHabit from "./NewHabit";

export default function Habits() {

  const [habits, setHabits] = useState([
    {
      title: "New habit 1",
      priority: "mid",
      streak: 2,
    },
    {
      title: "New habit 2",
      priority: "low",
      streak: 0,
    },
    {
      title: "New habit 3",
      priority:"high",
      streak: 10,
    },
    {title: "New habit 4",
    priority: "high",
    streak: 11},
    {title: "New habit 5",
    priority: "low",
    streak: 5},
    {title: "New Habit 6",
    priority: "low",
    streak: 11}]);

  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortedHabits, setSortedHabits] = useState("");
  const [filteredHabits, setFilteredHabits] = useState([])
  const [filterType, setFilterType] = useState("")

  const [editMode, setEditMode] = useState(false);
  const [habitSettings, setHabitSettings] = useState(null);


  useEffect(() => {

    let filteredHabits = priorityFilter === "all" ? habits : habits.filter((habit) => habit.priority === priorityFilter);

    let sortingHabits = [...filteredHabits];
    sortingHabits.sort((a,b) => {

      const priorityOrder = {low: 0, mid: 1, high: 2};
      const aPriority = priorityOrder[a.priority];
      const bPriority = priorityOrder[b.priority];

      return (
        (filterType === "priority" ? 
        (sortedHabits === "ascending" ? 1 : -1) * (aPriority - bPriority)
        : filterType === "streak" ? (sortedHabits === "ascending" ? 1 : -1) * (a.streak - b.streak) : 0)
      )
    });

    setFilteredHabits(sortingHabits)

  
  }, [habits, priorityFilter, sortedHabits, filterType]);  

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [])
  


  let editHabit = (i, edit) => {
    setHabits(oldHabits => {
      let editedHabits = [...oldHabits];
      editedHabits[i] = { ...editedHabits[i] };
      edit(editedHabits[i]);
      return editedHabits;
    }); 
  };

  let toggleEditMode = (i) => {
      setEditMode(!editMode);
      setHabitSettings(i);
      
  };



 console.log(filterType)
  return (
    <div>
      <div className="habits-legend">
        <div className="habits">
          <div className="header-container">
            <h1>My habits...</h1>
          </div>
          
          <div className="habit-container">

            <NewHabit habitList={habits} updateHabitList={setHabits}/>
            
            <div className="habitWrapper">
              <div className="sorting-and-filtering">

                {/* FILTRERADE HABITS */}
                <div className="filterWrapper">
                  <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
                    <option value="all">Filter by priority:</option>
                    <option value="all">All</option>
                    <option value="high">High</option>
                    <option value="mid">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                {/* SORTERINGSTYP */}
                <div className="typeWrapper">
                  <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                    <option value="">Sort by:</option>
                    <option value="priority">Priority</option>
                    <option value="streak">Streak</option>
                  </select>
                </div>

                {/* SORTERADE HABITS */}
                <div className="sortingWrapper">
                  <span className="sortingBtn"><label><input type="radio" value="ascending" checked={sortedHabits === "ascending"} onChange={(e) => setSortedHabits(e.target.value)} />Ascending</label></span>
                  <span className="sortingBtn"><label><input type="radio" value="descending" checked={sortedHabits === "descending"} onChange={(e) => setSortedHabits(e.target.value)} />Descending</label></span>
                </div>
            </div>

              {filteredHabits.map((habit, i) => (
                <div className={`myHabits ${editMode && i === habitSettings ? "editMode" : ""} ${habit.priority}`} 
                key={i} 
                style={{border: `3px solid ${habit.priority === "low" ? "green" : habit.priority === "mid" ? "yellow" : "red"}`}} 
                onClick={(e) => editMode && i === habitSettings && !e.target.classList.contains("edit-btn") ? e.stopPropagation() : editHabit(i, (edit) => (habit.streak += 1))}>

                  <div className={`priority-box ${habit.priority === "low" ? "green" : habit.priority === "mid" ? "yellow" : "red"}`}>{habit.priority}</div>
                  <h3>{habit.title}</h3>

                  {/* STREAK COUNTER  */}
                  <div className="streakContainer">
                    {editMode && i === habitSettings ? (
                      <p>
                      <button className="streak-counter" onClick={() => editHabit(i, edit => edit.streak -= 1)}>-</button>
                      {habit.streak}
                      <button className="streak-counter" onClick={() => editHabit(i,edit => edit.streak += 1)}>+</button>
                    </p>
                    ): (<p>{habit.streak}</p>)}

                    {/* OPEN EDIT HABIT MODE */}
                  {editMode && i === habitSettings && (

                  <div className="hidden-settings">

                    <div className="hidden-buttons"><button onClick={() => editHabit(i, edit => habit.streak = 0)}>Reset</button>

                  <button onClick={() => 
                    {setHabits(oldHabits => {let editedHabits = [...oldHabits]; editedHabits.splice(i, 1); 
                      return editedHabits;}); 
                    setEditMode(false);}}>
                    Delete</button></div>

                  <select value={habit.priority} onChange={(e) => editHabit(i, edit => habit.priority = e.target.value)}>
                    <option value="high">High</option>
                    <option value="mid">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  </div>)}

                  </div>

                  <button 
                  className="edit-btn" onClick={(e) => {
                    e.stopPropagation();
                    editMode && i === habitSettings ? setEditMode(false) : toggleEditMode(i);
                  }}>
                    {editMode && i === habitSettings ? "save" : "edit"}</button>
                  </div>
              ))}
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  );
};
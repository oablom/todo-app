// Ni ska visa ut samtliga habits användaren har, samt streak för varje habit.
// Man ska kunna öka, minska och nollställa streak för varje habit.
// Man ska kunna filtrera habits baserat på prioritet.
// Användare ska kunna sortera habits på
// Streak (högst till lägst, och lägst till högst)
// Prioritet (högst till lägst, och lägst till högst)
import { useState, useEffect } from "react";
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


  useEffect(() => {

    let filteredHabits = priorityFilter === "all" ? habits : habits.filter((habit) => habit.priority === priorityFilter);

    let sortingHabits = [...filteredHabits];
    sortingHabits.sort((a,b) => {
      return (
        (filterType === "priority" ? 
        (sortedHabits === "ascending" ? 1 : -1) * a.priority.localeCompare(b.priority)
        : filterType === "streak" ? (sortedHabits === "ascending" ? 1 : -1) * (a.streak - b.streak) : 0)
      )
    });

    setFilteredHabits(sortingHabits)

  
  }, [habits, priorityFilter, sortedHabits, filterType]);  

  let editHabit = (i, edit) => {
    setHabits(oldHabits => {
      let editedHabits = [...oldHabits];
      edit(editedHabits[i]);
      return editedHabits;
    }); 
  };


 console.log(filterType)
  return (
    <div>
      <div className="habits">
        <h1>Habits</h1>
        {/* FILTRERADE HABITS */}

        
        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="all">Filter by priority:</option>
          <option value="all">All</option>
          <option value="high">High</option>
          <option value="mid">Medium</option>
          <option value="low">Low</option>
        </select>

        {/* SORTERINGSTYP */}
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="">Sort by:</option>
          <option value="priority">Priority</option>
          <option value="streak">Streak</option>
        </select>

        {/* SORTERADE HABITS */}
        <label><input type="radio" value="ascending" checked={sortedHabits === "ascending"} onChange={(e) => setSortedHabits(e.target.value)} />Ascending</label>
        <label><input type="radio" value="descending" checked={sortedHabits === "descending"} onChange={(e) => setSortedHabits(e.target.value)} />Descending</label>
        
        {filteredHabits.map((habit, i) => (
          <div  key={i} style={{backgroundColor: habit.priority === "low" ? "green" : habit.priority === "mid" ? "yellow" : "red"}}>
            <p>{habit.title}</p>
            <p><button onClick={() => editHabit(i, edit => habit.streak -= 1)}>sub</button>{habit.streak}<button onClick={() => editHabit(i,edit => habit.streak += 1)}>add</button></p>
            <button onClick={() => editHabit(i, edit => habit.streak = 0)}>Reset</button>
            </div>
        ))};
        
      </div>
      <NewHabit habitList={habits} updateHabitList={setHabits}/>
    </div>
  );
};
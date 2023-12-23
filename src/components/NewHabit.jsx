// Användaren ska kunna skapa en ny habit
// Varje habit ska innehålla följande:
// Titel
// Startvärde för streak
// Prioritet (kan vara låg,mellan,hög)

import React from 'react'
import { useState } from 'react';

function NewHabit({habitList, updateHabitList}) {

    const [habitTitle, setHabitTitle] = useState("");
    const [habitStreak, setHabitStreak] = useState("")
    const [priority, setPriority] = useState("")

    let addHabit = () => {

        let newHabit = {
            title: habitTitle,
            streak: habitStreak,
            priority: priority
        };
        console.log(newHabit)

        let startNewHabit = [...habitList, newHabit];
        updateHabitList(startNewHabit);

        setHabitTitle("")
        setHabitStreak("")
        setPriority("")

        console.log(startNewHabit)
    };

  return (
    <div className="newHabit">
        <fieldset className="new-form">
            <legend>Start a new habit</legend>
            <input type="text" value={habitTitle} placeholder="Habit description" onChange={(e) => setHabitTitle(e.target.value)}/>
            <div className="starting-streak">
                 <button className="streak-counter" onClick={() => setHabitStreak((prev) => Math.max(+prev - 1, 0))}>-</button>
                <input type="number" readOnly value={habitStreak} placeholder="0" onChange={(e) => setHabitStreak(e.target.value)}/>
                <button className="streak-counter" onClick={() => setHabitStreak((prev) => Math.max(+prev + 1, 0))}>+</button>
            </div>
            <div className="radio-priority">
                <label style={{ borderRadius:"15px", border: priority === "low" ? "2px solid green" : "none" }}><input type="radio" name="priority" value="low" checked={priority === "low"} onChange={(e) => setPriority(e.target.value)}/>Low</label>
                <label style={{ borderRadius:"15px", border: priority === "mid" ? "2px solid yellow" : "none" }}><input type="radio" name="priority" value="mid" checked={priority === "mid"} onChange={(e) => setPriority(e.target.value)} />Medium</label>
                <label style={{ borderRadius:"15px", border: priority === "high" ? "2px solid red" : "none" }}><input type="radio" name="priority" value="high" checked={priority === "high"} onChange={(e) => setPriority(e.target.value)}/>High</label>

            </div>
            <button onClick={()=> addHabit()}>Start my new habit</button>
        </fieldset>
    </div>
  )
}

export default NewHabit;
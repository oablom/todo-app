// Användaren ska kunna skapa en ny habit
// Varje habit ska innehålla följande:
// Titel
// Startvärde för streak
// Prioritet (kan vara låg,mellan,hög)

import React from 'react'

function NewHabit({habitList, updateHabitList}) {

    let addHabit = () => {
        let habitTitle = document.querySelector("#habitTitle").value;
        let habitStreak = document.querySelector("#habitStreak").value;
        let prio = document.querySelector("#prioritySelect").value

        let newHabit = {
            title: habitTitle,
            streak: habitStreak,
            priority: prio
        };
        console.log(newHabit)

        let startNewHabit = [...habitList, newHabit];
        updateHabitList(startNewHabit);

        console.log(startNewHabit)
    };

  return (
    <div className="newHabit">
        <h1>New Habit</h1>
        <fieldset>
            <input type="text" id="habitTitle" placeholder="Habit description" />
            <input type="number" id="habitStreak" placeholder="Starting streak"/>
            <select id="prioritySelect">
                <option value="low">Low</option>
                <option value="mid">Medium</option>
                <option value="high">High</option>
            </select>
            <button onClick={()=> addHabit()}>Start my new habit</button>
        </fieldset>
    </div>
  )
}

export default NewHabit;
// Här ska användaren kunna skapa ett nytt ärende.
// Varje ärende ska innehålla följande
// Titel
// Beskrivning
// Tidsestimat (hur lång tid tar det att utföra ärendet)
// Typ av ärende (ha minst tre olika typer av ärenden som man kan välja emellan t.ex hushållssysslor, aktivitet med vänner och jobbrelaterad ärende.
// Användaren ska också kunna få förslag på en aktivitet att göra genom ett knapptryck. Aktiviteten ska hämtas från https://www.boredapi.com/ - När en aktivitet hämtas ska den fylla Titel-inputen med aktivitetens namn.

import { useState, useEffect } from "react";

export default function NewTask() {
  let [task, setTask] = useState();
  let [taskArray, setTaskArray] = useState([]);

  useEffect(() => {
    async function fetchTask() {
      try {
        const response = await fetch("https://www.boredapi.com/api/activity");
        const data = await response.json();
        if (response) {
          setTask(data);
          console.log(data);
        }
      } catch (error) {
        console.log("Error fetching data (message): ", error);
      }
    }
    fetchTask();
  }, []);

  return (
    <div className="new-task">
      <h1>NewTask Component</h1>
    </div>
  );
}

// Ni ska visa ut olika ärenden användaren behöver utföra. Ni ska även visa ut samtliga utförda ärenden i en separat lista.
// Användaren ska kunna göra följande för varje ärende:
// Markera ärendet som slutfört.
// Ta bort ärendet.
// Redigera ärendet.
// Samtliga ärenden ska kunna filtreras efter kategori.
// Samtliga ärenden ska kunna sorteras baserat på titel (bokstavsordning - stigande och fallande) och tidsestimat (stigande och fallande)
import { useState, useEffect } from "react";
import NewTask from "./NewTask";

export default function Tasks() {
  let [showNewTask, setShowNewTask] = useState();
  // function Task()

  return (
    <div>
      <h1>Tasks</h1>
      <button onClick={() => setShowNewTask(!showNewTask)}>NewTask</button>
      {showNewTask && <NewTask />}
    </div>
  );
}

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
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [editTask, setEditTask] = useState(false);
  const [taskArray, setTaskArray] = useState([]);
  // function Task()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeEstimate, setTimeEstimate] = useState("");
  const [type, setType] = useState("");

  function taskArrayFunction(newTask) {
    setTaskArray([...taskArray, newTask]);
  }

  function removeTask(index) {
    const newTaskArray = [...taskArray];
    newTaskArray.splice(index, 1);
    setTaskArray(newTaskArray);
    // if (editTaskIndex === index) {
    //   setEditTaskIndex(null);
    // }
  }

  // function editTask(index) {
  //   const newTaskArray = [...taskArray];
  //   let editObject = newTaskArray.splice(index, 1);
  //   console.log(editObject);
  //   // setTaskArray(newTaskArray);
  // }

  // function editTask(index)
  return (
    <div className="tasks">
      <h1>Tasks</h1>
      <button onClick={() => setShowNewTask(!showNewTask)}>NewTask</button>
      <button onClick={() => setTaskArray([])}>Clear all todos</button>
      {showNewTask && <NewTask taskArrayFunction={taskArrayFunction} />}
      {taskArray.map((task, index) => {
        return (
          <div key={index + 1} className="task-wrapper">
            <h3>Todo: </h3>
            {editTaskIndex !== index ? (
              <h3>{task.title}</h3>
            ) : (
              <input type="text" />
            )}
            <h4>Description: </h4>{" "}
            {editTaskIndex !== index ? (
              <h4>{task.description}</h4>
            ) : (
              <input type="text" />
            )}
            <h4>Estimated time: </h4>
            {editTaskIndex !== index ? (
              <h4>{task.timeEstimate}</h4>
            ) : (
              <input type="text" />
            )}
            <h4>Type of activity: </h4>
            {editTaskIndex !== index ? (
              <h4>{task.type}</h4>
            ) : (
              <input type="text" />
            )}
            <button onClick={() => removeTask(index)}>Remove this task</button>
            <button
              onClick={() => {
                setEditTask(!editTask);
                editTaskIndex !== index
                  ? setEditTaskIndex(index)
                  : setEditTaskIndex(null);
                console.log(editTask);
                console.log(editTaskIndex);
              }}
            >
              Edit task
            </button>
          </div>
        );
      })}
      {console.log(taskArray)}
    </div>
  );
}

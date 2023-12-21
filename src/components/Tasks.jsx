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
  const [showNewTask, setShowNewTask] = useState();
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [editTask, setEditTask] = useState(false);
  const [taskArray, setTaskArray] = useState([]);
  const [filterByTaskType, setFilterByTaskType] = useState("");
  const [filteredTaskArray, setFilteredTaskArray] = useState(taskArray);
  const [saveChanges, setSaveChanges] = useState(false);
  // const [optionValue, setOptionValue] = useState("");
  // const [sortOptionValue, setSortOptionValue] = useState("");
  const [sortBy, setSortBy] = useState("");
  // const [savedChanges, setSavedChanges] = useState(false);
  // function Task()

  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [timeEstimate, setTimeEstimate] = useState("");
  // const [type, setType] = useState("");

  function taskArrayFunction(newTask) {
    console.log("Adding new task:", newTask);
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

  function sort(array, element) {
    const newTaskArray = [...array];
    if (element === "timeEstimate") {
      return newTaskArray.sort((a, b) => a[element] - b[element]);
    } else {
      return newTaskArray.sort((a, b) => a[element].localeCompare(b[element]));
    }
  }

  // function editTask(index) {
  //   const newTaskArray = [...taskArray];
  //   let editObject = newTaskArray.splice(index, 1);
  //   console.log(editObject);
  //   // setTaskArray(newTaskArray);
  // }

  // function editTask(index)

  // useEffect(() => {
  //   titleInput.value
  // }, [titleInput.value]);
  useEffect(() => {
    let newTaskArray = [...taskArray];
    // let sortedTaskArray = newTaskArray;
    if (sortBy) {
      setTaskArray(sort([...newTaskArray], sortBy));
      // setSortedTaskArray(newTaskArray);
    }
  }, [sortBy, saveChanges]);

  useEffect(() => {
    // let newTaskArray = sortedTaskArray ? [...sortedTaskArray] : [...taskArray];
    const newTaskArray = [...taskArray];

    if (filterByTaskType !== "") {
      setFilteredTaskArray(
        newTaskArray.filter((task) => task.type === filterByTaskType)
      );
    } else {
      setFilteredTaskArray(newTaskArray);
    }

    console.log("filteredTaskArray", filteredTaskArray);
    console.log("filterByTaskType", filterByTaskType);
    console.log("taskArray", newTaskArray);
    console.clear();
  }, [filterByTaskType, taskArray, sortBy, saveChanges]);

  // const titleInput = document.getElementById("title");
  // const descriptionInput = document.getElementById("description");
  // const timeEstimateInput = document.getElementById("timeEstimate");
  // const typeInput = document.getElementById("type");

  return (
    <div className="tasks">
      <h1>Tasks</h1>
      <button onClick={() => setShowNewTask(!showNewTask)}>NewTask</button>
      <button
        onClick={() => {
          setTaskArray([]);
          setFilteredTaskArray([]);
          // setOptionValue("");
        }}
      >
        Clear all todos
      </button>
      {showNewTask && <NewTask taskArrayFunction={taskArrayFunction} />}
      <br />

      <label for="filter">Filter by type:</label>
      <select
        value={filterByTaskType}
        onChange={(e) => {
          setFilterByTaskType(e.target.value);
          // setOptionValue(e.target.value);
        }}
      >
        <option value="">Choose task type</option>
        <option>Work related</option>
        <option>Hobby</option>
        <option>Sports</option>
      </select>

      <label for="sort">Sort by:</label>
      <select
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value);
          // setSortOptionValue(e.target.value);
        }}
      >
        <option value="">Choose an element</option>
        <option value="title">Title (A-Z)</option>
        <option value="timeEstimate">Time estimation (longest-shortest)</option>
        <option value="type">Type (A-Z)</option>
      </select>

      {(filterByTaskType === "" ? taskArray : filteredTaskArray).map(
        (task, index) => {
          const updatedTask = { ...task };
          const newTaskArray = [...taskArray];

          return (
            <div key={(task, index + 1)} className="task-wrapper">
              <h3>Todo: </h3>
              {editTaskIndex !== index ? (
                <h3>{updatedTask.title}</h3>
              ) : (
                <input
                  id={"title" + index}
                  type="text"
                  defaultValue={updatedTask.title}
                  onChange={(e) => {
                    updatedTask.title = e.target.value;
                  }}
                />
              )}
              <h4>Description: </h4>{" "}
              {editTaskIndex !== index ? (
                <h4>{updatedTask.description}</h4>
              ) : (
                <input
                  id={"description" + index}
                  type="text"
                  defaultValue={updatedTask.description}
                  onChange={(e) => {
                    updatedTask.description = e.target.value;
                  }}
                />
              )}
              <h4>Estimated time: </h4>
              {editTaskIndex !== index ? (
                <h4>{updatedTask.timeEstimate}</h4>
              ) : (
                <input
                  id={"timeEstimate" + index}
                  type="text"
                  defaultValue={updatedTask.timeEstimate}
                  onChange={(e) => {
                    updatedTask.timeEstimate = e.target.value;
                  }}
                />
              )}
              <h4>Type of activity: </h4>
              {editTaskIndex !== index ? (
                <h4>{updatedTask.type}</h4>
              ) : (
                <select
                  required
                  name="type"
                  id={"type" + index}
                  defaultValue={updatedTask.type}
                  onChange={(e) => (updatedTask.type = e.target.value)}
                >
                  <option value="">Choose task type</option>
                  <option>Work related</option>
                  <option>Hobby</option>
                  <option>Sports</option>
                </select>
              )}
              <button onClick={() => removeTask(index)}>
                Remove this task
              </button>
              <button
                onClick={() => {
                  setEditTask(!editTask);
                  editTaskIndex !== index
                    ? setEditTaskIndex(index)
                    : setEditTaskIndex(null);
                }}
              >
                Edit task
              </button>
              {editTask && editTaskIndex === index && (
                <button
                  onClick={() => {
                    newTaskArray[index] = updatedTask;
                    setTaskArray(newTaskArray);
                    setSaveChanges(!saveChanges);

                    console.log(taskArray);
                  }}
                >
                  Save changes
                </button>
              )}
            </div>
          );
        }
      )}
    </div>
  );
}

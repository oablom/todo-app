// Ni ska visa ut olika ärenden användaren behöver utföra. Ni ska även visa ut samtliga utförda ärenden i en separat lista.
// Användaren ska kunna göra följande för varje ärende:
// Markera ärendet som slutfört.
// Ta bort ärendet.
// Redigera ärendet.
// Samtliga ärenden ska kunna filtreras efter kategori.
// Samtliga ärenden ska kunna sorteras baserat på titel (bokstavsordning - stigande och fallande) och tidsestimat (stigande och fallande)
import { useState, useEffect, useRef } from "react";
import NewTask from "./NewTask";
import TrashCan from "../icons/recycle-bin.png";
import Checked from "../icons/icons8-check.svg";

export default function Tasks() {
  const [showNewTask, setShowNewTask] = useState();
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [editTask, setEditTask] = useState(false);
  const [taskArray, setTaskArray] = useState([]);
  const [filterByTaskType, setFilterByTaskType] = useState("");
  const [filteredTaskArray, setFilteredTaskArray] = useState(taskArray);
  const [saveChanges, setSaveChanges] = useState(false);
  const [taskWrapperClassName, setTaskWrapperClassName] =
    useState("task-wrapper");

  const [showMoreIndex, setShowMoreIndex] = useState(null);
  const taskWrapperRef = useRef(null);

  const [sortBy, setSortBy] = useState("");

  // const [savedChanges, setSavedChanges] = useState(false);
  // function Task()

  useEffect(() => {
    setTaskArray(() => {
      const storedTaskArray = JSON.parse(localStorage.getItem("taskArray"));
      console.log("storedTaskArray", storedTaskArray);
      return storedTaskArray || [];
    });
  }, []);

  function taskArrayFunction(newTask) {
    console.log("Adding new task:", newTask);
    setTaskArray([...taskArray, newTask]);
    setEditTask(false);
    setEditTaskIndex(null);
    setShowMoreIndex(null);
  }

  function removeTask(index) {
    const newTaskArray = [...taskArray];
    newTaskArray.splice(index, 1);
    setTaskArray(newTaskArray);
  }

  function sort(array, element) {
    const newTaskArray = [...array];
    if (element === "timeEstimate") {
      return newTaskArray.sort((a, b) => a[element] - b[element]);
    } else if (element === "completed") {
      return newTaskArray.sort((b, a) => a[element] - b[element]);
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
    const handleClickOutside = (event) => {
      if (taskWrapperRef.current) {
        if (
          !taskWrapperRef.current.contains(event.target) &&
          editTaskIndex !== null
        ) {
          // taskWrapperRef.current.className = "task-wrapper cursor";
          setTaskWrapperClassName("task-wrapper wrong-click");

          setTimeout(() => {
            setTaskWrapperClassName("task-wrapper");
          }, 500);
        } else {
          setTaskWrapperClassName("task-wrapper");

          // taskWrapperRef.current.className = "task-wrapper";
        }
      }
    };
    // taskWrapperRef.current.className = "task-wrapper";
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [editTaskIndex]);

  useEffect(() => {
    // setTaskArrayToSend([...taskArray]);
    if (taskArray.length > 0) {
      localStorage.setItem("taskArray", JSON.stringify(taskArray));
    }
  }, [taskArray, removeTask, saveChanges]);

  useEffect(() => {
    let newTaskArray = [...taskArray];
    if (sortBy) {
      setTaskArray(sort([...newTaskArray], sortBy));
    }
  }, [sortBy, saveChanges, toggleCompletedStatus]);

  useEffect(() => {
    const newTaskArray = [...taskArray];

    if (filterByTaskType !== "") {
      setFilteredTaskArray(
        newTaskArray.filter((task) => task.type === filterByTaskType)
      );
    } else {
      setFilteredTaskArray(newTaskArray);
    }

    // console.clear();
  }, [filterByTaskType, taskArray, sortBy, saveChanges]);

  function toggleCompletedStatus(index) {
    const newTaskArray = [...taskArray];

    // Toggla slutför-statusen för den specifika uppgiften i newTaskArray
    newTaskArray[index].completed = !newTaskArray[index].completed;

    // Uppdatera state med den uppdaterade arrayen
    setTaskArray(newTaskArray);
  }

  return (
    <div className="tasks">
      <div className="button-wrapper">
        <button onClick={() => setShowNewTask(!showNewTask)}>NewTask</button>
        <button
          onClick={() => {
            setTaskArray([]);
            setFilteredTaskArray([]);

            localStorage.removeItem("taskArray");
            console.log("taskArray", taskArray);
            console.log("filteredTaskArray", filteredTaskArray);
            console.log("localstorage", localStorage.getItem("taskArray"));
          }}
        >
          Clear all todos
        </button>
      </div>
      {showNewTask && <NewTask taskArrayFunction={taskArrayFunction} />}
      <br />

      <div className="filter-sort-wrapper" id="filter-sort-wrapper">
        <div>
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
        </div>
        <div>
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
            <option value="timeEstimate">
              Time estimation (shortest-longest)
            </option>
            <option value="type">Type (A-Z)</option>
            <option value="completed">Completed-Not completed</option>
          </select>
        </div>
      </div>
      <h1 className="todos-title">Todos:</h1>
      <div className="todos-wrapper">
        {(filterByTaskType === "" ? taskArray : filteredTaskArray).map(
          (task, index) => {
            const updatedTask = { ...task };
            const newTaskArray = [...taskArray];

            return (
              <div
                key={(task, index + 1)}
                className={
                  editTaskIndex === index
                    ? taskWrapperClassName
                    : "task-wrapper"
                }
                // id={
                //   showMoreIndex === index
                //     ? "show-more-animation"
                //     : "show-less-animation" &&
                //       setTimeout(() => {
                //         taskWrapperRef.current.id = "none";
                //       }, 1000)
                // }
                ref={taskWrapperRef}
                onClick={(e) => {
                  editTaskIndex === index && e.stopPropagation();
                  !editTask &&
                    setShowMoreIndex((prev) => (prev === index ? null : index));
                  console.log("completed:", taskArray[index].completed);
                  console.log("shoewmoreINDEX", showMoreIndex);
                }}
                style={{
                  flexDirection: showMoreIndex === index ? "column" : "row",
                  height: showMoreIndex === index ? "auto" : "50px",
                  boxShadow:
                    showMoreIndex === index && "0px 10px 20px -6px #d1432b",
                  border: taskArray[index].completed && "2px solid green",
                  // display: taskArray[index].completed && "none",
                }}
              >
                <div
                  style={{
                    marginTop: showMoreIndex !== index ? "20px" : "40px",
                  }}
                  className="title"
                >
                  <h3>{showMoreIndex === index && "Title:"} </h3>
                  {editTaskIndex !== index ? (
                    <div
                      className={showMoreIndex === index && "task-text-border"}
                    >
                      <h3>{updatedTask.title}</h3>
                    </div>
                  ) : (
                    <input
                      maxLength={60}
                      id={"title" + index}
                      type="text"
                      defaultValue={updatedTask.title}
                      onChange={(e) => {
                        updatedTask.title = e.target.value;
                      }}
                    />
                  )}
                </div>
                <div
                  style={{
                    display: showMoreIndex === index ? "flex" : "none",
                    flexDirection: "column",
                  }}
                >
                  <div>
                    <h4>Description: </h4>{" "}
                    {editTaskIndex !== index ? (
                      <div className="task-text-border">
                        <h4>{updatedTask.description}</h4>
                      </div>
                    ) : (
                      <textarea
                        maxLength={200}
                        id={"description" + index}
                        type="text"
                        defaultValue={updatedTask.description}
                        onChange={(e) => {
                          updatedTask.description = e.target.value;
                        }}
                      />
                    )}
                  </div>
                  <div>
                    {" "}
                    <h4>Estimated time: </h4>
                    {editTaskIndex !== index ? (
                      <div className="task-text-border">
                        <h4>{updatedTask.timeEstimate} minutes</h4>
                      </div>
                    ) : (
                      <input
                        maxLength={10}
                        id={"timeEstimate" + index}
                        type="text"
                        defaultValue={updatedTask.timeEstimate}
                        onChange={(e) => {
                          updatedTask.timeEstimate = e.target.value;
                        }}
                      />
                    )}
                  </div>
                  <div>
                    {" "}
                    <h4>Type of activity: </h4>
                    {editTaskIndex !== index ? (
                      <div className="task-text-border">
                        {" "}
                        <h4>{updatedTask.type}</h4>
                      </div>
                    ) : (
                      <select
                        required
                        name="type"
                        className="type"
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
                  </div>

                  <div className="edit-save-wrapper">
                    {" "}
                    <button
                      onClick={(e) => {
                        setEditTask(!editTask);

                        e.stopPropagation();

                        showMoreIndex === index && editTaskIndex !== index
                          ? setEditTaskIndex(index)
                          : setEditTaskIndex(null);
                      }}
                    >
                      {editTaskIndex !== index ? "Edit this task" : "Cancel"}
                    </button>{" "}
                    {editTaskIndex === index && (
                      <button
                        onClick={() => {
                          newTaskArray[index] = updatedTask;
                          setTaskArray(newTaskArray);
                          setSaveChanges(!saveChanges);
                          setEditTask(!editTask);
                          showMoreIndex === index && editTaskIndex !== index
                            ? setEditTaskIndex(index)
                            : setEditTaskIndex(null);
                          console.log(taskArray);
                        }}
                      >
                        Save changes
                      </button>
                    )}
                  </div>
                  <div className="remove-icon">
                    <div>
                      <img
                        src={TrashCan}
                        id="trash-can-icon"
                        alt="Trash can"
                        onClick={(e) => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete " +
                                updatedTask.title
                            )
                          ) {
                            removeTask(index);
                            setEditTask(false);
                            setEditTaskIndex(null);
                            setShowMoreIndex(null);
                          }

                          e.stopPropagation();
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* <input type="checkbox" /> */}
                <div
                  className="completed"
                  onClick={(e) => {
                    toggleCompletedStatus(index);

                    e.stopPropagation();
                  }}
                >
                  <img
                    style={{
                      display: taskArray[index].completed ? "block" : "none",
                    }}
                    src={Checked}
                    alt="Checkbox"
                    onClick={(e) => {
                      // e.stopPropagation();
                    }}
                  />
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

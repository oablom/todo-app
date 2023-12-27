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

export default function Tasks() {
  const [showNewTask, setShowNewTask] = useState();
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [editTask, setEditTask] = useState(false);
  const [taskArray, setTaskArray] = useState([]);
  const [filterByTaskType, setFilterByTaskType] = useState("");
  const [filteredTaskArray, setFilteredTaskArray] = useState(taskArray);
  const [saveChanges, setSaveChanges] = useState(false);
  const [clickedOutside, setClickedOutside] = useState(true);
  const [taskWrapperClassName, setTaskWrapperClassName] =
    useState("task-wrapper");
  const [taskArrayToSend, setTaskArrayToSend] = useState(taskArray);
  // const [showMore, setShowMore] = useState(null);
  const [showMoreIndex, setShowMoreIndex] = useState(null);
  const taskWrapperRef = useRef(null);
  // const [insideTaskWrapper, setInsideTaskWrapper] = useState(true);

  // const [optionValue, setOptionValue] = useState("");
  // const [sortOptionValue, setSortOptionValue] = useState("");
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
  }

  function removeTask(index) {
    const newTaskArray = [...taskArray];
    newTaskArray.splice(index, 1);
    setTaskArray(newTaskArray);
    // localStorage.setItem("taskArray", JSON.stringify(newTaskArray));
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

    // console.clear();
  }, [filterByTaskType, taskArray, sortBy, saveChanges]);

  // const trashCanText = document.getElementById("trash-can-text");
  // const trashCanIcon = document.getElementById("trash-can-icon");

  // const titleInput = document.getElementById("title");
  // const descriptionInput = document.getElementById("description");
  // const timeEstimateInput = document.getElementById("timeEstimate");
  // const typeInput = document.getElementById("type");

  return (
    <div className="tasks">
      <h1>Tasks</h1>
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

            // setOptionValue("");
          }}
        >
          Clear all todos
        </button>
      </div>
      {showNewTask && <NewTask taskArrayFunction={taskArrayFunction} />}
      <br />

      <div className="filter-sort-wrapper">
        {" "}
        <div>
          {" "}
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
          {" "}
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
                ref={taskWrapperRef}
                onClick={(e) => {
                  // console.log("showMoreIndex", showMoreIndex);
                  // console.log("editTask", editTask);
                  //  &&
                  editTaskIndex === index && e.stopPropagation();
                  !editTask &&
                    setShowMoreIndex((prev) => (prev === index ? null : index));
                  // setEditTask(false);

                  console.log("Task-wrapper edittask index:", editTaskIndex);
                  console.log("Task-wrapper  showMoreIndex:", showMoreIndex);

                  // console.log(showMore);
                }}
                style={{
                  flexDirection: showMoreIndex === index ? "column" : "row",
                  boxShadow:
                    showMoreIndex === index && "0px 10px 20px -6px #d1432b",
                  // border: showMoreIndex === index && "2px solid  #d1432b",
                }}
              >
                <div>
                  {" "}
                  {/* <h3>Todo: </h3> */}
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
                </div>
                <div
                  // className={showMore ? "show-more" : "hide"}
                  style={{
                    display: showMoreIndex === index ? "flex" : "none",
                    flexDirection: "column",
                  }}
                >
                  <div>
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
                  </div>
                  <div>
                    {" "}
                    <h4>Estimated time: </h4>
                    {editTaskIndex !== index ? (
                      <h4>{updatedTask.timeEstimate} minutes</h4>
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
                  </div>
                  <div>
                    {" "}
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
                  </div>

                  <div className="edit-save-wrapper">
                    {" "}
                    <button
                      onClick={(e) => {
                        setEditTask(!editTask);
                        // showMore !== index && setEditTask(!editTask);
                        // setShowMoreIndex(index);
                        // showMoreIndex !== index && setEditTaskIndex(null);
                        e.stopPropagation();
                        showMoreIndex === index && editTaskIndex !== index
                          ? setEditTaskIndex(index)
                          : setEditTaskIndex(null);
                        console.log("edittask index:", editTaskIndex);
                        console.log("showMoreIndex:", showMoreIndex);
                        // console.log(showMore);
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

                          console.log(taskArray);
                        }}
                      >
                        Save changes
                      </button>
                    )}
                  </div>
                  <div className="remove-icon">
                    {/* <p id="trash-can-text"> </p>{" "} */}
                    <div>
                      <img
                        src={TrashCan}
                        id="trash-can-icon"
                        alt="Trash can"
                        // onMouseOver={(e) => {
                        //   trashCanText.innerText = "Remove task";
                        //   e.currentTarget.style.cursor = "pointer";
                        // }}
                        // onMouseOut={(e) => {
                        //   trashCanText.innerText = "";
                        // }}
                        onClick={(e) => {
                          window.confirm(
                            "Are you sure you want to delete " +
                              updatedTask.title
                          ) && removeTask(index);

                          e.stopPropagation();
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

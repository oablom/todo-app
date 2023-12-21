import { useState, useEffect } from "react";

export default function NewTask(props) {
  const [fetchedData, setFetchedData] = useState({});
  const [randomise, setRandomise] = useState(false);
  // const [taskArray, setTaskArray] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeEstimate, setTimeEstimate] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    async function fetchTask() {
      try {
        const response = await fetch("https://www.boredapi.com/api/activity");

        if (response.ok) {
          const data = await response.json();
          setFetchedData(data);
          setTitle(fetchedData.activity);
        } else {
          setFetchedData("Error fetching data: ", response.status);
        }
      } catch (error) {
        console.log("Error fetching data (message): ", error);
      }
    }
    fetchTask();
  }, [randomise]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTask = {
      title,
      description,
      timeEstimate,
      type,
    };

    props.taskArrayFunction(newTask);
    setTitle("");
    setDescription("");
    setTimeEstimate("");
    setType("");
    taskForm.reset();
  }
  const taskForm = document.getElementById("task-form");
  const inputTitle = document.getElementById("newtask-title");

  return (
    <div className="new-task">
      <h1>NewTask Component</h1>
      <form className="task-form" id="task-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          required
          type="text"
          id="newtask-title"
          name="title"
          // value={randomise ? fetchedData.activity : ""}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />
        <label htmlFor="description">Description:</label>
        <input
          required
          type="text"
          id="newtask-description"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <label htmlFor="timeEstimate">Time Estimate:</label>
        <input
          required
          type="number"
          id="newtask-timeEstimate"
          name="timeEstimate"
          onChange={(e) => setTimeEstimate(e.target.value)}
        />
        <br />
        <label htmlFor="type">Type:</label>
        <select
          required
          name="newtask-type"
          id="type"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Choose task type</option>
          <option>Work related</option>
          <option>Hobby</option>
          <option>Sports</option>
        </select>
        <br />
        <div className="form-buttons">
          <button type="submit">Add Task</button>
          <button
            type="button"
            onClick={() => {
              setRandomise(!randomise);
              inputTitle.value = fetchedData.activity;
            }}
          >
            Randomize Activity
          </button>
          <button
            onClick={() => {
              taskForm.reset();
            }}
          >
            Clear form
          </button>
        </div>
      </form>
    </div>
  );
}

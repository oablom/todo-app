import React, { useState } from "react";

export default function FilterFriends({ myFriends, setFilteredFriends }) {
  const [genderFilter, setGenderFilter] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");

  //Function to filter the friends based on selected criteria
  const filterFriends = () => {
    let filteredList = [...myFriends]; //create a copy of the friends list

    //Filter by gender when selected
    if (genderFilter) {
      // Check if a gender filter is selected
      filteredList = filteredList.filter(
        // Use filter method to match friend's gender with selected filter
        (friend) => friend.gender.toLowerCase() === genderFilter.toLowerCase() // Compare friend's gender with selected filter
      );
    }
    //Filter by minimum age
    if (minAge) {
      const currentDate = new Date(); //creating an instance of the current date and time.
      const minAgeDate = currentDate.getFullYear() - parseInt(minAge, 10); //Calculates the year when a person would reach the minimum age by subtracting the specified value from the current year.
      filteredList = filteredList.filter(
        //the function goes through the friends' list and checks if each friend's birth year is equal to or earlier than the calculated minimum age year. If so, the person stays in the filteredList.
        (friend) => new Date(friend.dob).getFullYear() <= minAgeDate
      );
    }
    //Filter by maximum age
    if (maxAge) {
      const currentDate = new Date();
      const maxAgeDate = currentDate.getFullYear() - parseInt(maxAge, 10);
      //Filter friends based on maximum age
      filteredList = filteredList.filter(
        // Include friends whose birth year is equal to or earlier than the calculated maximum age year
        (friend) => new Date(friend.dob).getFullYear() >= maxAgeDate
      );
    }
    // Update the filtered friends list
    setFilteredFriends(filteredList);
  };

  return (
    <div className="filterFriends">
      <h2>Filter Friends</h2>
      <div>
        <label>Gender:</label>
        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div>
        <label>Minimum Age:</label>
        <input
          type="number"
          value={minAge}
          onChange={(e) => setMinAge(e.target.value)}
        />
      </div>
      <div>
        <label>Maximum Age:</label>
        <input
          type="number"
          value={maxAge}
          onChange={(e) => setMaxAge(e.target.value)}
        />
      </div>
      <button onClick={filterFriends}>Apply Filters</button>
    </div>
  );
}

import React, { useState } from "react";

export default function FilterFriends({ myFriends, setFilteredFriends }) {
  const [genderFilter, setGenderFilter] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");

  //Function to filter the friends based on selected criteria
  const filterFriends = () => {
    let filteredList = [...myFriends]; //create a copy of the friedns list

    //Filter by gender when selected
    if (genderFilter) {
      filteredList = filteredList.filter(
        (friend) => friend.gender.toLowerCase() === genderFilter.toLowerCase()
      );
    }
    //Filter by minimum age
    if (minAge) {
      const currentDate = new Date();
      const minAgeDate = currentDate.getFullYear() - parseInt(minAge, 10);
      filteredList = filteredList.filter(
        (friend) => new Date(friend.dob).getFullYear() <= minAgeDate
      );
    }
    //Filter by maximum age
    if (maxAge) {
      const currentDate = new Date();
      const maxAgeDate = currentDate.getFullYear() - parseInt(maxAge, 10);
      filteredList = filteredList.filter(
        (friend) => new Date(friend.dob).getFullYear() >= maxAgeDate
      );
    }
    // Update the filtered friends list
    setFilteredFriends(filteredList);
  };

  return (
    <div>
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

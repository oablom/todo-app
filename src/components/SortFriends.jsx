import React from "react";

//Define the SortFriends component for sorting functionality
const SortFriends = ({ setFilteredFriends, filteredFriends }) => {
  //function to sort friends by first name.
  const sortByFirstName = () => {
    // Create a sorted copy of filteredFriends array by comparing first names
    const sortedFriends = [...filteredFriends].sort((a, b) =>
      a.firstName.localeCompare(b.firstName)
    );
    // Update the state with the sorted list of friends
    setFilteredFriends(sortedFriends);
  };

  //Function to sort friends by last name
  const sortByLastName = () => {
    // Create a sorted copy of filteredFriends array by comparing last names
    const sortedFriends = [...filteredFriends].sort((a, b) =>
      a.lastName.localeCompare(b.lastName)
    );
    // Update the state with the sorted list of friends
    setFilteredFriends(sortedFriends);
  };

  //Function to calculate age based on date of birth
  const calculateAge = (dob) => {
    // Calculate age based on the provided date of birth
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Function to sort friends by age
  const sortByAge = () => {
    // Create a sorted copy of filteredFriends array by comparing ages
    const sortedFriends = [...filteredFriends].sort((a, b) => {
      const ageA = calculateAge(a.dob);
      const ageB = calculateAge(b.dob);
      return ageA - ageB;
    });
    // Update the state with the sorted list of friends
    setFilteredFriends(sortedFriends);
  };
  //Returns buttons for sorting
  return (
    <div className="sortFriends">
      <button onClick={sortByFirstName}>Sort by First Name</button>
      <button onClick={sortByLastName}>Sort by Last Name</button>
      <button onClick={sortByAge}>Sort by Age</button>
    </div>
  );
};

export default SortFriends;

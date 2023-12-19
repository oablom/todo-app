import React from "react"

//Define the SortFriends component for sorting functionality
const SortFriends = ({ setFilteredFriends, filteredFriends }) => {
  //function to sort friends by first name
  const sortByFirstName = () => {
    const sortedFriends = [...filteredFriends].sort((a, b) =>
      a.firstName.localeCompare(b.firstName)
    )
    setFilteredFriends(sortedFriends)
  }
  //Function to sort friends by last name
  const sortByLastName = () => {
    const sortedFriends = [...filteredFriends].sort((a, b) =>
      a.lastName.localeCompare(b.lastName)
    )
    setFilteredFriends(sortedFriends)
  }

  //Function to calculate age based on date of birth
  const calculateAge = (dob) => {
    const today = new Date()
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--
    }
    return age
  }

  // Function to sort friends by age
  const sortByAge = () => {
    const sortedFriends = [...filteredFriends].sort((a, b) => {
      const ageA = calculateAge(a.dob)
      const ageB = calculateAge(b.dob)
      return ageA - ageB
    })
    setFilteredFriends(sortedFriends)
  }
  //Returns buttons for sorting
  return (
    <div>
      <button onClick={sortByFirstName}>Sort by First Name</button>
      <button onClick={sortByLastName}>Sort by Last Name</button>
      <button onClick={sortByAge}>Sort by Age</button>
    </div>
  )
}

export default SortFriends

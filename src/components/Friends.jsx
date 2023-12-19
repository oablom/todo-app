// En lista över namn samt bild på samtliga vänner användaren har i applikationen.
// “Lägg till ny vän”-knapp som lägger till en vän. När den klickas på ska det göras ett anrop till https://randomuser.me/api som lägger till en slumpvald person från API:et.
// Varje vän ska kunna klickas på för att visa/dölja följande information.
// Email
// Födelsedatum (date of birth)
// Kön (gender)
// Listan ska kunna filtreras baserat på kön, samt maxålder och mininumålder.
// Listan ska kunna sorteras på förnamn, efternamn, samt ålder.
import { useState, useEffect } from "react";
import InfoFriend from "./InfoFriend";
import FilterFriends from "./FilterFriends";
import SortFriends from "./SortFriends";

export default function Friends() {
  //Initialize state for friends and filtered friends
  const [myFriends, setMyFriends] = useState([
    {
      firstName: "Peter",
      lastName: "Parker",
      picture: "https://randomuser.me/api/portraits/med/men/71.jpg",
      email: "peter.parker@example.com",
      dob: "1976-08-25T15:03:43.827Z",
      gender: "Male",
    },
    {
      firstName: "Mary",
      lastName: "Jane",
      picture: "https://randomuser.me/api/portraits/med/women/95.jpg",
      email: "mary.jane@example.com",
      dob: "1977-09-08T05:42:54.988Z",
      gender: "Female",
    },
    {
      firstName: "Mario",
      lastName: "Mario",
      picture: "https://randomuser.me/api/portraits/med/men/41.jpg",
      email: "mario.mario@example.com",
      dob: "1999-12-01T14:47:33.936Z",
      gender: "Male",
    },
    {
      firstName: "Luigi",
      lastName: "Mario",
      picture: "https://randomuser.me/api/portraits/med/men/92.jpg",
      email: "luigi.mario@example.com",
      dob: "1998-12-14T02:07:31.630Z",
      gender: "Male",
    },
  ]);
  const [filteredFriends, setFilteredFriends] = useState([]);

  // Function to update filteredFriends based on filters
  const updateFilteredFriends = (filteredList) => {
    setFilteredFriends(filteredList);
  };
  //Function to fetch new friend data
  const getData = async () => {
    try {
      const response = await fetch("https://randomuser.me/api");
      const json = await response.json();
      // Add a new friend based on fetched data
      let updatedFriends = [
        ...myFriends,
        {
          firstName: `${json.results[0].name.first}`,
          lastName: `${json.results[0].name.last}`,
          picture: `${json.results[0].picture.medium}`,
          email: `${json.results[0].email}`,
          dob: `${json.results[0].dob.date}`,
          gender: `${json.results[0].gender}`,
        },
        //construct a new friend object from fetched data
      ];
      //update both friends and filtered friends
      setMyFriends(updatedFriends);
      setFilteredFriends(updatedFriends);
      console.log(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //useEffect to set filteredFriends when myFriends changes
  useEffect(() => {
    setFilteredFriends(myFriends);
  }, [myFriends]);

  // Return the JSX for rendering the Friends component
  return (
    <div>
      <h1>Friends</h1>
      <FilterFriends
        myFriends={myFriends}
        setFilteredFriends={setFilteredFriends}
      />
      <SortFriends
        setFilteredFriends={setFilteredFriends}
        filteredFriends={filteredFriends}
      />
      {filteredFriends.length > 0 ? (
        filteredFriends.map((friend, index) => {
          return <InfoFriend key={index} data={friend} />;
        })
      ) : (
        <p>No matching friends found.</p>
      )}

      <button onClick={() => getData()}>Add New Friend</button>
    </div>
  );
}

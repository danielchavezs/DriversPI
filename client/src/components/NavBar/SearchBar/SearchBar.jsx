import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { getByName } from "../../../redux/actions/actions";


export default function SearchBar() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    dispatch(getByName(searchTerm));
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search driver..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className={styles.button}
       onClick={handleSearch}>
        <strong>Search Pilot</strong>
      </button>
    </div>
  );
}

// --------------------------------------------------------------------------------


// export default function SearchBar(props) {
  
//   const [gameName, setGameName] = useState("");

//   const handleChange = (event) => {
//     // console.log("handle is working", event.target.value);
//     setGameName(event.target.value);
//   };

//   return (
//     <div className={styles.container}>
//       <input
//         className={styles.input}
//         type="text"
//         placeholder="Search a videogame..."
//         onChange={handleChange}
//         value={gameName}
//       />
//      <button
//         className={styles.button}
//         onClick={() => {
//           props.onSearch(gameName);
//         }}
//      >
//         <strong>Search Game</strong>
//      </button>
//     </div>
//   );
// };
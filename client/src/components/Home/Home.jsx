import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import Cards from '../Cards/Cards.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getDrivers } from '../../redux/actions/actions';
import { ASC, DESC, getTeamsList } from '../../utils';
import SearchBar from '../NavBar/SearchBar/SearchBar';

export default function Home() {
  const [sort, setSort] = useState();
  const [page, setPage] = useState(0);
  const [name, setName] = useState('');
  const [teamList, setTeamList] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('');

  const dispatch = useDispatch();
  const { totalPages, allDrivers } = useSelector((state) => state); // BORRÉ EL GetByName

  useEffect(() => {
    dispatch(
      getDrivers({
        sort,
        page,
        team: selectedTeam,
        origin: selectedOrigin,
        name,
      })
    );
  }, [sort, page, selectedTeam, selectedOrigin, name]);

  useEffect(() => {
    getTeamsList(setTeamList);
  }, []);

  // console.log(name);
  
  return (
    <div className={styles.container}>
      <SearchBar handleSearch={(name) => setName(name)} />
      <div className={styles.sortContainer}>
        <button
          className={styles.sortButton}
          onClick={() => {
            setSort({
              field: "forename",
              direction: ASC,
            });
          }}
        >
          <strong>Name Asc</strong>
        </button>

        <button
          className={styles.sortButton}
          onClick={() => {
            setSort({
              field: "forename",
              direction: DESC,
            });
          }}
        >
          <strong>Name Desc</strong>
        </button>

        <button
          className={styles.sortButton}
          onClick={() => {
            setSort();
          }}
        >
          <strong>Clear</strong>
        </button>

        <div className={styles.select}>
          <select
            name="select"
            className={styles.teamInput}
            onChange={(e) => setSelectedTeam(e.target.value)}
          >
            {teamList.map((team) => (
              <option value={team === "Select team" ? "" : team}>{team}</option>
            ))}
          </select>
          <select
            name="select"
            className={styles.teamInput}
            onChange={(e) => setSelectedOrigin(e.target.value)}
          >
            <option value={""}>Select origin</option>
            <option value={"api"}>API</option>
            <option value={"db"}>Database</option>
          </select>
        </div>
      </div>

      <Cards drivers={allDrivers} />
      <div className={styles.pagesContainer}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (buttonPage) => (
            <button
              onClick={() => {
                setPage(buttonPage - 1);
              }}
              className={`${styles.pageButton} ${
                buttonPage - 1 === page ? styles.pageButtonSelected : ""
              }`}
            >
              {buttonPage}
            </button>
          )
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------------------------------

// const { allDrivers, getByName, totalPages } = useSelector((state) => state); // He eliminado
// let driversToShow = [];

// if (getByName.length) {
//   driversToShow = [...getByName];
// } else {
//   driversToShow = [...allDrivers];
// }

// useEffect(() => {
//   if (!getByName.length) {
//     dispatch(getDrivers({ sort, page }));
//   }
// }, [sort, page, getByName]);

// console.log(driversToShow);

// -------------------------------------------------------------------------------------------------
// WORKING V0 HOME:

// import React from "react";
// import Cards from "../Cards/Cards";
// import style from "./Home.module.css";

// export default function Home(props) {
//   return (
//     <div className={style.container}>
//       <Cards drivers= {props.drivers}/>
//     </div>
//   );
// }

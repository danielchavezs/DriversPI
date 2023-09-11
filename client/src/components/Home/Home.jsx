import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import Cards from '../Cards/Cards.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getDrivers, getAPIdrivers, getDBdrivers, getByID, getByName, getTeams, createDriver } from '../../redux/actions/actions';
import { ASC, DESC } from '../../utils';

export default function Home() {
  const [sort, setSort] = useState();
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const { getByName, allDrivers, totalPages } = useSelector((state) => state); // BORRÉ EL GetByName
  let driversToShow = [];

  if (getByName.length) {
    driversToShow = [...getByName]
  } else {
    driversToShow = [...allDrivers];
  }

  useEffect(() => {
    if (!getByName.length) {
      dispatch(getDrivers({ sort, page })); // dentro del getDrivers: { sort, page }
    }
  }, [sort, page, getByName]); //  sort, page, getByName   --> detrás del getByName en el array

  // console.log(driversToShow);


  return (
    <div className={styles.container}>
      <div className={styles.sortContainer}>
        
      <button className={styles.sortButton}
        onClick={() => {
          setSort({
            field: 'name',
            direction: ASC,
          });
        }}
      >
        <strong>Name Asc</strong>
      </button>

      <button className={styles.sortButton}
        onClick={() => {
          setSort({
            field: 'name',
            direction: DESC,
          });
        }}
      >
        <strong>Name Desc</strong>
      </button>

      <button className={styles.sortButton}
        onClick={() => {
          setSort();
        }}
      >
        <strong>Clear</strong>
      </button>

      </div>
      <Cards drivers={driversToShow} />
      <div className={styles.pagesContainer}>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          onClick={() => {
            setPage(page - 1);
          }}
        >
          {page}
        </button>
      ))}
      </div>

    </div>
  );
};


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

// import React, { useState, useEffect } from "react";
import React from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";


export default function Card({ id, forename, surname, image, teams }) {

  const createName =  (forename, surname) => { 
    if (forename && surname){ return forename + " " + surname };
    if (forename && !surname){ return forename };
    if (!forename && surname){ return surname };
    if (!forename && !surname){ throw new Error ("There is no name provided") }
  }; 
  const name = createName(forename, surname);

  return (
    <div className={style.cardContainer}>
      <h2 className={style.cardInfo}>{name}</h2>
      <Link to={`/detail/${id}`}>
        <img className={style.cardImage} src={image} alt={name} />
      </Link>
      <h4 className={style.cardInfo}>{teams.map((team) => team).join(' - ')}</h4>
    </div>
  );
};
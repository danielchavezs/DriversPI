import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDriver } from "../../redux/actions/actions";
import styles from "./AddDriver.module.css";

export default function AddDriver() {
  const dispatch = useDispatch();
  const { teams } = useSelector((state) => state);

  const [forename, setForename] = useState("");
  const [surname, setSurname] = useState("");
  const [image, setImage] = useState("");
  const [nationality, setNationality] = useState("");
  const [dob, setDOB] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]);

  const handleTeamChange = (event) => {
    const selectedTeamsIDs = Array.from(
      event.target.selectedOptions,
      (option) => parseInt(option.value)
    );
    setSelectedTeams(selectedTeamsIDs);
  };
  // console.log(teams);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newDriver = {
      forename,
      surname,
      image,
      nationality,
      dob,
      description,
      teams: selectedTeams,
    };

    dispatch(createDriver(newDriver));

    // Clear the form fields
    // setForename('');
    // setSurname('');
    // setImage('');
    // setNationality('');
    // setDOB('');
    // setDescription('');
    // setSelectedTeams([]);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* {teams.length > 0 ? ( */}
          <div>
            <h2>Create a New Driver</h2>
            <label htmlFor="forename">Forname:</label>
            <input
              type="text"
              value={forename}
              onChange={(e) => setForename(e.target.value)}
              required
            />

            <label htmlFor="surname">Surname:</label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />

            <label htmlFor="image">Image URL:</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />

            <label htmlFor="nationality">Nationality:</label>
            <input
              type="text"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              required
            />

            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDOB(e.target.value)}
              required
            />

            <label htmlFor="description">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <label htmlFor="teams">Teams:</label>
            <select
              multiple
              value={selectedTeams}
              onChange={handleTeamChange}
            >
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>

            <button type="submit">Create Driver</button>
          </div>
        {/* ) : (
          <p>Loading teams...</p>
        )} */}
      </form>
    </div>
  );
}
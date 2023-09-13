import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDriver, getTeams } from "../../redux/actions/actions";
import styles from "./AddDriver.module.css";
import { BACKEND_URL, DEFAULT_IMAGE } from "../../utils";

export default function AddDriver() {
  const dispatch = useDispatch();
  const unsortedTeams = useSelector((state) => state.teams);
  const teams = unsortedTeams.sort();

  useEffect(() => {
    dispatch(getTeams());
  }, []);

  const [form, setForm] = useState({
    forename: "",
    surname: "",
    image: "",
    nationality: "",
    dob: "",
    description: "",
    teams: [],
  });

  const [error, setError] = useState({
    forename: "",
    surname: "",
    image: "",
    nationality: "",
    dob: "",
    description: "",
    teams: [],
  });

  const [success, setSuccess] = useState(""); 

  const changeHanlder = (event) => {
    const property = event.target.name
    const value = event.target.value
    setForm({ ...form, [property]: value })
  };

  const validateForename = (forename) => {
    const regex = /^[a-zA-Z]+$/; // Expresión regular que solo permite letras
    if (forename.trim() === "") {
      setError({ ...error, forename: "You must enter a forename." })
    } else if (!regex.test(forename)) {
      setError({ ...error, forename: "Unvalid forename. No special characters are accepted." })
    } else {
      setError({ ...error, forename: "" })
    }
  };

  const validateSurname = (surname) => {
    const regex = /^[a-zA-Z]+$/; // Expresión regular que solo permite letras
    if (surname.trim() === "") {
      setError({ ...error, surname: "You must enter a surname." })
    } else if (!regex.test(surname)) {
      setError({ ...error, surname: "Unvalid surname. No special characters are accepted." })
    } else {
      setError({ ...error, surname: "" })
    }
  };

  const validateImage = (image) => {
    const regex = /^https?:\/\/(?:www\.)?\S+\.(?:jpg|jpeg|gif|png)$/;
    if (image.trim() === "") {
      setForm({ ...form, image: DEFAULT_IMAGE });
      return true;
    } else if (!regex.test(image)) {
      setError({ ...error, image: "Invalid image URL." });
      return false;
    } else {
      setError({ ...error, image: "" });
      return true;
    }
  };  
  
  const validateDOB = (dob) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // Expresión regular para el formato de fecha (yyyy-mm-dd)
  
    if (dob.trim() === "" || !regex.test(dob)) {
      setError({ ...error, dob: "Invalid date of birth. Please use yyyy-mm-dd format." });
      return false;
    } else {
      setError({ ...error, dob: "" });
      return true;
    }
  };
  
  const validateNationality = (nationality) => {
    if (nationality.trim() === "") {
      setError({ ...error, nationality: "You must enter a nationality." });
      return false;
    } else {
      setError({ ...error, nationality: "" });
      return true;
    }
  };
  
  const validateDescription = (description) => {
    if (description.trim() === "") {
      setError({ ...error, description: "You must enter a description." });
      return false;
    } else {
      setError({ ...error, description: "" });
      return true;
    }
  };  

  const validateForm = () => {
    const requiredFields = ["forename", "surname", "dob", "nationality", "description"];
    for (const key in form) {
      if (requiredFields.includes(key) && form[key].trim() === "") {
        setError({ ...error, [key]: `You must enter a ${key}.` });
        return false;
      }
    }
    return true;
  };
  
  // const validateForm = () => {
  //   for (const key in form) {
  //     if (form[key].trim() === "") {
  //       return false;
  //     }
  //   }
  //   return true;
  // };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please complete all fields before submiting.");
      return;
    };
    console.log("Form Data:", form); // VALIDACIÓN EN PROCESO
    axios
    .post(`${BACKEND_URL}/drivers/create`, {
      ...form,
      teams: form.teams,
    })
    .then((res) => {
      setSuccess("Driver created successfully!");
      setError({});
    })
    .catch((err) => {
      if (err.response.status == 403) {
        setError({ ...error, error: "This Driver already exists in the system, try creating a new one." });
      } else if (err.response.status === 402) {
        setError({ ...error, error: "Driver already created before, try using a new name." });
      } else {
        setError({ ...error, error: "There was an error." })
      } setSuccess("");
    });
  };


  return (
    <div className={styles.container}>
      <div className={styles.welcomeText}>
        <h2>CREATE A NEW DRIVER</h2>
      </div>

      {success && <div className={styles.success}>{success}</div>} {/* Mostrar el mensaje de éxito */}
      {error.error && <div className={styles.error}>{error.error}</div>} {/* Mostrar el mensaje de error */}

      <form onSubmit={submitHandler} className={styles.form}>
        <label>Forename:</label>
        <input
          type="text"
          value={form.forename}
          onChange={(event) => {
            changeHanlder(event);
            validateForename(event.target.value);
          }}
          name="forename"
          required
        />

        <label>Surname:</label>
        <input
          type="text"
          value={form.surname}
          onChange={(event) => {
            changeHanlder(event);
            validateSurname(event.target.value);
          }}
          name="surname"
          required
        />

        <label>Date of Birth:</label>
        <input
          type="date"
          value={form.dob}
          onChange={(event) => {
            changeHanlder(event);
            validateDOB(event.target.value);
          }}
          name="dob"
          required
        />

        <label>Nationality:</label>
        <input
          type="text"
          value={form.nationality}
          onChange={(event) => {
            changeHanlder(event);
            validateNationality(event.target.value);
          }}
          name="nationality"
          required
        />

        <label>Description:</label>
        <textarea
          value={form.description}
          onChange={(event) => {
            changeHanlder(event);
            validateDescription(event.target.value);
          }}
          name="description"
          required
        />

        <label>Image:</label>
        <input
          type="url"
          value={form.image}
          onChange={(event) => {
            changeHanlder(event);
            validateImage(event.target.value);
          }}
          name="image"
        />

        <label>Teams:</label>
        <select
          multiple
          value={form.teams}
          onChange={(event) => {
            const selectedTeams = Array.from(event.target.selectedOptions, (option) => option.value);
            setForm({ ...form, teams: selectedTeams });
            console.log(form.teams)
          }}
        >
          {teams.map((team) => (
            <option key={team.id} value={team.name}>
              {team.name}
            </option>
          ))}
        </select>

        <button type="submit">Create Driver</button>
      </form>
    </div>
  );
};

// -------------------------------------------------------------------------------------------------------

// export default function AddDriver() {
//   const dispatch = useDispatch();
//   const { teams } = useSelector((state) => state);

//   const [forename, setForename] = useState("");
//   const [surname, setSurname] = useState("");
//   const [image, setImage] = useState("");
//   const [nationality, setNationality] = useState("");
//   const [dob, setDOB] = useState("");
//   const [description, setDescription] = useState("");
//   const [selectedTeams, setSelectedTeams] = useState([]);

//   useEffect(() => {
//     dispatch(getTeams()); 
//   }, []);

//   // console.log("Equipos cargados:", teams);

//   const handleTeamChange = (event) => {
//     const selectedTeamsIDs = Array.from(
//       event.target.selectedOptions,
//       (option) => parseInt(option.value)
//     );
//     setSelectedTeams(selectedTeamsIDs);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const newDriver = {
//       forename,
//       surname,
//       image: image || DEFAULT_IMAGE,
//       nationality,
//       dob,
//       description,
//       teams: selectedTeams,
//     };

//     dispatch(createDriver(newDriver));

//     // Clear the form fields
//     // setForename('');
//     // setSurname('');
//     // setImage('');
//     // setNationality('');
//     // setDOB('');
//     // setDescription('');
//     // setSelectedTeams([]);
//   };

//   return (
//     <div className={styles.container}>
//       <form className={styles.form} onSubmit={handleSubmit}>
//         {/* {teams.length > 0 ? ( */}
//           <div>
//             <h2>Create a New Driver</h2>
//             <label htmlFor="forename">Forname:</label>
//             <input
//               type="text"
//               value={forename}
//               onChange={(e) => setForename(e.target.value)}
//               required
//             />

//             <label htmlFor="surname">Surname:</label>
//             <input
//               type="text"
//               value={surname}
//               onChange={(e) => setSurname(e.target.value)}
//               required
//             />

//             <label htmlFor="image">Image URL:</label>
//             <input
//               type="url"
//               value={image}
//               onChange={(e) => setImage(e.target.value)}
//               // required
//             />

//             <label htmlFor="nationality">Nationality:</label>
//             <input
//               type="text"
//               value={nationality}
//               onChange={(e) => setNationality(e.target.value)}
//               required
//             />

//             <label htmlFor="dob">Date of Birth:</label>
//             <input
//               type="date"
//               value={dob}
//               onChange={(e) => setDOB(e.target.value)}
//               required
//             />

//             <label htmlFor="description">Description:</label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             />

//             <label htmlFor="teams">Teams:</label>
//             <select
//               multiple
//               value={selectedTeams}
//               onChange={handleTeamChange}
//             >
//               {teams.map((team) => (
//                 <option key={team.id} value={team.id}>
//                   {team.name}
//                 </option>
//               ))}
//             </select>

//             <button type="submit">Create Driver</button>
//           </div>
//         {/* ) : (
//           <p>Loading teams...</p>
//         )} */}
//       </form>
//     </div>
//   );
// }
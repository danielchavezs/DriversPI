import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from './Detail.module.css';

export default function Detail() {
  const { id } = useParams();
  const [driverDetail, setDriverDetail] = useState();   // cambio de dameDetail a driverDetail y setGameDetail a setDriverDetail
  const localURL = 'http://localhost:3001/drivers/';

  useEffect(() => {
    axios.get(`${localURL}${id}`)
      .then(response => {
        if (response.data.id) {   // --> cambio de validación del .name (por estructuras) a .id
          setDriverDetail(response.data);   // --> setGameDetail a setDriverDetail
        } else {
          window.alert('There are no drivers with the given ID.');
        }
      })
      .catch((error) => window.alert(error));

    return () => {
      console.log("Getting dismantled, bye!");
    };
  }, [id]);

  if(!driverDetail) {
    return <div className={styles.loading}>
    <img className={styles.loading} src={'https://mir-s3-cdn-cf.behance.net/project_modules/fs/b6e0b072897469.5bf6e79950d23.gif'} alt={'Loading screen'} />
  </div>;
  } else return (
    <div>
      <h3>{driverDetail.forename} {driverDetail.surname}</h3>  
      <h5>{driverDetail.status }</h5> 
      <div className={styles.image}></div>
        <img src={driverDetail.image} alt={driverDetail.name} />
      <div className={styles.container}>
      <section>
        <span> 📌 ID: {driverDetail.id}</span><br />
        <span> ☀ Nationality: {driverDetail.nationality}</span><br />
        <span> 📆 Date of Birth: {driverDetail.dob}</span><br />
        <span> 🏎 Teams: {driverDetail.teams.map((team) => team.name).join(' - ')}</span><br />
        <span> 📝 Description: {driverDetail.description ? driverDetail.description: "There is no description available at the moment."}</span><br />
      </section>
      </div>
    </div>
  );

  // const imageDIV = <img src={driverDetail.image} alt={gameDetail.name} /> 
  // const iamgeClassName = <div className={styles.image}></div>
  
  // ACÁ PUEDO EVALUAR LA IMPLEMENTACIÓN DE LA LÓGICA QUE UNIFICA EL NAME. FALTA VERIFICAR/ARREGLAR EL PRIMER h3
  // REALMENTE PUESTO QUE VARIOS DATOS EN LA ESTRUCTURA CAMBIAN, CREO QUE DEBO APLICAR UN IF EN FUNCIÓN DEL ID Y AHÍ SÍ EJECITAR RETURNS DIFERENTES


};

// --------------------------------------------------------------------------------------------------------------


// if (driverDetail){
//   if (id < 1000){
//       // código para API
//       return (
//           <div>
//             <h3>{driverDetail.name.forename}{driverDetail.name.surname}</h3>  
//             <h5>{driverDetail.status ? driverDetail.status : "There is no status."}</h5>
//             <div className={styles.image}></div>
//             <img src={driverDetail.image} alt={gameDetail.name} />
//             <div className={styles.container}>
//             <section>
//               <span> 📌 ID: {driverDetail.id}</span><br />
//               <span> ☀ Nationality: {driverDetail.nationality}</span><br />
//               <span> 📆 Date of Bith: {driverDetail.dob}</span><br />
//               <span> 🏎 Teams: {driverDetail.teams ? driverDetail.teams: "This driver has no recorded teams."}</span><br />
//               <span> 📝 Description: {driverDetail.description ? driverDetail.description: "There is no description available at the moment."}</span><br />
//             </section>
//             </div>
//           </div>
//         );
//   }
//   if (id > 1000){
//       // código para BD
//       return (
//           <div>
//             <h3>{driverDetail.forename}{driverDetail.surname}</h3>  
//             <h5>{driverDetail.status ? driverDetail.status : "There is no status."}</h5>
//             <div className={styles.image}></div>
//             <img src={driverDetail.image} alt={gameDetail.name} />
//             <div className={styles.container}>
//             <section>
//               <span> 📌 ID: {driverDetail.id}</span><br />
//               <span> ☀ Nationality: {driverDetail.nationality}</span><br />
//               <span> 📆 Date of Bith: {driverDetail.dob}</span><br />
//               <span> 🏎 Teams: {driverDetail.teams.map((team) => team.name)}</span><br />
//               <span> 📝 Description: {driverDetail.description ? driverDetail.description: "There is no description available at the moment."}</span><br />
//             </section>
//             </div>
//           </div>
//         );
//   };
// };
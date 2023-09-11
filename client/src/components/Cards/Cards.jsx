import Card from './Singular/Card';
import styles from './Cards.module.css';
import React from 'react';
import { useSelector } from 'react-redux';


export default function Cards({drivers}) { 
  const { getByName, isLoading } = useSelector((state) => state); 

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <img
          className={styles.loading}
          src={
            'https://mir-s3-cdn-cf.behance.net/project_modules/fs/b6e0b072897469.5bf6e79950d23.gif'
          }
          alt={'Loading screen'}
        />
      </div>
    );
  };

  if (getByName.length > 0){
    return (
      <div className={styles.container}>
        {getByName.map((driver) => (
          <Card
            key={driver.id}
            id={driver.id}
            forename={driver.forename}
            surname={driver.surname}
            image={driver.image}
            teams={driver.teams.map((team) => team.name)} // --> falta verificarlo
          />
        ))}
      </div>
    );
  }else{
      return (
    <div className={styles.container}>
      {drivers.map((driver) => (
        <Card
          key={driver.id}
          id={driver.id}
          forename={driver.forename}
          surname={driver.surname}
          image={driver.image}
          teams={driver.teams.map((team) => team.name)} // --> falta verificarlo
        />
      ))}
    </div>
  );
  };
};

// ---------------------------------------------------------------------------------------------------

  // const apiCard = (
  //   <Card
  //     key={driver.id}
  //     id={driver.id}
  //     forename={driver.name.forename} // --> falta verificarlo
  //     surname={driver.name.surname} // --> falta verificarlo
  //     image={driver.image}
  //     teams={driver.teams}
  //   />
  // );

  // const dbCard =(
  //   <Card
  //     key={driver.id}
  //     id={driver.id}
  //     forename={driver.forename} // --> falta verificarlo
  //     surname={driver.surname} // --> falta verificarlo
  //     image={driver.image}
  //     teams={driver.teams.map((team) => team.name)}
  //   />
  // );

import axios from 'axios';
// require('dotenv').config();
// const { BACKEND_URL } = process.env;
import { BACKEND_URL } from '../../utils';
import {
  GET_ALL_DRIVERS,
  GET_API_DRIVERS,
  GET_DB_DRIVERS,
  GET_BY_ID,
  GET_BY_NAME,
  GET_TEAMS,
  NEW_DRIVER,
  ORDER,
  RESET,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  FILTER,
} from './types';

// const BACKEND_URL = 'http://localhost:3001';

export const getDrivers = (args) => {
  const { sort, page, team, origin, name } = args || {};
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING_TRUE });
      const response = await axios.get(`${BACKEND_URL}/drivers`, {
        params: {
          sort,
          page,
          team,
          origin,
          name,
        },
      });
      dispatch({ type: GET_ALL_DRIVERS, payload: response.data }); // --> modificado soundDrivers
    } catch (error) {
      alert(error);
    } finally {
      dispatch({ type: SET_LOADING_FALSE });
    }
  };
};

export const getAPIdrivers = (args) => {
  const { sort, page } = args || {}; //  --> debería estar sin estas propiedades por ahora
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING_TRUE });
      const response = await axios.get(`${BACKEND_URL}/drivers?origin=api`, {
        params: {
          sort,
          page,
        },
      });
      console.log(response);
      dispatch({ type: GET_API_DRIVERS, payload: response.data });
    } catch (error) {
      alert(error);
    } finally {
      dispatch({ type: SET_LOADING_FALSE });
    }
  };
};

export const getDBdrivers = (args) => {
  const { sort, page } = args || {}; //  --> debería estar sin estas propiedades por ahora
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING_TRUE });
      const response = await axios.get(`${BACKEND_URL}/drivers?origin=db`, {
        params: {
          sort,
          page,
        },
      });
      console.log(response);
      dispatch({ type: GET_DB_DRIVERS, payload: response.data });
    } catch (error) {
      alert(error);
    } finally {
      dispatch({ type: SET_LOADING_FALSE });
    }
  };
};

export const getByName = (name) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING_TRUE });
      const response = await axios.get(`${BACKEND_URL}/drivers?name=${name}`);
      console.log(response);
      dispatch({ type: GET_BY_NAME, payload: response.data });
    } catch (error) {
      alert(error);
    } finally {
      dispatch({ type: SET_LOADING_FALSE });
    }
  };
};

export const getByID = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING_TRUE });
      const response = await axios.get(`${BACKEND_URL}/drivers/${id}`);
      console.log(response);
      dispatch({ type: GET_BY_ID, payload: response.data });
    } catch (error) {
      alert(error);
    } finally {
      dispatch({ type: SET_LOADING_FALSE });
    }
  };
};

export const getTeams = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING_TRUE });
      const response = await axios.get(`${BACKEND_URL}/teams`);
      dispatch({ type: GET_TEAMS, payload: response.data });
    } catch (error) {
      alert(error);
    } finally {
      dispatch({ type: SET_LOADING_FALSE });
    }
  };
};

export const createDriver = (newDriver) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING_TRUE });
      const response = await axios.post(
        `${BACKEND_URL}/drivers/create`,
        newDriver
      );
      console.log(response);
      dispatch({ type: NEW_DRIVER, payload: response.data });
    } catch (error) {
      alert(error);
    } finally {
      dispatch({ type: SET_LOADING_FALSE });
    }
  };
};

// export const createGame = (newGame) => {
//   return (dispatch) =>
//     axios
//       .post(`${BACKEND_URL}/game/create`, newGame)
//       .then((res) => dispatch({ type: NEW_GAME, payload: res.data }))
//       .catch((error) => alert(error));
// };

export function filterCards(team) {
  return { type: FILTER, payload: team };
}

export function orderCards(order) {
  return { type: ORDER, payload: order };
}

export function reset() {
  return { type: RESET };
}

// import { getByName } from '../actions/actions';
import { FILTER, GET_API_DRIVERS, GET_DB_DRIVERS, ORDER, RESET } from '../actions/types';
import {
  GET_ALL_DRIVERS,
  GET_BY_ID,
  GET_BY_NAME,
  GET_TEAMS,
  NEW_DRIVER,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
} from '../actions/types';

const initialGlobalState = {
  allDrivers: [],
  apiDrivers: [],
  dbDrivers: [],
  getByName: [],
  getByID: [],
  teams: [],
  isLoading: false,
  totalPages: 0,
};

export default function rootReducer(state = initialGlobalState, action) {
  switch (action.type) {
    case SET_LOADING_TRUE:
      return {
        ...state,
        isLoading: true,
      };
    case SET_LOADING_FALSE:
      return {
        ...state,
        isLoading: false,
      };
    case GET_ALL_DRIVERS:
      return {
        ...state,
        allDrivers: action.payload.foundDrivers,
        totalPages: action.payload.totalPages,
      };
    case GET_API_DRIVERS:
      return {
        ...state,
        apiDrivers: action.payload, // si logro aplicar el paginado apra el back en estas, acá debe ser payloa.foundDrivers
        // totalPages: action.payload.totalPages,
      };
    case GET_DB_DRIVERS:
      return {
        ...state,
        dbDrivers: action.payload, // si logro aplicar el paginado apra el back en estas, acá debe ser payloa.foundDrivers
        // totalPages: action.payload.totalPages,
      };
    case GET_BY_NAME:
      return {
        ...state,
        getByName: action.payload,
        // totalPages: action.payload.totalPages,
      };
    case GET_BY_ID:
      return {
        ...state,
        getByID: action.payload,
      };
    case GET_TEAMS:
      return {
        ...state,
        teams: action.payload,
      };
    case NEW_DRIVER:
      return {
        ...state,
        newDriver: action.payload,
      };
    case FILTER:
      return {
        ...state,
        filteredDrivers: state.allDrivers.filter(
          (driver) => driver.teams === action.payload
        ),
      };
    case ORDER:
      // [{id: 8},{id: 6},{id: 4},1,7]
      //    a.id    b.id

      let copy = state.filteredDrivers.sort((a, b) => {
        if (action.payload === 'A') {
          // ordenar de menor a mayor
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0; // Si son iguales, no los muevo de posición.
        } else {
          // ordenar de mayor a menor
          if (a.id > b.id) return -1;
          if (b.id > a.id) return 1;
          return 0; // Si son iguales, no los muevo de posición.
        }
      });
      return {
        ...state,
        filteredDrivers: copy,
      };
    case RESET:
      return { ...state, filteredDrivers: state.allDrivers };
    default:
      return { ...state };
  }
}
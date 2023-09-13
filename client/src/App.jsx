import './App.css';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useLocation,
} from 'react-router-dom';
// import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { BACKEND_URL } from './utils';
import Landing from './components/Landing/Landing.jsx';
import Home from './components/Home/Home.jsx';
import Nav from './components/NavBar/Nav.jsx';
import { Provider } from 'react-redux';
import store from './redux/store';
// import Form from "./components/Form/Form";
import Detail from './components/Detail/Detail';
import AddDriver from './components/AddDriver/AddDriver';

function App() {
  const [errorApi, setErrorApi] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAllDrivers();
  }, []);

  const fetchAllDrivers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/drivers`);
      setDrivers(response.data);
      setErrorApi(false);
    } catch (error) {
      setErrorApi(true);
    }
    setIsLoading(false);
  };
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <div className="App">
            <Nav />
            <Routes>
              <Route
                path="/home"
                element={<Home drivers={drivers} isLoading={isLoading} />}
              />
              <Route path="/" element={<Landing />} />
              <Route path="/create" element={<AddDriver />} />
              <Route path="/detail/:id" element={<Detail />} />
            </Routes>
          </div>
        </Router>
      </Provider>
    </React.StrictMode>
  );
}

export default App;

// ------------------------------------------------------------------------------------------------

// ORIGINAL RETURN:
// return (
//   <>
//     <div>
//       <a href="https://vitejs.dev" target="_blank">
//         <img src={viteLogo} className="logo" alt="Vite logo" />
//       </a>
//       <a href="https://react.dev" target="_blank">
//         <img src={reactLogo} className="logo react" alt="React logo" />
//       </a>
//     </div>
//     <h1>Vite + React + Henry</h1>
//     <div className="card">
//       <button onClick={() => setCount((count) => count + 1)}>
//         count is {count}
//       </button>
//       <p>
//         Edit <code>src/App.jsx</code> and save to test HMR
//       </p>
//     </div>
//     <p className="read-the-docs">
//       Click on the Vite and React logos to learn more
//     </p>
//   </>
// )

// return (
//   <div className="App">
//     <Router>
//       <Routes>
//         {/* <Route path="/home" element={<Home />}/>  */}
//         <Route path="/" element={<Landing />}/>
//       </Routes>
//     </Router>
//   </div>
// );

// -----------------------------------------------------------------------------------------
// WORKING V0 APP:

// import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// import './App.css'
// import { BrowserRouter as Router, Routes, Route, useParams, useLocation, } from 'react-router-dom';
// // import { Provider } from 'react-redux';
// // import store from './redux/store';
// import Landing from './components/Landing/Landing.jsx';
// import Home from './components/Home/Home.jsx';

// function App() {
//   const [count, setCount] = useState(0)

// return (
//   <div id="app-container">
//     <Router>
//       <Routes>
//         <Route path="/home" element={<Home />}/>
//         <Route path="/" element={<Landing />}/>
//       </Routes>
//     </Router>
//   </div>
// );

// };

// export default App

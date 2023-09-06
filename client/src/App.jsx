import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, useParams, useLocation, } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './redux/store';
import Landing from './components/Landing/Landing.jsx';
// import Home from './components/Home/Home.jsx';

function App() {
  const [count, setCount] = useState(0)

 
return (
  <div id="app-container">
    <Router>
      <Routes>
        {/* <Route path="/home" element={<Home />}/>  */}
        <Route path="/" element={<Landing />}/>
      </Routes>
    </Router>
  </div>
);

};

export default App

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

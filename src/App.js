import { BrowserRouter as Router, Routes, Route, Redirect, Navigate } from "react-router-dom";


import { useState } from "react";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import Results from "./component/Results";


function App() {
  const [darkTheme, setDarkTheme] = useState(false)
  return (

    <Router>
      <div className={darkTheme ? 'dark' : ''}>
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-gray-200 min-h-screen ">
          <Navbar setDarkTheme={setDarkTheme} darkTheme={darkTheme} />
          <Routes >
            <Route path="/" exact element={<Navigate to='/search'></Navigate>} />
            <Route exact path='/search' element={<Results />} />
            <Route exact path='/images' element={<Results />} />
            <Route exact path='/news' element={<Results />} />
            <Route exact path='/videos' element={<Results />} />

          </Routes>
          <Footer />
        </div>
      </div>

    </Router>
  );
}

export default App;
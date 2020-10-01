import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './Components/Site/Header'
import Footer from './Components/Site/Footer'
import NavBar from './Components/Site/NavBar'



function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <NavBar/>
      </Router>
      <Footer />
    </div>
  );
}

export default App;

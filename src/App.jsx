import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Design from './pages/Design';
import Nav from './components/Nav';
import Home from './pages/Home';
import './App.scss'  // Updated extension

function App() {

  return (
    <>
      <Router>
        {/* <Nav /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/design/:id?" element={<Design />} /> 
        </Routes> 
      </Router>
    </>
  )
}

export default App

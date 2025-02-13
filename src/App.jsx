import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Design from './pages/Design';
import Nav from './components/Nav';
import './App.scss'  // Updated extension

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        {/* <Nav /> */}
        <Routes>
          <Route path="/design" element={<Design />} />
        </Routes> 
      </Router>
    </>
  )
}

export default App

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import Navbar from './components/Navbar/NavBar';
import Footer from './components/Footer/Footer';
function App() {
  return (
    <Router>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow mt-16">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  )
}

export default App

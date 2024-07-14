import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar/NavBar';
import Footer from './components/Footer/Footer';
import ScrollToBottom from './components/Scroll/ScrollToBottom';
import ScrollToUp from './components/Scroll/ScrollToUp';
import About from './pages/About';
import NotFound from './pages/NotFound';
import TangPoetryPage from './pages/TangPoetryPage';
import SongPoetryPage from './pages/SongPoetryPage';
import ShijingPage from './pages/ShijingPage';
import SearchPage from './pages/SearchPage';
function App() {
  return (
    <Router>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow mt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tang" element={<TangPoetryPage />} />
            <Route path="/song" element={<SongPoetryPage />} />
            <Route path="/shi_jing" element={<ShijingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </div>
      <ScrollToUp />
      <ScrollToBottom />
    </Router>
  )
}

export default App

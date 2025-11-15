import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'

function App() {
  // GitHub Pages için base path
  const basename = import.meta.env.BASE_URL || '/'
  
  return (
    <Router basename={basename}>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App


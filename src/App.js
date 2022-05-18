import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />

        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CafeSelect from './pages/CafeSelect';
import Part1 from './pages/Part1';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cafeselect" element={<CafeSelect />} />
        <Route path="/part1" element={<Part1 />} />
      </Routes>
    </Router>
  );
}

export default App;

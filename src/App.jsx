import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CafeSelect from './pages/CafeSelect';
import Part1 from './pages/Part1';
import Nutrientselect from './pages/Nutrientselect';
import Result1 from './pages/Result1';
import Result2 from './pages/Result2';
import MenuList from './pages/MenuList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cafeselect" element={<CafeSelect />} />
        <Route path="/part1" element={<Part1 />} />
        <Route path="nutrientselect" element={<Nutrientselect/>} />
        <Route path="result1" element={<Result1/>} />
        <Route path="result2" element={<Result2/>} />
        <Route path="menulist" element={<MenuList/>} />
      </Routes>
    </Router>
  );
}

export default App;

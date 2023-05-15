import './App.css';
import { Routes,Route, BrowserRouter } from 'react-router-dom';
import Addproduct from './pages/Addproduct';
import Showproduct from './pages/Showproduct';
import Updateproduct from './pages/Updateproduct';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
    
        <Route path='/' element={<Addproduct/>}></Route>
        <Route path='/show' element={<Showproduct/>}></Route>
        <Route path='/update/:id' element={<Updateproduct/>}></Route>




      </Routes>
    </BrowserRouter>
    
    </div>
  );
}

export default App;

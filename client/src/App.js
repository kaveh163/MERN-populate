import Home from './pages/Home';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from './pages/Register';
import User from './pages/User';
import './style.css'

function App() {

  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route index element={<Home/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="user" element={<User/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
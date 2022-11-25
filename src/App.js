  import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from './pages/Register';
import Login from "./pages/Login"
import Home from './pages/Home/Home';
import UserEventsList from './pages/UserEventsList';

function App() {
  const username = sessionStorage.getItem("username");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user_event" element={<UserEventsList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

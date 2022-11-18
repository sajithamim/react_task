import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./pages/Loginold"
import Login from "./pages/Login"
import AllEvents from './pages/AllEvents';
import AddEvent from './pages/AddEvent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllEvents />} />
        <Route path="/add_events" element={<AddEvent />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

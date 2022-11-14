import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./pages/Login"
import EventList from './pages/EventList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/eventlist" element={<EventList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { render, fireEvent, screen } from "@testing-library/react";
import Home from "./Home";
import {BrowserRouter as Router} from 'react-router-dom';

//test block
test("Home Page", () => {
// render the component on virtual dom
render(<Router><Home /></Router>);


});
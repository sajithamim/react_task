import { render, fireEvent, screen } from "@testing-library/react";
import Home from "./Home";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import Events from "../Events";
import { BrowserRouter as Router } from "react-router-dom";

//test block
test("Home Page", () => {
  // render the component on virtual dom
  render(
    <Router>
      <Home />
    </Router>
  );
});

//test block
test("Header Page", () => {
  // render the component on virtual dom
  render(
    <Router>
      <Header />
    </Router>
  );
});

//test block
test("Header Page", () => {
  // render the component on virtual dom
  render(
    <Router>
      <Banner />
    </Router>
  );
});

//test block
test("Header Page", () => {
  // render the component on virtual dom
  render(
    <Router>
      <Events />
    </Router>
  );
});



// import { render, fireEvent, screen } from "@testing-library/react";
// import Counter from "./Counter"

// //test block
// test("increments counter", () => {
// // render the component on virtual dom
// render(<Counter />);

// //select the elements you want to interact with
// const counter = screen.getByTestId("counter");
// const incrementBtn = screen.getByTestId("increment");

// //interact with those elements
// fireEvent.click(incrementBtn);

// //assert the expected result
// expect(counter).toHaveTextContent("1");
// });


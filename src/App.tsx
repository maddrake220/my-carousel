import React from "react";
import styled from "styled-components";
import "./App.css";
import Carousel from "./components/Carousel";

const Test = styled.div`
  width: 320px;
  height: 320px;
  background-color: royalblue;
`;
const Test2 = styled.div`
  width: 820px;
  height: 620px;
  background-color: red;
`;

function App() {
  return (
    <div className="App">
      <Carousel
        styles={{
          width: "1200px",
          height: "500px",
        }}
        options={{
          autoPlay: true,
          delay: 5000,
          loop: true,
          transitionTime: 1400,
          direction: "row",
          navigation: true,
        }}
      >
        <Test>1</Test>
        <Test2>2</Test2>
        <Test>3</Test>
        <Test>4</Test>
        <Test>5</Test>
        <Test>6</Test>
      </Carousel>
    </div>
  );
}

export default App;

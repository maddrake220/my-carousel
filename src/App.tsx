import React from "react";
import "./App.css";
import Carousel from "./components/Carousel";

function App() {
  return (
    <div className="App">
      <Carousel
        options={{
          autoPlay: true,
          delay: 2000,
        }}
      >
        <h1>1</h1>
        <h1>2</h1>
        <h1>3</h1>
        <h1>4</h1>
        <h1>5</h1>
      </Carousel>
    </div>
  );
}

export default App;

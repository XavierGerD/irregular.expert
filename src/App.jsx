import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import RhythmPractice from "./RhythmPractice/components/RhythmPractice";
import DroneGenerator from "./Drone/components/DroneGenerator";
import NavBar from "./NavBar.jsx";
import Detune from "./Detune/components/Detune";
import { Provider } from "react-redux";
import store from "./store/store";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact={true} path="/" element={<RhythmPractice />} />
        <Route exact={true} path="/drone" element={<DroneGenerator />} />
        <Route exact={true} path="/detune" element={<Detune />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;

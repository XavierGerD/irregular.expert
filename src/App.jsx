import React, { Component } from "react";
import { Route, BrowserRouter, Link } from "react-router-dom";
import RhythmPractice from "./Rhythm-practice/RhythmPractice.jsx";
import DroneGenerator from "./Drone/DroneGenerator";
import NavBar from "./NavBar.jsx";
import Detune from "./Detune/Detune.jsx";

class App extends Component {
	renderRhythm = () => {
		return <RhythmPractice />;
	};

	renderDrone = () => {
		return <DroneGenerator />;
	};
	render = () => {
		return (
			<BrowserRouter>
				<NavBar />
				<Detune />
				<Route exact={true} path="/" render={this.renderRhythm} />
				<Route exact={true} path="/drone" render={this.renderDrone} />
			</BrowserRouter>
		);
	};
}

export default App;

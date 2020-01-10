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

	renderDetune = () => {
		return <Detune />;
	};

	render = () => {
		return (
			<BrowserRouter>
				<NavBar />
				<Route exact={true} path="/" render={this.renderRhythm} />
				<Route exact={true} path="/drone" render={this.renderDrone} />
				<Route exact={true} path="/detune" render={this.renderDetune} />
			</BrowserRouter>
		);
	};
}

export default App;

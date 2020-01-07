import React, { Component } from "react";
import Metronome from "./Metronome.jsx";
import Tone from "tone";
import "./Looper.css";

export default class Looper extends Component {
	constructor() {
		super();
		this.state = {
			events: [],
			synth: new Tone.Synth().toMaster()
		};
	}

	componentDidMount = () => {
		let state = { ...this.state };
		state.volume = new Tone.Volume(0);
		state.synth.chain(state.volume, Tone.Master);
		// state.synth.oscillator.type = this.state.wave;
		Tone.Master.volume.value = -15;
		this.setState(state);
	};

	addEvent = () => {
		let events = [...this.state.events];
		if (events.length < 4) {
			events = events.concat([
				{ note: "C4", beats: 4, position: events.length }
			]);
			this.setState({ events });
		}
		return;
	};

	removeEvent = () => {
		let events = [...this.state.events];
		events = events.slice(0, events.length - 1);
		this.setState({ events });
	};

	showLooper = () => {
		this.setState({ show: !this.state.show });
	};

	handleNoteChange = event => {
		let events = [...this.state.events];
		events[event.target.id].note = event.target.value;
		this.setState({ events });
	};

	handleBeatChange = event => {
		let events = [...this.state.events];
		events[event.target.id].beats = event.target.value;
		this.setState({ events });
	};

	stopMe = event => {
		event.preventDefault();
		this.state.synth.triggerRelease();
	};

	render = () => {
		return (
			<div className="looper-container">
				<div className="control-container">
					<div
						style={{
							display: "flex"
						}}
					>
						<div onClick={this.addEvent} className="control-button">
							+
						</div>
						<div
							onClick={this.removeEvent}
							className="control-button"
						>
							-
						</div>
					</div>
				</div>

				<div className="looper-main" id="looper">
					{this.state.events.map(event => {
						return (
							<div className="event" id={event.position}>
								<div style={{ display: "flex" }}>
									NOTE:{" "}
									<div style={{ paddingLeft: "5px" }}>
										<input
											type="text"
											className="rp-inputBox-small"
											id={event.position}
											onChange={event =>
												this.handleNoteChange(event)
											}
											value={event.note}
										/>
									</div>
								</div>
								<div style={{ display: "flex" }}>
									BEATS:{" "}
									<div style={{ paddingLeft: "5px" }}>
										<input
											type="text"
											className="rp-inputBox-small"
											id={event.position}
											onChange={event =>
												this.handleBeatChange(event)
											}
											value={event.beats}
										/>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<button id="start" onClick={this.stopMe}>
					Start!
				</button>
				<button id="stop" onClick={this.stopMe}>
					Stop!
				</button>
			</div>
		);
	};
}

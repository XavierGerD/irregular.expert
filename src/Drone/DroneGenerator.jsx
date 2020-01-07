import React, { Component } from "react";
import Tone from "tone";
import "./DroneGenerator.css";

class DroneGenerator extends Component {
	constructor() {
		super();
		this.state = {
			synth: new Tone.Synth().toMaster(),
			octave: 4,
			currentNote: ""
		};
	}
	componentDidMount = () => {
		let state = { ...this.state };
		state.volume = new Tone.Volume().toMaster();
		state.volume.volume.value = 0;
		state.synth.chain(state.volume, Tone.Master);
		console.log("state before set", state);
		this.setState(state);
	};

	setNote = (event, value) => {
		event.preventDefault();
		this.setState({ currentNote: value }, () => {
			this.state.synth.triggerAttack(this.state.currentNote);
		});
	};

	setOctave = (event, value) => {
		this.setState({ octave: value });
	};

	stopMe = event => {
		event.preventDefault();
		this.state.synth.triggerRelease();
	};

	createOctaveSelectors = () => {
		let ret = [];
		for (let i = 2; i < 6; i++) {
			ret.push(
				<div
					className="octave-selector"
					onClick={event => this.setOctave(event, i)}
				>
					{i}
				</div>
			);
		}
		return ret;
	};

	adjustVolume = event => {
		event.preventDefault();
		let state = { ...this.state };
		state.volume.volume.value = event.target.value;
		this.setState({ state });
	};

	render = () => {
		return (
			<div className="drone-container">
				<div className="instructions">
					This app lets you practice intonation by generating a drone.
				</div>
				<div className="instructions">
					Simply click on the note you choose. You can also change the
					octave.
				</div>
				<div style={{ display: "flex", marginBottom: "20px" }}>
					<div className="select-container">
						<div style={{ marginBottom: "10px" }}>OCTAVE</div>
						<div style={{ display: "flex" }}>
							{this.createOctaveSelectors()}
						</div>
					</div>
					<div className="select-container">
						Volume
						<input
							type="range"
							min="-12"
							max="12"
							className="slider"
							id="volumeSlider"
							defaultValue="0"
							onChange={event => {
								this.adjustVolume(event);
							}}
						/>
					</div>
				</div>
				<div style={{ marginBottom: "20px" }}>
					<div className="blacknotes">
						<div
							className="blacknotebutton"
							onClick={event =>
								this.setNote(event, "Db" + this.state.octave)
							}
						>
							C#/ Db
						</div>
						<div
							className="blacknotebutton"
							onClick={event =>
								this.setNote(event, "Eb" + this.state.octave)
							}
						>
							D#/ Eb
						</div>
						<div className="notespacer" />
						<div
							className="blacknotebutton"
							onClick={event =>
								this.setNote(event, "Gb" + this.state.octave)
							}
						>
							F#/ Gb
						</div>
						<div
							className="blacknotebutton"
							onClick={event =>
								this.setNote(event, "Ab" + this.state.octave)
							}
						>
							G#/ Ab
						</div>
						<div
							className="blacknotebutton"
							onClick={event =>
								this.setNote(event, "Bb" + this.state.octave)
							}
						>
							A#/ Bb
						</div>
					</div>

					<div className="whitenotes">
						<div
							className="whitenotebutton"
							onClick={event =>
								this.setNote(event, "C" + this.state.octave)
							}
						>
							C
						</div>
						<div
							className="whitenotebutton"
							onClick={event =>
								this.setNote(event, "D" + this.state.octave)
							}
						>
							D
						</div>
						<div
							className="whitenotebutton"
							onClick={event =>
								this.setNote(event, "E" + this.state.octave)
							}
						>
							E
						</div>
						<div
							className="whitenotebutton"
							onClick={event =>
								this.setNote(event, "F" + this.state.octave)
							}
						>
							F
						</div>
						<div
							className="whitenotebutton"
							onClick={event =>
								this.setNote(event, "G" + this.state.octave)
							}
						>
							G
						</div>
						<div
							className="whitenotebutton"
							onClick={event =>
								this.setNote(event, "A" + this.state.octave)
							}
						>
							A
						</div>
						<div
							className="whitenotebutton"
							onClick={event =>
								this.setNote(event, "B" + this.state.octave)
							}
						>
							B
						</div>
					</div>
				</div>
				<button id="stop" onClick={this.stopMe}>
					Stop!
				</button>
			</div>
		);
	};
}

export default DroneGenerator;
